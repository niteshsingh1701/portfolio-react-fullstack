require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");

// Route imports
const projectRoutes = require("./routes/projectRoutes");
const contactRoutes = require("./routes/contactRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ────────────────────────────────────────────────────────────────
const allowedOrigins = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",") : [];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ──────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Nitesh Singh Portfolio API",
    version: "1.0.0",
    endpoints: {
      projects: "/api/projects",
      projectById: "/api/projects/:id",
      contact: "POST /api/contact",
      resume: "/api/resume",
    },
  });
});

// ─── API Routes ────────────────────────────────────────────────────────────────
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/resume", resumeRoutes);

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ success: false, message: "Internal server error" });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API root: http://localhost:${PORT}/api/projects`);
  });
};

startServer();
