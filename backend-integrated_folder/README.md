# 🛒 E-Commerce & Order Management Backend API

## 📑 Overview

This project is a combined **E-commerce** and **Order Management System** backend built with **Node.js** and **Express.js**, providing full RESTful API support for:

- User authentication
- Cart operations
- Order processing
- MySQL database integration

## 📂 Project Structure

````
/backend-main                    // Product, Cart, Auth APIs
├── controllers/
├── models/
├── routes/
├── config/
├── middlewares/
├── app.js
└── package.json

## ⚙️ Features
✅ User Authentication (Signup, Login, Logout, Session)
✅ Cart operations (Add, Update, Checkout)
✅ Order management with status tracking
✅ MySQL integration
✅ JWT token-based authentication
✅ Password hashing (bcrypt)
✅ Sequelize ORM

## 🗃 Database Schema Highlights

### 📦 Products Table
```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT DEFAULT 0,
  category VARCHAR(255) NOT NULL,
  discount DECIMAL(5,2) DEFAULT 0.00,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
````

### 👤 Users Table

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(15),
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 🛒 Cart Table

```sql
CREATE TABLE cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
```

### 📃 Orders Table

```sql
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## 🔑 API Endpoints

### ✅ Authentication

| Method | Endpoint        | Description        |
| ------ | --------------- | ------------------ |
| POST   | `/auth/signup`  | Register user      |
| POST   | `/auth/login`   | Login user         |
| POST   | `/auth/logout`  | Logout user        |
| GET    | `/auth/session` | Check user session |

### 📦 Product Management (Admin)

| Method | Endpoint        | Description       |
| ------ | --------------- | ----------------- |
| POST   | `/products`     | Create product    |
| PUT    | `/products/:id` | Update product    |
| DELETE | `/products/:id` | Delete product    |
| GET    | `/products`     | List all products |
| GET    | `/products/:id` | Get product by ID |

### 🛒 Cart Operations

| Method | Endpoint         | Description               |
| ------ | ---------------- | ------------------------- |
| POST   | `/cart`          | Add to cart               |
| GET    | `/cart/:id`      | Get user cart             |
| PUT    | `/cart/:id`      | Update cart item quantity |
| DELETE | `/cart/:id`      | Remove item from cart     |
| POST   | `/cart/checkout` | Checkout                  |

### 📦 Order Management

| Method | Endpoint               | Description               |
| ------ | ---------------------- | ------------------------- |
| POST   | `/orders`              | Create new order          |
| GET    | `/orders/:id`          | Get order by ID           |
| GET    | `/orders/user/:userId` | Get all orders for a user |
| PUT    | `/orders/:id/status`   | Update order status       |

## 🚀 Getting Started

### 📥 Install Dependencies

```bash
cd backend-integrated_folder
npm install

cd ../OrderManagement-API-main
npm install
```

### 🔑 Environment Setup (`.env` sample)

```
PORT=8000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=ecommerce
JWT_SECRET=your_jwt_secret
```

### 🗄 Run Database Migrations

Use the provided SQL queries or Sequelize migrations.

### 🏃 Run the Servers

```bash
# For main backend
cd backend-integrated_folder
npm start


## 📌 Notes
- Secure routes with JWT middleware.
- Passwords hashed using bcrypt.
- Admin privilege needed for product management.
- Order status updates available for processing.


```
