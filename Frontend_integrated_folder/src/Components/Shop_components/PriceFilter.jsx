"use client";

import { useState, useEffect } from "react";

export default function PriceFilter() {
  const [isOpen, setIsOpen] = useState(true); // State to toggle filter visibility
  const [priceRange, setPriceRange] = useState([0, 1500]); // Default price range
  const [isClient, setIsClient] = useState(false); // Ensure client-side rendering

  // Prevents SSR hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Toggle filter visibility
  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  // Handles price range change
  const handleMaxChange = (e) => {
    const newMax = parseInt(e.target.value);
    if (newMax >= 0) {
      setPriceRange([0, newMax]);
    }
  };

  // Prevents server-side mismatches
  if (!isClient) return <div className="p-4 bg-white">Loading...</div>;

  return (
    <div className="border rounded-md p-4 pb-0 bg-white text-black">
      {/* Filter Header with Toggle */}
      <div
        className="flex justify-between items-center mb-4 cursor-pointer"
        onClick={toggleFilter}
      >
        <h3 className="font-medium text-4 md:text-[14px]">Price</h3>
        <button className="text-xl">
          <span>{isOpen ? "▾" : "▸"}</span>
        </button>
      </div>

      {/* Price Range Filter */}
      {isOpen && (
        <div>
          {/* Scroll Bar */}
          <div className="relative w-full h-8 flex items-center">
            {/* Background Track */}
            <div className="absolute top-1/2 left-0 w-full h-[8px] bg-gray-200 rounded transform -translate-y-1/2"></div>

            {/* Black Progress Bar */}
            <div
              className="absolute top-1/2 left-0 h-[8px] text-4 md:text-[12px] bg-black rounded transform -translate-y-1/2"
              style={{
                width: `${(priceRange[1] / 1500) * 100}%`,
              }}
            ></div>

            {/* Input Slider */}
            <input
              type="range"
              min="0"
              max="1500"
              value={priceRange[1]}
              onChange={handleMaxChange}
              className="relative w-full h-8 bg-transparent appearance-none cursor-pointer"
            />

            {/* Custom Thumb Styling */}
            <style jsx>{`
              input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 16px;
                height: 16px;
                background: black;
                border-radius: 50%;
                cursor: pointer;
              }
              input[type="range"]::-moz-range-thumb {
                width: 16px;
                height: 16px;
                background: black;
                border-radius: 50%;
                cursor: pointer;
              }
            `}</style>
          </div>

          {/* Display Selected Price */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500 text-4 md:text-[12px] pb-4">
              Price: ₹0 — ₹{priceRange[1]}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
