const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const { submitContact, getContactMessages } = require("../controllers/contactController");

const contactSubmitLimiter = rateLimit({
	windowMs: Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000),
	limit: Number(process.env.CONTACT_RATE_LIMIT_MAX || 8),
	standardHeaders: true,
	legacyHeaders: false,
	message: { success: false, message: "Too many contact attempts. Please try later." },
});

const requireAdminApiKey = (req, res, next) => {
	const configuredKey = process.env.ADMIN_API_KEY;
	if (!configuredKey) {
		return res.status(503).json({
			success: false,
			message: "ADMIN_API_KEY is not configured on the server.",
		});
	}

	const incomingKey = req.get("x-admin-api-key");
	if (incomingKey !== configuredKey) {
		return res.status(401).json({ success: false, message: "Unauthorized" });
	}

	return next();
};

// POST /api/contact
router.post("/", contactSubmitLimiter, submitContact);

// GET /api/contact/messages
router.get("/messages", requireAdminApiKey, getContactMessages);

module.exports = router;
