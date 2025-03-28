"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PopularTagsFilter() {
  const [isOpen, setIsOpen] = useState(true); // State to track if filter section is open
  const [selectedTags, setSelectedTags] = useState([
    "Healthy",
    "Herbal",
    "Vegetarian",
  ]); // Default selected tags
  const [isMobile, setIsMobile] = useState(false); // State to check if on mobile

  // Effect to handle responsive behavior
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);

      // Auto-close filter section on mobile
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    // Initial check on mount
    checkIfMobile();

    // Listen for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Toggle filter section visibility
  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  // Available tags
  const tags = ["Diabetic-Friendly"];

  // Toggle tag selection
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="border rounded-md p-4 pb-0 bg-white text-black">
      {/* Header section with title and toggle button */}
      <div
        className="flex justify-between items-center mb-4 cursor-pointer"
        onClick={toggleFilter}
      >
        <h3 className="font-medium">Popular Tag</h3>
        <button className="text-xl">
          <span>{isOpen ? "▾" : "▸"}</span>
        </button>
      </div>

      {/* Tag selection area */}
      {isOpen && (
        <div className="flex flex-wrap gap-2 pb-4">
          {tags.map((tag) => (
            <Link href="/Products" key={tag}>
              <button
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedTags.includes(tag)
                    ? "bg-green-300 bg-bg-blue-600"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
