const express = require("express");
const router = express.Router();
const { downloadResume, getDownloadCount } = require("../controllers/resumeController");

// GET /api/resume — triggers PDF download
router.get("/", downloadResume);

// GET /api/resume/count — total download count
router.get("/count", getDownloadCount);

module.exports = router;
