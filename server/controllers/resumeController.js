const path = require("path");
const fs = require("fs");

// Track download count in memory (replace with DB counter for production)
let downloadCount = 0;

// GET /api/resume
const downloadResume = (req, res) => {
  // Look for resume either in the server root or in the parent (existing) project root
  const serverDir = path.resolve(__dirname, "../..");
  const candidates = [
    path.join(serverDir, "server", "assets", "Resume_Nitesh.pdf"),
    path.join(serverDir, "..", "Resume_Nitesh.pdf"),  // existing project root
  ];

  let resumePath = null;
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      resumePath = candidate;
      break;
    }
  }

  if (!resumePath) {
    return res.status(404).json({
      success: false,
      message: "Resume file not found. Please check server configuration.",
    });
  }

  downloadCount++;
  console.log(`📄 Resume downloaded (total: ${downloadCount})`);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="Resume_Nitesh_Singh.pdf"'
  );
  res.download(resumePath, "Resume_Nitesh_Singh.pdf");
};

// GET /api/resume/count — optional stats endpoint
const getDownloadCount = (req, res) => {
  res.json({ success: true, count: downloadCount });
};

module.exports = { downloadResume, getDownloadCount };
