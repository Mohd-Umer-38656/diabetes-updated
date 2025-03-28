"use client";
import Link from "next/link";

function Footer() {
  return (
    <footer className="w-full bg-black text-white py-10">
      {/* Footer Grid Layout */}
      <div className="w-[90%] md:w-3/4 lg:w-3/4 mx-auto grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 text-center gap-6">
        {/* Company Info Section */}
        <div className="col-span-2">
          <h1 className="text-2xl font-bold">Einfratech</h1>
          <p className="text-gray-400 text-sm mt-2">
            Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis
            dui, eget bibendum magna congue nec.
          </p>

          {/* Contact Information */}
          <div className="mt-4 flex items-center space-x-4">
            <p className="text-white border-b-2 text-[12px] md:text-[1rem] border-blue-400 pb-1">
              (219) 555-0114
            </p>
            <span className="text-gray-400">OR</span>
            <p className="text-white border-blue-400 text-[12px] md:text-[1rem] pb-1 border-b-2">
              Proxy@gmail.com
            </p>
          </div>
        </div>

        {/* My Account Section */}
        <div>
          <h2 className="font-bold mb-2">My Account</h2>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>My Account</li>
            <li>Order History</li>
            <li>Shopping Cart</li>
          </ul>
        </div>

        {/* Helps Section */}
        <div>
          <h2 className="font-bold mb-2">Helps</h2>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>Contact</li>
            <li>FAQs</li>
            <li>Terms & Condition</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Proxy Section with Links */}
        <div>
          <h2 className="font-bold mb-2">Proxy</h2>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>
              <Link href="/Hbout" className="hover:text-gray-200">
                About
              </Link>
            </li>
            <li>
              <Link href="/Products" className="hover:text-gray-200">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/stores" className="hover:text-gray-200">
                Product
              </Link>
            </li>
            <li>
              <Link href="/Cart" className="hover:text-gray-200">
                Track Order
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories Section */}
        <div>
          <h2 className="font-bold mb-2">Categories</h2>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>Prescription Medicines</li>
            <li>Over-the-Counter Drugs</li>
            <li>Health Supplements</li>
            <li>Medical Equipment</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="w-[90%] md:w-3/4 lg:w-3/4 mx-auto border-t border-gray-700 mt-6 pt-2 flex lg:justify-between md:justify-center md:flex-col flex-col lg:flex-row justify-center items-center">
        {/* Copyright Text */}
        <p className="text-gray-500 text-sm">
          Logo © 2025. All Rights Reserved
        </p>

        {/* Payment Methods */}
        <div className="flex space-x-4 p-2 md:p-4">
          <img src="/Icons & Icon-gifs/visa.png" alt="Visa" className="h-6" />
          <img
            src="/Icons & Icon-gifs/mastercard.png"
            alt="Mastercard"
            className="h-6"
          />
          <img
            src="/Icons & Icon-gifs/discover.png"
            alt="Discover"
            className="h-6"
          />
          <img
            src="/Icons & Icon-gifs/apple pay.png"
            alt="Apple Pay"
            className="h-6"
          />
          <img src="/Icons & Icon-gifs/rupay.png" alt="Rupay" className="h-6" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
