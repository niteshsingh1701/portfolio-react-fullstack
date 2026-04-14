const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    emoji: { type: String, default: "🚀" },
    description: { type: String, required: true },
    longDescription: { type: String, default: "" },
    techStack: [{ type: String }],
    features: [{ type: String }],
    liveUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    category: {
      type: [String],
      enum: ["React", "WordPress", "HTML/CSS", "Full-Stack"],
      default: ["React"],
    },
    // Lower number means higher priority in project listing.
    priority: { type: Number, default: 999, index: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
