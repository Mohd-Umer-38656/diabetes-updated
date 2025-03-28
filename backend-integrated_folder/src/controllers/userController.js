const db = require("../config/db");

// 🔹 Fetch all users (excluding sensitive data like passwords)
exports.getAllUsers = async (req, res) => {
  try {
    console.log("come"); // ✅ Log to check if function is triggered

    // ✅ Retrieve users with only necessary fields (excluding passwords)
    const [users] = await db.execute("SELECT id, name, email, role FROM users");

    res.status(200).json(users); // ✅ Send the user list as a response
  } catch (error) {
    // ❌ Handle server errors
    res.status(500).json({ error: "Server error" });
  }
};
