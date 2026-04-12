// Track download count in memory (replace with DB counter for production)
let downloadCount = 0;

// GET /api/resume
const downloadResume = (req, res) => {
  downloadCount++;
  console.log(`📄 Resume downloaded (total: ${downloadCount})`);

  // Direct download link generated from your Google Drive URL
  const fileId = process.env.RESUME_DRIVE_ID;

  if (!fileId) {
    return res.status(500).json({
      success: false,
      message: "Resume Drive ID is not configured on the server. Please set RESUME_DRIVE_ID in your .env file."
    });
  }

  const externalResumeLink = `https://drive.google.com/uc?export=download&id=${fileId}`;
  
  return res.json({
    success: true,
    message: "Resume URL generated successfully",
    url: externalResumeLink
  });
};

// GET /api/resume/count — optional stats endpoint
const getDownloadCount = (req, res) => {
  res.json({ success: true, count: downloadCount });
};

module.exports = { downloadResume, getDownloadCount };
