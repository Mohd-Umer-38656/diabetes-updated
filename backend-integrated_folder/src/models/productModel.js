const db = require("../config/db"); // ✅ Import database connection

// ✅ Fetch all products from the database
const getAllProducts = (callback) => {
  db.query("SELECT * FROM products", callback); // ✅ Retrieve all rows from 'products' table
};

// ✅ Fetch a single product by its ID
const getProductById = (id, callback) => {
  db.query("SELECT * FROM products WHERE ProductID = ?", [id], callback);
  // ✅ Use parameterized query to prevent SQL injection
};

// ✅ Insert a new product into the database
const createProduct = (product, callback) => {
  const {
    Name,
    Description,
    Price,
    Discount,
    FinalPrice,
    StockQuantity,
    CategoryID,
    ImageURL,
  } = product;

  // ✅ Ensure all column names match the database table schema.

  const query =
    "INSERT INTO Products (name, description, price, stock_quantity, category, discount, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)";

  db.query(
    query,
    [
      Name, // ✅ Product name
      Description, // ✅ Product description
      Price, // ✅ Original price
      Discount, // ✅ Discount
      FinalPrice, // ✅ FinalPrice
      StockQuantity, // ✅ Available stock quantity
      CategoryID, // ✅ Category reference
      ImageURL, // ✅ Image URL for the product
    ],
    callback
  );
};

// ✅ Export functions for use in other parts of the application
module.exports = { getAllProducts, getProductById, createProduct };
