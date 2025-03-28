"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductModel({ isOpen, onClose, product }) {
  const [mainImage, setMainImage] = useState(""); // Stores the main product image
  const [userId, setUserId] = useState(null); // Stores the user ID
  const [quantity, setQuantity] = useState(1); // Tracks the selected quantity
  const router = useRouter(); // Next.js router for navigation

  // Function to add product to the cart
  const addToCart = async (product) => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }

    const token = localStorage.getItem("token"); // Retrieve authentication token
    if (!token) {
      alert("Please log in first."); // Alert user if not logged in
      router.push("/Register"); // Redirect to Register page
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/cart/",
        { product_id: product.id, quantity },
        {
          headers: { Authorization: `Bearer ${token}` }, // Send token in request headers
        }
      );
      console.log("Cart updated:", response.data);
    } catch (error) {
      console.error("Failed to add to cart:", error.response?.data || error);
    }
  };

  if (!isOpen) return null; // If modal is not open, return null to hide it

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-5xl w-[90%] md:w-[90%] lg:w-full">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <img
            src="/Icons & Icon-gifs/close.png"
            alt="Close"
            width={24}
            height={24}
          />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {/* Left Side - Product Images */}
          <div className="flex gap-4 flex-col-reverse md:flex-col-reverse lg:flex-row justify-center items-center">
            <div className="flex lg:flex-col gap-2 flex-row md:flex-row justify-center">
              {/* Thumbnail images could be added here */}
            </div>
            {/* Main product image */}
            <Image
              src={product.image_url}
              alt={product.name}
              width={400}
              height={400}
              className="rounded-lg"
            />
          </div>

          {/* Right Side - Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Product Name & Stock Status */}
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-black">
                  {product.name}
                </h1>
                <span className="bg-green-100 text-green-600 text-sm px-3 py-1 rounded-md">
                  {product.stockStatus}
                </span>
              </div>

              {/* Product Rating */}
              <div className="flex items-center gap-2 text-yellow-500 text-lg mt-2">
                {/* Display star rating images */}
                <img
                  src="/Icons & Icon-gifs/full star.png"
                  alt="Star"
                  width={16}
                  height={16}
                />
                <img
                  src="/Icons & Icon-gifs/full star.png"
                  alt="Star"
                  width={16}
                  height={16}
                />
                <img
                  src="/Icons & Icon-gifs/full star.png"
                  alt="Star"
                  width={16}
                  height={16}
                />
                <img
                  src="/Icons & Icon-gifs/full star.png"
                  alt="Star"
                  width={16}
                  height={16}
                />
                <img
                  src="/Icons & Icon-gifs/unfull star.png"
                  alt="Empty Star"
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-600">(4 Reviews)</span>
              </div>

              {/* Product Price & Discount */}
              <p className="text-lg text-gray-700 mt-2">
                <span className="line-through text-gray-500">
                  {product.oldPrice}
                </span>
                <span className="text-green-500 font-bold ml-2 px-2 py-1 rounded">
                  &#8377;{product.price}
                </span>
                <span className="text-sm bg-red-200 text-red-600 px-2 py-1 rounded ml-2">
                  {product.discount}
                </span>
              </p>

              {/* Product Brand & Social Sharing */}
              <div className="flex items-center justify-between border-t pt-3 mt-3 flex-col-reverse md:flex-row gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 font-semibold">Brand:</span>
                  <Image
                    src="/Icons & Icon-gifs/Group 20.png"
                    alt="Brand Logo"
                    width={40}
                    height={20}
                    className="object-contain"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 font-semibold">
                    Share item:
                  </span>
                  {/* Social media icons */}
                  <img
                    src="/Icons & Icon-gifs/facebook.png"
                    alt="Facebook"
                    width={24}
                    height={24}
                  />
                  <img
                    src="/Icons & Icon-gifs/twitter.png"
                    alt="Twitter"
                    width={24}
                    height={24}
                  />
                  <img
                    src="/Icons & Icon-gifs/pinterest.png"
                    alt="Pinterest"
                    width={24}
                    height={24}
                  />
                  <img
                    src="/Icons & Icon-gifs/instagram.png"
                    alt="Instagram"
                    width={24}
                    height={24}
                  />
                </div>
              </div>

              {/* Product Description */}
              <p className="mt-4 text-gray-600">{product.description}</p>
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="flex items-center gap-4 mt-4 flex-col md:flex-row">
              {/* Quantity Selection */}
              <div className="flex items-center border rounded-full px-3 py-1 text-black">
                <button
                  className="px-2 text-gray-600"
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  className="px-2 text-gray-600"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="bg-white text-black border border-black px-6 py-2 rounded-full flex items-center gap-2 hover:scale-101 transition"
              >
                Add to cart+
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
