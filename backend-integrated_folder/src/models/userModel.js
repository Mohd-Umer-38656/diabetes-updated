const db = require("../config/db");

// Function to create a new user in the database
exports.createUser = async (name, email, passwordHash, role = "user") => {
  const sql =
    "INSERT INTO users (name, email, password_hash,role) VALUES (?, ?, ?,?)";
  await db.execute(sql, [name, email, passwordHash, role]); // Inserts user data into the users table
};

// Function to find a user by email
exports.findUserByEmail = async (email) => {
  const sql =
    "SELECT id, name, email, password_hash, role FROM users WHERE email = ?";
  const [rows] = await db.execute(sql, [email]); // Executes query to fetch user details by email
  return rows; // Returns an array of users with the matching email
};
