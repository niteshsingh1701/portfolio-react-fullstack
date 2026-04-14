const ContactMessage = require("../models/ContactMessage");
const { getIsConnected } = require("../config/db");
const fs = require("fs");
const path = require("path");

const CONTACT_STORAGE_MODE = (
  process.env.CONTACT_STORAGE_MODE || "auto"
).toLowerCase();

const shouldUseMongoForContact = () => {
  if (CONTACT_STORAGE_MODE === "mongo") return getIsConnected();
  if (CONTACT_STORAGE_MODE === "local") return false;

  // auto: use Mongo only in production when DB is connected.
  return process.env.NODE_ENV === "production" && getIsConnected();
};

// In-memory / file-based fallback store
const inMemoryMessages = [];
const MESSAGES_FILE = path.join(__dirname, "../data/messages.json");

// Load existing messages from file on startup
if (fs.existsSync(MESSAGES_FILE)) {
  try {
    const fileData = fs.readFileSync(MESSAGES_FILE, "utf-8");
    inMemoryMessages.push(...JSON.parse(fileData));
  } catch (err) {
    console.error("Failed to read existing messages.json", err);
  }
}

// POST /api/contact
const submitContact = async (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide name, email, and message." });
  }
  if (name.trim().length < 2) {
    return res.status(400).json({ success: false, message: "Name must be at least 2 characters." });
  }
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Please provide a valid email address." });
  }
  if (message.trim().length < 10) {
    return res
      .status(400)
      .json({ success: false, message: "Message must be at least 10 characters." });
  }

  try {
    if (shouldUseMongoForContact()) {
      const newMessage = await ContactMessage.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
      });
      return res.status(201).json({
        success: true,
        message: "Message received! I'll get back to you soon.",
        data: { id: newMessage._id },
      });
    }

    // Fallback: save to local JSON file
    const id = Date.now().toString();
    const newMsg = {
      id,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      createdAt: new Date(),
    };
    
    inMemoryMessages.push(newMsg);
    
    // Write back to file
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(inMemoryMessages, null, 2), "utf-8");
    
    console.log(`📬 New contact message saved to ${MESSAGES_FILE}:`, { name, email });
    
    return res.status(201).json({
      success: true,
      message: "Message received! I'll get back to you soon.",
      data: { id },
    });
  } catch (err) {
    console.error("submitContact error:", err.message);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

// GET /api/contact/messages
const getContactMessages = async (req, res) => {
  try {
    if (shouldUseMongoForContact()) {
      const messages = await ContactMessage.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: messages.length, data: messages });
    }

    const sorted = [...inMemoryMessages].sort(
      (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    );

    return res.json({ success: true, count: sorted.length, data: sorted });
  } catch (err) {
    console.error("getContactMessages error:", err.message);
    return res
      .status(500)
      .json({ success: false, message: "Server error fetching messages" });
  }
};

module.exports = { submitContact, getContactMessages };
