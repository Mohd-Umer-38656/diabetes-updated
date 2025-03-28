// ✅ Import database connection
const db = require("../config/db");

// ✅ Fetch all offers from the database
exports.getOffers = async (req, res) => {
  try {
    // ✅ Execute query to retrieve all offers
    const [offers] = await db.execute("SELECT * FROM offers");
    // ✅ Send retrieved offers as a response
    res.json(offers);
  } catch (error) {
    // ✅ Log error for debugging
    console.error("Error fetching offers:", error);
    res.status(500).json({ error: "Error fetching offers" });
  }
};

// ✅ Add a new offer
exports.addOffer = async (req, res) => {
  // ✅ Extract discount and expiry date from request body
  const { discount, expires } = req.body;

  // ✅ Log request data for debugging
  console.log("click");
  console.log("offer", discount, expires);

  // ✅ Validate required fields
  if (!discount || !expires) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // ✅ Insert new offer into database
    const [result] = await db.execute(
      "INSERT INTO offers (discount, expires) VALUES (?, ?)",
      [discount, expires]
    );

    // ✅ Send success response with inserted offer details
    res.status(201).json({
      id: result.insertId, // Return newly created offer ID
      discount,
      expires,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update an existing offer
exports.updateOffer = async (req, res) => {
  // ✅ Extract offer ID from request parameters
  const { id } = req.params;
  // ✅ Extract updated discount and expiry date from request body
  const { discount, expires } = req.body;

  // ✅ Validate required fields
  if (!discount || !expires) {
    return res
      .status(400)
      .json({ error: "Discount and expiry date are required" });
  }

  try {
    // ❌ Potential issue: `Offer.updateOffer` is undefined
    // ✅ This should be updated to execute a query like `db.execute()`
    await Offer.updateOffer(id, discount, expires);

    // ✅ Send success response
    res.json({ message: "Offer updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating offer" });
  }
};

// ✅ Delete an existing offer
exports.deleteOffer = async (req, res) => {
  // ✅ Extract offer ID from request parameters
  const { id } = req.params;

  try {
    // ❌ Potential issue: `Offer.deleteOffer` is undefined
    // ✅ This should be updated to execute a query like `db.execute()`
    await Offer.deleteOffer(id);

    // ✅ Send success response
    res.json({ message: "Offer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting offer" });
  }
};
