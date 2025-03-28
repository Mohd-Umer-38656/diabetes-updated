"use client";

import { useState } from "react";
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [activeTab, setActiveTab] = useState("Home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const menuItems = [
    { name: "Home", hasDropdown: false },
    { name: "Products", hasDropdown: false },
    { name: "Categories", hasDropdown: false },
    { name: "Shop", hasDropdown: false },
  ];

  const handleCart = async (product) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in first.");
      router.push("/Register");
      return;
    }

    router.push("/Cart");
  };

  const handleClickSearch = () => {
    if (!searchTerm.trim()) return; // Prevent searching empty input

    router.push("/products");

    // Perform your search logic here...

    setSearchTerm(""); // Clear the input field after search
  };

  return (
    <nav className="w-[90%] mx-auto  bg-white py-3 px-4 md:px-6 flex flex-col items-center ">
      {/* Top Section - Logo and Search Bar */}
      <div className="w-full flex justify-between items-center mb-3">
        {/* Logo */}
        <div className="text-xl font-bold text-green-900">EinfraTech</div>

        {/* Search Bar */}
        <div className="relative w-[50%] md:w-[50%] lg:w-[60%] hidden sm:block">
          <input
            type="text"
            placeholder="Search for products, categories or brands..."
            className="w-full py-2 px-4 pr-16 bg-gray-200 rounded-md text-black focus:outline-none"
            value={searchTerm} // Controlled input
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <FaSearch
            onClick={() => handleClickSearch()}
            className="absolute right-3 top-3 text-gray-500"
          />
        </div>

        {/* Right Side - Icons & Mobile Menu Button */}
        <div className="flex items-center space-x-5">
          {/* Account (Hidden on small screens) */}
          <div className="hidden md:flex items-center text-gray-700 cursor-pointer hover:text-black">
            <FaUser className="mr-1" />
            <Link href="/Register">
              <div className="flex flex-col px-2 text-sm ">
                Sign In{" "}
                <span className="text-[12px] hover:opacity-50">Account</span>
              </div>
            </Link>
          </div>

          {/* Cart */}
          <div
            onClick={() => handleCart()}
            className="relative cursor-pointer hover:text-red-500 hidden md:block"
          >
            <FaShoppingCart className="text-lg text-black hover:text-red-500" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {cartCount}
              </span>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-xl text-gray-700"
            onClick={() => setIsSidebarOpen(true)}
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Bottom Section - Navigation & Sale */}
      <div className="w-full hidden md:flex justify-between items-center">
        {/* Navigation Links */}
        <ul className="flex space-x-6 text-gray-800 text-sm">
          {menuItems.map((item) => (
            <Link href={`/${item.name.toLowerCase()}`} key={item.name}>
              <li
                className={`flex items-center cursor-pointer relative py-2 px-3 ${
                  activeTab === item.name
                    ? "border-b-[2px] border-gray-400 text-gray-900 font-semibold"
                    : "hover:text-gray-500"
                }`}
                onClick={() => setActiveTab(item.name)}
              >
                {item.name}
                {item.hasDropdown && (
                  <IoIosArrowDown className="ml-1 text-gray-500" />
                )}
              </li>
            </Link>
          ))}
        </ul>

        {/* Sale Notification */}
        <div className="text-red-600 font-semibold flex items-center">
          Almost Finished
          <span className="bg-red-500 text-white text-xs px-2 py-1 ml-1 rounded">
            SALE
          </span>
        </div>
      </div>

      {/* Sidebar Menu for Mobile */}
      {isSidebarOpen && (
        <div className="fixed top-0 right-0 w-[55%] h-full bg-white shadow-lg p-5 flex flex-col md:hidden z-50">
          {/* Close Button */}
          <button
            className="text-xl text-gray-700 self-end mb-5"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTimes />
          </button>

          <div className=" h-full flex justify-between flex-col">
            {/* Navigation Links */}
            <div>
              <ul className="flex flex-col space-y-4 text-gray-800 text-sm">
                {menuItems.map((item) => (
                  <Link href={`/${item.name.toLowerCase()}`} key={item.name}>
                    <li
                      className="flex items-center cursor-pointer hover:text-gray-500"
                      onClick={() => {
                        setActiveTab(item.name);
                        setIsSidebarOpen(false);
                      }}
                    >
                      {item.name}
                      {item.hasDropdown && (
                        <IoIosArrowDown className="ml-1 text-gray-500" />
                      )}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>

            <div>
              {/* Account */}
              <div className="flex items-center text-gray-700 cursor-pointer hover:text-black mb-5">
                <FaUser className="mr-1" />
                <div className="flex flex-col px-2 text-sm">
                  Sign In <span className="text-[12px]">Account</span>
                </div>
              </div>

              {/* Wishlist & Cart */}
              <div className="mt-5 flex space-x-5">
                <div
                  onClick={() => handleCart()}
                  className="relative cursor-pointer hover:text-red-500"
                >
                  <FaShoppingCart className="text-lg text-black" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                      {cartCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
