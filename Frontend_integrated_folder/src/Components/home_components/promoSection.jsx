"use client";

export default function PromoSection() {
  return (
    <section className="container w-[90%] md:w-[80%] lg:w-[80%] mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Promo - Content & Image Side by Side */}
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-6">
          <div className="text-center lg:text-left">
            <span className="bg-orange-200 text-orange-700 px-3 py-1 rounded-md text-sm font-semibold">
              Only This Week
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2 text-black">
              Make your grocery shopping easy with us
            </h2>
            <p className="text-gray-500 mt-2">Only this week. Don’t miss...</p>
            <button className="mt-4 px-6 py-2 bg-white text-black border border-black rounded-full flex items-center justify-center gap-2 hover:bg-gray-800 transition">
              Shop Now →
            </button>
          </div>
          {/* Product Image (Right Side) */}
          <div className="flex-shrink-0">
            <img
              src="/3 4.png" // Replace with actual image
              alt="Product 1"
              className="w-40 md:w-48"
            />
          </div>
        </div>

        {/* Right Promo - Content & Image Side by Side */}
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-6">
          <div className="text-center lg:text-left">
            <span className="bg-orange-200 text-orange-700 px-3 py-1 rounded-md text-sm font-semibold">
              Only This Week
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2 text-black">
              Get your everyday needs here with us
            </h2>
            <p className="text-gray-500 mt-2">
              A different kind of grocery store
            </p>
            <button className="mt-4 px-6 py-2 bg-white text-black border border-black rounded-full flex items-center justify-center gap-2 hover:bg-gray-800 transition">
              Shop Now →
            </button>
          </div>
          {/* Product Image (Right Side) */}
          <div className="flex-shrink-0">
            <img
              src="/724.png" // Replace with actual image
              alt="Product 2"
              className="w-40 md:w-48"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
