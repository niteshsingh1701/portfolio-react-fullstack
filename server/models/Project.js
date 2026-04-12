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
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
