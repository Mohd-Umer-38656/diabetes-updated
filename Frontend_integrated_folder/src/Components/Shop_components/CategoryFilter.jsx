"use client"; // Enables client-side rendering in Next.js

import { useEffect, useState } from "react";

export default function CategorySelector() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isClient, setIsClient] = useState(false);

  // Ensures the component only renders on the client to prevent SSR hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // List of categories (currently contains only one category)
  const categories = [
    {
      id: 1,
      name: "All Categories",
      count: null, // No count displayed for this category
      isParent: true,
      isOpen: true,
    },
  ];

  // Handles selection of a category
  const handleRadioChange = (id) => {
    setSelectedCategory(id);
  };

  // Prevents rendering mismatched content during SSR
  if (!isClient)
    return <div className="p-4 bg-white">Loading categories...</div>;

  return (
    <div className="w-4.5 p-4 border rounded-md bg-white text-black">
      {/* Filter Section Title */}
      <h3 className=" mb-4 text-4 md:text-[12px]">Product Category:</h3>

      {/* Category Selection List */}
      {categories.map((category) => (
        <label
          key={category.id}
          className="flex items-center mb-2 cursor-pointer lg:text-[14px] md:text-[12px] text-9px"
        >
          <input
            type="radio"
            name="category"
            value={category.id}
            checked={selectedCategory === category.id}
            onChange={() => handleRadioChange(category.id)}
            className="mr-2"
          />
          {category.name} {category.count !== null && `(${category.count})`}
        </label>
      ))}

      {/* Uncomment this section to display the selected category */}
      {/* 
      <h3 className="font-bold mt-4">Selected Category:</h3>
      <p>{selectedCategory ? categories.find(cat => cat.id === selectedCategory)?.name : "None"}</p> 
      */}
    </div>
  );
}
