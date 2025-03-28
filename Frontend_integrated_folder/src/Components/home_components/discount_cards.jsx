"use client";

const DiscountCards = () => {
  const discountImages = ["/722.png", "/723.png", "/725.png"];

  return (
    <div className="w-[90%] md:w-[80%] mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6">
      {discountImages.map((image, index) => (
        <div
          key={index}
          className="relative bg-gray-100 p-6 pb-2 rounded-lg shadow-md h-40"
        >
          <div
            className="absolute inset-0 bg-cover bg-center rounded-lg"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default DiscountCards;
