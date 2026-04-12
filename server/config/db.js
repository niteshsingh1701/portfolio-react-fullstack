const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.warn(
      "⚠️  MONGO_URI not set — running with in-memory fallback (no persistence)"
    );
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("✅ MongoDB connected:", mongoose.connection.host);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    console.warn("⚠️  Falling back to in-memory data store");
  }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };
