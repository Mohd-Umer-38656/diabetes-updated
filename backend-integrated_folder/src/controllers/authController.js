// ✅ Import JWT for token generation and authentication
const jwt = require("jsonwebtoken");

// ✅ Import bcrypt for password hashing and verification
const bcrypt = require("bcryptjs");

// ✅ Import userModel to interact with the user database
const userModel = require("../models/userModel");

// ✅ Import database connection
const db = require("../config/db");

// ✅ Signup function to register new users
exports.signup = async (req, res) => {
  try {
    // Extract user details from the request body
    const { name, email, password, role } = req.body;

    // ✅ Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    console.log("name", name, email, password);

    // ✅ Check if the user already exists by email
    const existingUser = await userModel.findUserByEmail(email);
    console.log("exist", existingUser);

    if (existingUser.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    console.log("2 exist", existingUser);

    // ✅ Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Only allow "admin" role if explicitly provided, otherwise default to "user"
    const userRole = role === "admin" ? "admin" : "user";

    // ✅ Save the new user in the database
    await userModel.createUser(name, email, hashedPassword, userRole);

    // ✅ Send success response with user role
    res
      .status(200)
      .json({ message: "User registered successfully", role: userRole });
  } catch (err) {
    // ✅ Handle server errors
    res.status(500).json({ error: err.message || "Server error" });
  }
};

// ✅ Login function to authenticate users
exports.login = async (req, res) => {
  // Extract login credentials from the request body
  const { email, password } = req.body;

  try {
    // ✅ Fetch user details from the database using email
    const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    // ✅ Check if the user exists
    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // ✅ Get the user details
    const user = users[0];

    // ✅ Compare entered password with hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // ✅ Generate JWT token with user details
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role }, // Include user role in the payload
      process.env.JWT_SECRET, // Secret key for signing JWT
      { expiresIn: "1d", issuer: process.env.JWT_ISSUER } // Token expiration and issuer
    );

    // ✅ Send token & user details in response
    res.json({
      message: "Login successful",
      token,
      userId: user.id,
      role: user.role,
    });
  } catch (error) {
    console.error("Login error:", error); // ✅ Log error for debugging
    res.status(500).json({ error: "Server error" }); // ✅ Handle server errors
  }
};
