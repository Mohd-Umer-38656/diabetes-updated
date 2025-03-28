const db = require("../config/db");

// ✅ Fetch all offers from the database
exports.getAllOffers = async () => {
  const [rows] = await db.execute("SELECT * FROM offers");
  return rows; // ✅ Returns all available offers
};

// ✅ Add a new offer to the database
exports.createOffer = async (discount, expires) => {
  const [result] = await db.execute(
    "INSERT INTO offers (discount, expires) VALUES (?, ?)",
    [discount, expires]
  );
  return result.insertId; // ✅ Returns the ID of the newly inserted offer
};

// ✅ Update an existing offer in the database
exports.updateOffer = async (id, discount, expires) => {
  await db.execute("UPDATE offers SET discount = ?, expires = ? WHERE id = ?", [
    discount,
    expires,
    id,
  ]);
  // ✅ No return value needed as this function just updates an offer
};

// ✅ Delete an offer from the database
exports.deleteOffer = async (id) => {
  await db.execute("DELETE FROM offers WHERE id = ?", [id]);
  // ✅ No return value needed as this function just deletes an offer
};
