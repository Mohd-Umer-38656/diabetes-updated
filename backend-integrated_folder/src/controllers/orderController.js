const db = require("../config/db");

// 📌 Place a new order
exports.placeOrder = async (req, res) => {
  const { user_id, total_price, items } = req.body;

  // ✅ Validate request body
  if (!user_id || !total_price || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      error:
        "Invalid request. Ensure user_id, total_price, and items array are provided.",
    });
  }

  const connection = await db.promise().getConnection(); // ✅ Get database connection

  try {
    await connection.beginTransaction(); // ✅ Start transaction

    // ✅ Insert new order into `orders` table with 'pending' status and 'unpaid' payment_status
    const [orderResult] = await connection.query(
      "INSERT INTO orders (user_id, total_price, status, payment_status) VALUES (?, ?, 'pending', 'unpaid')",
      [user_id, total_price]
    );
    const orderId = orderResult.insertId; // ✅ Get the newly created order ID

    // ✅ Insert order items into `order_items` table
    const orderItems = items.map(({ product_id, quantity, price }) => [
      orderId,
      product_id,
      quantity,
      price,
    ]);
    await connection.query(
      "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?",
      [orderItems]
    );

    await connection.commit(); // ✅ Commit transaction
    console.log(`✅ Order placed successfully! Order ID: ${orderId}`);
    res
      .status(201)
      .json({ message: "✅ Order placed successfully!", order_id: orderId });
  } catch (error) {
    await connection.rollback(); // ❌ Rollback transaction if error occurs
    console.error("❌ Error placing order:", error);
    res.status(500).json({ error: "Failed to place order. Please try again." });
  } finally {
    connection.release(); // ✅ Release database connection
  }
};

// 📌 Get all orders for a specific user
exports.getUserOrders = async (req, res) => {
  const { user_id } = req.params;

  // ✅ Validate user_id
  if (isNaN(user_id)) {
    return res
      .status(400)
      .json({ error: "Invalid user ID. Must be a numeric value." });
  }

  try {
    // ✅ Fetch all orders for the given user
    const [orders] = await db
      .promise()
      .query(
        "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
        [user_id]
      );

    // ✅ If no orders found, return 404
    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this user." });
    }

    console.log(`📦 Retrieved ${orders.length} orders for user_id: ${user_id}`);
    res.status(200).json({ orders });
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders." });
  }
};

// 📌 Update order status & payment status
exports.updateOrderStatus = async (req, res) => {
  const { order_id, status, payment_status } = req.body;

  // ✅ Ensure order_id and at least one update field is provided
  if (!order_id || (!status && !payment_status)) {
    return res.status(400).json({
      error:
        "Invalid request. Provide order_id and at least one field to update.",
    });
  }

  try {
    // ✅ Update order status and/or payment_status
    const [result] = await db
      .promise()
      .query(
        "UPDATE orders SET status = COALESCE(?, status), payment_status = COALESCE(?, payment_status) WHERE id = ?",
        [status, payment_status, order_id]
      );

    // ✅ If no rows were affected, order may not exist or no changes needed
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Order not found or no update needed." });
    }

    console.log(`🔄 Order ${order_id} updated successfully!`);
    res.status(200).json({ message: "✅ Order updated successfully!" });
  } catch (error) {
    console.error("❌ Error updating order:", error);
    res.status(500).json({ error: "Failed to update order." });
  }
};

// 📌 Cancel an order
exports.cancelOrder = async (req, res) => {
  const { order_id } = req.body;

  // ✅ Validate order_id
  if (!order_id) {
    return res.status(400).json({ error: "Order ID is required." });
  }

  try {
    // ✅ Update order status to 'canceled' if it's still pending
    const [result] = await db
      .promise()
      .query(
        "UPDATE orders SET status = 'canceled' WHERE id = ? AND status = 'pending'",
        [order_id]
      );

    // ✅ If no rows were affected, order might already be processed or completed
    if (result.affectedRows === 0) {
      return res.status(400).json({
        error:
          "Order cannot be canceled. It may already be processed or completed.",
      });
    }

    console.log(`🚫 Order ${order_id} canceled successfully!`);
    res.status(200).json({ message: "✅ Order canceled successfully!" });
  } catch (error) {
    console.error("❌ Error canceling order:", error);
    res.status(500).json({ error: "Failed to cancel order." });
  }
};
