const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Route for user signup (registration)
router.post("/signup", authController.signup);

// Route for user login
router.post("/login", authController.login);

// Route for user logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to log out" }); // Handle logout failure
    }
    res.status(200).json({ message: "Logged out successfully" }); // Successful logout response
  });
});

// Route to check if a session is active
router.get("/session", (req, res) => {
  if (req.session.userId) {
    res
      .status(200)
      .json({ message: "Session active", userId: req.session.userId }); // If session exists, return active status
  } else {
    res.status(401).json({ error: "No active session" }); // If no session found, return unauthorized status
  }
});

// Exporting router to be used in the main application
module.exports = router;
