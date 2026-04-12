const ContactMessage = require("../models/ContactMessage");
const { getIsConnected } = require("../config/db");
const fs = require("fs");
const path = require("path");

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
    if (getIsConnected()) {
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

module.exports = { submitContact };
