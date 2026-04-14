const express = require("express");
const router = express.Router();
const { submitContact, getContactMessages } = require("../controllers/contactController");

// POST /api/contact
router.post("/", submitContact);

// GET /api/contact/messages
router.get("/messages", getContactMessages);

module.exports = router;
