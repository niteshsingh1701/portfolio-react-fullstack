require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const mongoose = require("mongoose");
const Project = require("../models/Project");
const { projects } = require("../data/projects");

const seedProjects = async () => {
  if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI not set in .env — cannot seed database.");
    console.log(
      "ℹ️  Set MONGO_URI=mongodb://localhost:27017/portfolio in server/.env and retry."
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected for seeding");

    await Project.deleteMany({});
    console.log("🗑️  Cleared existing projects");

    // Remove the _id field so Mongoose auto-generates ObjectIds
    const projectsToInsert = projects.map(({ _id, ...rest }) => rest);
    const inserted = await Project.insertMany(projectsToInsert);
    console.log(`✅ Seeded ${inserted.length} projects successfully`);

    inserted.forEach((p) => console.log(`   ${p.emoji}  ${p.title} → ${p._id}`));
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected");
    process.exit(0);
  }
};

seedProjects();
