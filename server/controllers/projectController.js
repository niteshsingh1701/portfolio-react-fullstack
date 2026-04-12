const Project = require("../models/Project");
const { getIsConnected } = require("../config/db");
const { projects: inMemoryProjects } = require("../data/projects");

// GET /api/projects
const getAllProjects = async (req, res) => {
  try {
    if (getIsConnected()) {
      const projects = await Project.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: projects.length, data: projects });
    }
    // Fallback: in-memory data
    return res.json({
      success: true,
      count: inMemoryProjects.length,
      data: inMemoryProjects,
    });
  } catch (err) {
    console.error("getAllProjects error:", err.message);
    res.status(500).json({ success: false, message: "Server error fetching projects" });
  }
};

// GET /api/projects/:id
const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    if (getIsConnected()) {
      const project = await Project.findById(id);
      if (!project) {
        return res.status(404).json({ success: false, message: "Project not found" });
      }
      return res.json({ success: true, data: project });
    }
    // Fallback: in-memory data
    const project = inMemoryProjects.find((p) => p._id === id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    return res.json({ success: true, data: project });
  } catch (err) {
    console.error("getProjectById error:", err.message);
    res.status(500).json({ success: false, message: "Server error fetching project" });
  }
};

module.exports = { getAllProjects, getProjectById };
