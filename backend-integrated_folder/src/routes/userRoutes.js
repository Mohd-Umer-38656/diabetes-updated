const express = require("express");
const { requireAuth, requireAdmin } = require("../middleware/authMiddleware");
const router = express.Router();
const userController = require("../controllers/userController");

// Route to fetch all users - Can be restricted to admins if needed
router.get("/", userController.getAllUsers);

module.exports = router;
