const db = require("../config/db");

// ✅ Create 'orders' table if it does not exist
db.query(
  `CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- ✅ Unique order ID (auto-incremented)
    user_id INT NOT NULL,  -- ✅ Foreign key reference to users table (assumed)
    total_amount DECIMAL(10,2) NOT NULL,  -- ✅ Total order amount with two decimal places
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',  -- ✅ Order status with default value 'pending'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- ✅ Timestamp of order creation (default: current time)
  )`,
  (err) => {
    if (err) console.error("❌ Orders table creation failed:", err); // ❌ Log error if table creation fails
  }
);

const Order = {
  // ✅ Place a new order
  placeOrder: (user_id, total_amount, callback) => {
    db.query(
      `INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, 'pending')`, // ✅ New orders default to 'pending' status
      [user_id, total_amount],
      callback // ✅ Execute callback function after query execution
    );
  },

  // ✅ Retrieve all orders for a specific user
  getUserOrders: (user_id, callback) => {
    db.query(`SELECT * FROM orders WHERE user_id = ?`, [user_id], callback);
  },

  // ✅ Update the status of a specific order
  updateOrderStatus: (order_id, status, callback) => {
    db.query(
      `UPDATE orders SET status = ? WHERE id = ?`, // ✅ Update order status based on order ID
      [status, order_id],
      callback
    );
  },

  // ✅ Cancel an order by updating its status to 'cancelled'
  cancelOrder: (order_id, callback) => {
    db.query(
      `UPDATE orders SET status = 'cancelled' WHERE id = ?`, // ✅ Change order status to 'cancelled'
      [order_id],
      callback
    );
  },
};

module.exports = Order; // ✅ Export the Order object for use in other modules
