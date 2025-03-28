const db = require("../config/db");

class Cart {
  // ✅ Add an item to the cart (or update quantity if it already exists)
  static async addItem(user_id, product_id, quantity) {
    const [result] = await db.execute(
      "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?",
      [user_id, product_id, quantity, quantity]
    );
    return result; // ✅ Returns query result (affected rows, etc.)
  }

  // ✅ Retrieve all cart items for a specific user
  static async getCart(user_id) {
    const [rows] = await db.execute(
      "SELECT cart.id, cart.quantity, products.name, products.price FROM cart JOIN products ON cart.product_id = products.id WHERE cart.user_id = ?",
      [user_id]
    );
    return rows; // ✅ Returns the cart items with product details
  }

  // ✅ Update the quantity of a specific cart item
  static async updateQuantity(cart_id, quantity) {
    const [result] = await db.execute(
      "UPDATE cart SET quantity = ? WHERE id = ?",
      [quantity, cart_id]
    );
    return result; // ✅ Returns query result (affected rows, etc.)
  }

  // ✅ Remove an item from the cart
  static async removeItem(cart_id) {
    const [result] = await db.execute("DELETE FROM cart WHERE id = ?", [
      cart_id,
    ]);
    return result; // ✅ Returns query result (affected rows, etc.)
  }
}

module.exports = Cart; // ✅ Export Cart class for use in controllers
