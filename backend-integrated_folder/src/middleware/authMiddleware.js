const jwt = require("jsonwebtoken");
const db = require("../config/db");
require("dotenv").config();

// ✅ Authentication Middleware (For Authenticated Users)
const requireAuth = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // ✅ Extract Bearer token from header

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" }); // ❌ Reject if no token is provided
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ Verify token using secret key
    req.userId = decoded.userId; // ✅ Attach user ID to request object
    req.userRole = decoded.role; // ✅ Attach user role for authorization checks
    next(); // ✅ Move to the next middleware/controller
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" }); // ❌ Reject if token is invalid
  }
};

// ✅ Authorization Middleware (For Admin Users Only)
const requireAdmin = (req, res, next) => {
  if (!req.userRole || req.userRole !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." }); // ❌ Reject if user is not an admin
  }
  next(); // ✅ Allow access to admin routes
};

// ✅ Export all middleware functions for use in routes
module.exports = { requireAuth, requireAdmin };
