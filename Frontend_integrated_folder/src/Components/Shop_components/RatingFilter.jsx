"use client";

import { useState, useEffect } from "react";

export default function RatingFilter() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-close on mobile
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    // Initial check
    checkIfMobile();

    // Add resize listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  // Rating options
  const ratings = [
    { value: 5.0, label: "5.0" },
    { value: 4.0, label: "4.0" },
    { value: 3.0, label: "3.0" },
    { value: 2.0, label: "2.0" },
    { value: 1.0, label: "1.0" },
  ];

  // Toggle selected rating
  const toggleRating = (value) => {
    if (selectedRatings.includes(value)) {
      setSelectedRatings(selectedRatings.filter((r) => r !== value));
    } else {
      setSelectedRatings([...selectedRatings, value]);
    }
  };

  // Render star icons based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <span key={i} className="text-yellow-400">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300">
            ★
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div className="border rounded-md p-4 pb-0 bg-white text-black">
      {/* Filter title and toggle button */}
      <div
        className="flex justify-between items-center mb-4 cursor-pointer"
        onClick={toggleFilter}
      >
        <h3 className="font-medium text-4 md:text-[14px]">Rating</h3>
        <button className="text-xl">
          <span>{isOpen ? "▾" : "▸"}</span>
        </button>
      </div>

      {/* Rating filter options */}
      {isOpen && (
        <div className="space-y-2 pb-4">
          {ratings.map((rating) => (
            <div
              key={rating.value}
              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
              onClick={() => toggleRating(rating.value)}
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={selectedRatings.includes(rating.value)}
                onChange={() => {}} // Handled by div click
                className="form-checkbox h-4 w-4 text-green-500"
              />
              {/* Star rating display */}
              <div className="flex items-center text-[12px]">
                {renderStars(Math.floor(rating.value))}
                <span className="ml-1 text-sm text-gray-600">
                  {rating.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
