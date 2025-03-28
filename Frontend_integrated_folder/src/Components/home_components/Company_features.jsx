"use client"; // Enables client-side rendering for Next.js

import Link from "next/link";
import { useState, useEffect } from "react";

// Product data with price and discount
const products = [
  {
    id: 1,
    image: "/image 4.png",
    title: "Diabetes Plus",
    originalPrice: 401.8,
    discount: 20,
  },
  {
    id: 2,
    image: "/image.png",
    title: "Diabetic Care",
    originalPrice: 500,
    discount: 15,
  },
  {
    id: 3,
    image: "/image 22.png",
    title: "Greens & Herbs",
    originalPrice: 350,
    discount: 10,
  },
  {
    id: 4,
    image: "/image 5.png",
    title: "Diabetic Powder",
    originalPrice: 600,
    discount: 25,
  },
];

function SaleBanner() {
  // Function to calculate discounted price
  const calculateDiscountedPrice = (price, discount) => {
    return (price - (price * discount) / 100).toFixed(2);
  };

  return (
    <section className="w-[90%] md:w-[80%] mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg p-4 flex flex-col items-center shadow-lg"
        >
          <p className="text-orange-500 font-semibold text-[10px]">
            Only This Week
          </p>
          <h2 className="text-[14px] font-bold text-center text-black">
            Provides you experienced quality products
          </h2>
          <p className="text-gray-500 text-[8px]">Feed your family the best</p>
          <button className="mt-2 px-4 py-1 border rounded-lg bg-white text-black font-semibold hover:bg-gray-200">
            Shop Now →
          </button>
          <img
            src={product.image}
            alt={product.title}
            className="w-32 h-32 object-contain mt-4"
          />
          {/* <div className="mt-2 text-center">
            <span className="text-gray-400 line-through text-sm">
              ₹{product.originalPrice}
            </span>
            <span className="text-green-600 text-lg font-bold ml-2">
              ₹
              {calculateDiscountedPrice(
                product.originalPrice,
                product.discount
              )}
            </span>
          </div> */}
        </div>
      ))}
    </section>
  );
}

export default SaleBanner;
