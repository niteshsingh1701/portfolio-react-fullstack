const mongoose = require("mongoose");

let isConnected = false;
const enableMongoFromEnv = process.env.ENABLE_MONGO;
const ENABLE_MONGO =
  typeof enableMongoFromEnv === "string"
    ? enableMongoFromEnv.toLowerCase() === "true"
    : true;
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  if (!ENABLE_MONGO) {
    console.warn(
      "⚠️  MongoDB connection disabled (ENABLE_MONGO=false) — running with in-memory fallback"
    );
    return;
  }

  if (!MONGO_URI) {
    console.warn(
      "⚠️  MONGO_URI not set — running with in-memory fallback (no persistence)"
    );
    return;
  }

  try {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log("✅ MongoDB connected:", mongoose.connection.host);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    console.warn("⚠️  Falling back to in-memory data store");
  }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };
