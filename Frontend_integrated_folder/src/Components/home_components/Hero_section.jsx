import Image from "next/image";

const DiscountBanner = () => {
  return (
    <div className="w-[90%] mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8 lg:px-16 py-6 md:py-10 lg:py-12">
      {/* Left Section - Promo Cards */}
      <div className="flex flex-col gap-4 w-full md:w-1/2 lg:w-1/3">
        {/* First Card - Eggs */}
        <div className="relative hidden md:block bg-gray-100 p-4 md:p-6 rounded-lg shadow-md text-center md:text-left">
          <div className="absolute h-40 top-[-7rem] inset-0 bg-[url('/722.png')] bg-cover bg-center rounded-lg"></div>
        </div>

        {/* Second Card - Snacks */}
        <div className="relative hidden md:block bg-gray-100 p-4 md:p-6 rounded-lg shadow-md text-center md:text-left">
          <div className="absolute h-40 inset-0 bg-[url('/723.png')] bg-cover bg-center rounded-lg"></div>
        </div>
      </div>

      {/* Middle Section - Discount Message */}
      <div className="w-full md:w-1/2 lg:w-1/3 text-center md:text-left px-4 md:px-6 mt-6 md:mt-0">
        <p className="bg-gradient-to-r from-green-500 to-green-50 text-black px-3 py-1 rounded-md inline-block font-semibold text-sm md:text-base">
          Weekend Discount
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-700 mt-2">
          Get the best quality products at the lowest prices
        </h2>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          We have prepared special discounts for you on grocery products. Don't
          miss these opportunities...
        </p>
        <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
            Shop Now
          </button>
          <div className="flex flex-col items-center sm:items-start">
            <p className="text-red-500 text-lg md:text-xl font-bold">
              ₹27.99{" "}
              <span className="text-gray-400 line-through text-base md:text-lg">
                ₹56.67
              </span>
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Don't miss this limited-time offer.
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Product Image */}
      <div className="w-full md:w-1/3 flex justify-center mt-6 md:mt-0">
        <img
          src="/724.png"
          alt="Protein Shake"
          className="w-40 md:w-48 lg:w-56 object-contain"
        />
      </div>
    </div>
  );
};

export default DiscountBanner;
