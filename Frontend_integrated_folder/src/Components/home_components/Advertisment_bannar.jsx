"use client"; // Enables client-side rendering in Next.js

function AdvertisementBanner() {
  return (
    <section className="w-3/4 mx-auto mt-10 bg-black text-white rounded-lg flex flex-col md:flex-row items-center justify-between p-10 gap-10 text-center md:text-left">
      {/* Left Side: Advertisement Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="/advertisement-bannar.png" // Path to the advertisement image
          alt="Ad Banner" // Descriptive alt text for accessibility
          className="w-[60%] rounded-lg" // Styling for responsive design
        />
      </div>

      {/* Right Side: Sale Content */}
      <div className="w-[90%] md:w-1/2 flex flex-col justify-center items-center md:items-start pl-0 md:pl-12">
        {/* Sale Tagline */}
        <p className="text-sm uppercase text-white">Summer Sale</p>

        {/* Discount Offer */}
        <h1 className="text-3xl font-bold">
          <span className="text-[tomato]">37%</span> OFF
        </h1>

        {/* Offer Description */}
        <p className="text-[14px] w-full text-gray-300 mt-4">
          Free on all your orders, Free Shipping and 30 days money-back
          guarantee
        </p>

        {/* Shop Now Button */}
        <button className="mt-6 px-6 py-1 bg-[#00B207] text-white rounded-[2rem]">
          Shop Now →
        </button>
      </div>
    </section>
  );
}

export default AdvertisementBanner;
