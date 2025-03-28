const express = require("express");
const { requireAuth, requireAdmin } = require("../middleware/authMiddleware");
const productController = require("../controllers/productController");

const router = express.Router();

// Public Routes - Accessible to all users
router.get("/", productController.getAllProducts); // Fetch all products
router.get("/:id", productController.getProductById); // Fetch product by ID

// Admin Routes - Require authentication and admin role
router.post("/", productController.addProduct); // Add a new product
router.put("/:id", requireAuth, requireAdmin, productController.updateProduct); // Update product details
router.delete("/:id", productController.deleteProduct); // Delete a product

module.exports = router;
