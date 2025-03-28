const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// Load environment variables from .env file
dotenv.config();

// Database configuration
const db = require("./src/config/db");

// Import route handlers
const authRoutes = require("./src/routes/auth");
const productRoutes = require("./src/routes/productRoutes");
const offerRoutes = require("./src/routes/offerRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const userRoutes = require("./src/routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 8000; // Define server port

// Middleware setup
app.use(morgan("dev")); // Log HTTP requests
app.use(cors({ credentials: true, origin: "http://localhost:3000" })); // Enable CORS for frontend
app.use(express.json()); // Parse JSON request bodies
app.use(bodyParser.json()); // Additional body parser support
app.use(cookieParser()); // Enable cookie parsing

// Session Middleware (Stores session data in memory)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "mySecretKey", // Secret key for session encryption
    resave: false, // Prevents session from being saved back to the store if unmodified
    saveUninitialized: false, // Don't save uninitialized sessions
    cookie: {
      secure: false, // Set `true` in production with HTTPS
      httpOnly: true, // Restricts access to cookies from JavaScript
      maxAge: 1000 * 60 * 60 * 24, // Cookie expires in 24 hours
    },
  })
);

// Middleware to log incoming requests and session data
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  console.log("Session data:", req.session);
  next();
});

// Define routes
app.use("/users", userRoutes); // User-related routes
app.use("/auth", authRoutes); // Authentication routes
app.use("/products", productRoutes); // Product-related routes
app.use("/cart", cartRoutes); // Cart-related routes
app.use("/offers", offerRoutes); // Offers-related routes

// Test route to check API status
app.get("/", (req, res) => {
  res.send("Welcome to the E-Commerce API");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
