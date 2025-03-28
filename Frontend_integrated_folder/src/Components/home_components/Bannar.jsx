"use client"; // Enables client-side rendering in Next.js

function Banner() {
  return (
    <section className="w-[90%] md:w-[80%] lg:w-[80%] mx-auto py-4 px-4 mt-6 rounded-lg">
      {/* Container for all feature sections */}
      <div className="banner-all-feature-container flex justify-between items-center gap-4">
        {/* Feature 1: Free Shipping */}
        <div className="flex items-center space-x-4 w-full md:w-[48%] lg:w-[24%]">
          {/* Icon Container */}
          <div className="w-14 h-14 rounded-full bg-[#EDF2EE] flex justify-center items-center">
            <img src="/Icons & Icon-gifs/image 11.png" className="w-8 h-8" />
          </div>
          {/* Text Description */}
          <div className="flex flex-col">
            <h3 className="text-[14px] font-bold text-black">Free Shipping</h3>
            <p className="text-[10px] text-gray-600">
              Shop now and save more! 🚚✨
            </p>
          </div>
        </div>

        {/* Feature 2: 24/7 Customer Support */}
        <div className="flex items-center space-x-4 w-full md:w-[48%] lg:w-[24%]">
          {/* Icon Container */}
          <div className="w-14 h-14 rounded-full bg-[#EDF2EE] flex justify-center items-center">
            <img src="/Icons & Icon-gifs/image 6.png" className="w-8 h-8" />
          </div>
          {/* Text Description */}
          <div className="flex flex-col">
            <h3 className="text-[14px] font-bold text-black">
              Great Support 24/7
            </h3>
            <p className="text-[10px] text-gray-600">
              We're here for you anytime, anywhere! 💬⚡
            </p>
          </div>
        </div>

        {/* Feature 3: Secure Payments */}
        <div className="flex items-center space-x-4 w-full md:w-[48%] lg:w-[24%]">
          {/* Icon Container */}
          <div className="w-12 h-12 rounded-full bg-[#EDF2EE] flex justify-center items-center">
            <img src="/Icons & Icon-gifs/Icon.png" className="w-12 h-12" />
          </div>
          {/* Text Description */}
          <div className="flex flex-col">
            <h3 className="text-[14px] font-bold text-black">
              100% Secure Payment
            </h3>
            <p className="text-[10px] text-gray-600">
              100% secure payment guaranteed! 🔒💳
            </p>
          </div>
        </div>

        {/* Feature 4: Money-Back Guarantee */}
        <div className="flex items-center space-x-4 w-full md:w-[48%] lg:w-[24%]">
          {/* Icon Container */}
          <div className="w-14 h-14 rounded-full bg-[#EDF2EE] flex justify-center items-center">
            <img
              src="/Icons & Icon-gifs/Australian Dollar.png"
              className="w-8 h-8"
            />
          </div>
          {/* Text Description */}
          <div className="flex flex-col">
            <h3 className="text-[14px] font-bold text-black">
              Money-Back Guarantee
            </h3>
            <p className="text-[10px] text-gray-600">
              100% guaranteed money refund! 💳✅
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
