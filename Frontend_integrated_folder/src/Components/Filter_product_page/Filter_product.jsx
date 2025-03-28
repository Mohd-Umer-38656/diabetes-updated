"use client"; // Enables client-side rendering in Next.js

import { useState, useEffect } from "react";
import PriceFilter from "@/Components/Shop_components/PriceFilter";
import RatingFilter from "@/Components/Shop_components/RatingFilter";
import MobileFilterButton from "@/Components/Shop_components/MobileFilterButton";
import CategorySelector from "@/Components/Shop_components/CategoryFilter";
import ProductCard from "@/Components/Shop_components/ProductCard";

// Sample product data
const sampleProducts = [
  {
    id: 1,
    name: "Organic Carrots",
    price: 2.99,
    image: "/images/vegetables/carrots.jpg",
    rating: 4.5,
    category: "vegetables",
  },
  {
    id: 2,
    name: "Fresh Spinach",
    price: 3.49,
    image: "/images/vegetables/spinach.jpg",
    rating: 4.3,
    category: "vegetables",
  },
  {
    id: 3,
    name: "Red Bell Peppers",
    price: 1.99,
    image: "/images/vegetables/peppers.jpg",
    rating: 4.7,
    category: "vegetables",
  },
  {
    id: 4,
    name: "Broccoli",
    price: 2.49,
    image: "/images/vegetables/broccoli.jpg",
    rating: 4.2,
    category: "vegetables",
  },
];

export default function ShopPage() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [products, setProducts] = useState(sampleProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 21; // Total number of pages

  // Check if the user is on a mobile device and hide the sidebar
  useEffect(() => {
    const checkIfMobile = () => {
      if (window.innerWidth < 768) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };

    // Initial check for screen size
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup event listener
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Pagination handler
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // In a real app, you would fetch the products for the current page
  };

  return (
    <div className="container w-[90%] mx-auto px-4 pb-12">
      {/* Breadcrumb navigation */}
      <div className="flex items-center mb-6 text-sm">
        <a href="/" className="text-gray-600">
          Home
        </a>
        <span className="mx-2 text-black">›</span>
        <a href="/categories" className="text-gray-600">
          Categories
        </a>
        <span className="mx-2 text-black">›</span>
        <span className="text-blue-300">product</span>
      </div>

      {/* Mobile filter button */}
      <div className="md:hidden mb-4">
        <MobileFilterButton />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar with filters */}
        <div
          className={`w-full md:w-1/4 space-y-4 ${
            showSidebar ? "" : "hidden md:block"
          }`}
        >
          <CategorySelector />
          <PriceFilter />
          <RatingFilter />
        </div>

        {/* Main content section */}
        <div className="w-full md:w-3/4 text-black">
          <div className="flex justify-between items-center mb-6">
            {/* Results count */}
            <div className="text-[12px] md:text-[1rem]">20 Results Found</div>

            {/* Sorting dropdown */}
            <div className="flex items-center text-[12px] md:text-[1rem]">
              <span className="mr-2">Sort by:</span>
              <select className="w-[9rem] md:w-[12rem] border rounded-md p-2 cursor-pointer">
                <option>Latest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
              </select>
            </div>
          </div>

          {/* Product listing */}
          <ProductCard />
        </div>
      </div>
    </div>
  );
}
