const express = require("express");
const { requireAuth, requireAdmin } = require("../middleware/authMiddleware");
// const { authenticateUser } = require("../middleware/authMiddleware"); // Commented out alternative authentication middleware
const cartController = require("../controllers/cartController");

const router = express.Router();

// Route to add an item to the cart (Requires authentication)
router.post("/", requireAuth, cartController.addToCart);

// Route to view the user's cart (Requires authentication)
router.get("/", requireAuth, cartController.viewCart);

// Route to update the quantity of an item in the cart (Requires authentication)
router.put("/:item_id", requireAuth, cartController.updateCartItem);

// Route to remove an item from the cart (Requires authentication)
router.delete("/:item_id", requireAuth, cartController.removeCartItem);

// Route to proceed with checkout (Requires authentication)
router.post("/checkout", requireAuth, cartController.checkout);

module.exports = router;
