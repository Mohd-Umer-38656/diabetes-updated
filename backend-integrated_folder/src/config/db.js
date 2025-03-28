// Importing MySQL2 promise-based module for database operations
const mysql = require("mysql2/promise");

// Importing dotenv to load environment variables from a .env file
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables

// Creating a connection pool for managing multiple database connections efficiently
const db = mysql.createPool({
  host: process.env.DB_HOST, // Database host (from environment variables)
  user: process.env.DB_USER, // Database username (from environment variables)
  password: process.env.DB_PASSWORD, // Database password (from environment variables)
  database: process.env.DB_NAME, // Database name (from environment variables)
  connectionLimit: 10, // Maximum number of connections in the pool
  waitForConnections: true, // Wait for a connection to be available if the pool is full
  queueLimit: 0, // Unlimited request queue (0 means no limit)
});

// Immediately Invoked Function Expression (IIFE) to check database connection
(async () => {
  try {
    // Attempt to get a connection from the pool
    const connection = await db.getConnection();
    console.log("✅ Connected to MySQL Database!"); // Log success message
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error("❌ Database connection failed:", err.message); // Log error message
  }
})();

// Exporting the database pool to be used in other parts of the application
module.exports = db;
