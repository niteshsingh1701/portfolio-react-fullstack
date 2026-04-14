const Project = require("../models/Project");
const { getIsConnected } = require("../config/db");
const { projects: inMemoryProjects } = require("../data/projects");

const sortByPriority = (items) => {
  return [...items].sort((a, b) => {
    const aPriority = Number.isFinite(a.priority) ? a.priority : Number.MAX_SAFE_INTEGER;
    const bPriority = Number.isFinite(b.priority) ? b.priority : Number.MAX_SAFE_INTEGER;
    if (aPriority !== bPriority) return aPriority - bPriority;

    const aFeatured = a.featured ? 1 : 0;
    const bFeatured = b.featured ? 1 : 0;
    if (aFeatured !== bFeatured) return bFeatured - aFeatured;

    return String(a.title || "").localeCompare(String(b.title || ""));
  });
};

// GET /api/projects
const getAllProjects = async (req, res) => {
  try {
    if (getIsConnected()) {
      const projects = await Project.find().lean();
      const sortedProjects = sortByPriority(projects);
      return res.json({ success: true, count: sortedProjects.length, data: sortedProjects });
    }
    // Fallback: in-memory data
    const withFallbackPriority = inMemoryProjects.map((project, index) => ({
      ...project,
      priority: Number.isFinite(project.priority) ? project.priority : index + 1,
    }));

    const sortedProjects = sortByPriority(withFallbackPriority);

    return res.json({
      success: true,
      count: sortedProjects.length,
      data: sortedProjects,
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
