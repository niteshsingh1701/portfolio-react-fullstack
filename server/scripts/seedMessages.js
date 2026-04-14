require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const mongoose = require("mongoose");
const ContactMessage = require("../models/ContactMessage");
const messages = require("../data/messages.json");

const seedMessages = async () => {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI not set in .env, cannot seed contact messages.");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for message seeding");

    await ContactMessage.deleteMany({});
    console.log("Cleared existing contact messages");

    const payload = messages.map((m) => ({
      name: (m.name || "").trim(),
      email: (m.email || "").trim().toLowerCase(),
      message: (m.message || "").trim(),
      read: Boolean(m.read),
      createdAt: m.createdAt ? new Date(m.createdAt) : undefined,
    }));

    const validPayload = payload.filter(
      (m) => m.name && m.email && m.message
    );

    const inserted = await ContactMessage.insertMany(validPayload);
    console.log(`Seeded ${inserted.length} contact messages successfully`);
  } catch (err) {
    console.error("Message seeding failed:", err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  }
};

seedMessages();
