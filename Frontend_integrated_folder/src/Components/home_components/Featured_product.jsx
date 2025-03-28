"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function BestSellers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first.");
      router.push("/Register");
      return;
    }
    try {
      await axios.post(
        "http://localhost:8000/cart/",
        { product_id: product.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const handleProductClick = (product) => {
    if (!product) return;

    sessionStorage.setItem("selectedProduct", JSON.stringify(product));
    router.push("/Product_description");
  };

  return (
    <section className="w-[90%] md:w-[80%] lg:w-[80%] mx-auto mt-6">
      {/* Heading Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-lg lg:text-[2rem] font-black text-black">
          Best <span className="text-blue-500">Sellers</span>
        </h1>
        <p className="text-gray-500 text-sm">
          Some of the new products arriving this week.
        </p>
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
        {/* Map through the first 2 products */}
        {products.slice(0, 2).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            handleProductClick={handleProductClick}
          />
        ))}

        {/* Promotional Banner - Takes full width on small screens */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 bg-[#F8F5F2] rounded-lg shadow-md flex flex-col justify-center items-start p-6 relative w-full overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-lg"
            style={{ backgroundImage: "url('/banner 10.png')" }}
          ></div>

          {/* Content */}
          <div className="relative z-10">
            <p className="text-sm text-red-500 font-bold">Only This Week</p>
            <h2 className="text-2xl font-bold text-gray-800 mt-1">
              We are always here to help with your grocery
            </h2>
            <p className="text-gray-600 mt-2">
              A different kind of grocery store
            </p>
            <button className="mt-4 bg-white text-black px-4 py-2 rounded-full hover:bg-blue-200 transition">
              Shop Now →
            </button>
          </div>
        </div>

        {/* Remaining Products */}
        {products.slice(2).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            handleProductClick={handleProductClick}
          />
        ))}
      </div>
    </section>
  );
}

// Component for product cards
const ProductCard = ({ product, addToCart, handleProductClick }) => {
  const discountAmount = (product.price * (product.discount || 0)) / 100;
  const discountedPrice = product.price - discountAmount;

  return (
    <div className="bg-white rounded-lg p-3 border flex flex-col items-center text-center relative transition-all duration-300 hover:scale-101 hover:shadow-lg">
      {/* Discount Badge */}
      {product.discount && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          {product.discount}% Off
        </div>
      )}

      {/* Product Image */}
      <img
        src={product.image_url}
        alt={product.name}
        onClick={() => handleProductClick(product)}
        className="w-28 h-28 object-cover mb-4 cursor-pointer"
      />

      {/* Product Details */}
      <h3 className="text-sm font-bold text-gray-800">{product.name}</h3>
      <p className="text-md text-gray-700">
        <span className="text-red-500">
          &#8377;{discountedPrice.toFixed(2)}
        </span>{" "}
        <span className="line-through text-gray-400 text-sm">
          &#8377;{product.price}
        </span>
      </p>

      {/* Add to Cart Button */}
      <button
        onClick={() => addToCart(product)}
        className="bg-white hover:bg-green-200 text-black border border-black py-2 px-4 rounded text-sm mt-2 flex items-center gap-2"
      >
        Add to Cart 🛒
      </button>
    </div>
  );
};
