const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Place a new order
router.post("/place", orderController.placeOrder);

// Get all orders for a specific user (Ensure user_id is numeric)
router.get(
  "/:user_id",
  (req, res, next) => {
    if (isNaN(req.params.user_id)) {
      return res
        .status(400)
        .json({ error: "Invalid user ID. Must be a numeric value." });
    }
    next();
  },
  orderController.getUserOrders
);

// Update order status and payment status
router.put("/update", orderController.updateOrderStatus);

// Cancel an order (if still pending)
router.put("/cancel", orderController.cancelOrder);

module.exports = router;
