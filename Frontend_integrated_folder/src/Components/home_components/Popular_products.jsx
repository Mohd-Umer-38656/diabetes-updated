"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }

    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/products");
        setProducts(response.data);
      } catch (error) {
        setError(error.message);
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
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error("Failed to add to cart:", error.response?.data || error);
    }
  };

  const handleProductClick = (product) => {
    if (!product) return;

    sessionStorage.setItem("selectedProduct", JSON.stringify(product)); // Store data in sessionStorage
    router.push("/Product_description"); // Navigate without query params
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <section className="w-[90%] md:w-[80%] lg:w-[80%] mx-auto mt-6">
      {/* Heading */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-lg lg:text-[2rem] font-black text-black">
          New <span className="text-blue-500">Arrivals</span>
        </h1>
        <p className="text-gray-500 text-[7px] md:text-[12px]">
          Don't miss this opportunity at a special discount just for this week.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product) => {
          const discountAmount =
            (product.price * (product.discount || 0)) / 100;
          const discountedPrice = product.price - discountAmount;
          return (
            <div
              key={product.id}
              className="bg-white rounded-[5px] p-2 md:p-3 border flex flex-col items-center text-center relative transition-all duration-300 hover:scale-101 hover:shadow-lg"
            >
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
                className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-cover mb-4"
              />

              {/* Product Details */}
              <h3 className="text-[10px] md:text-[12px] lg:text-[14px] font-bold text-[#4D4D4D]">
                {product.name}
              </h3>

              <p className="text-[12px] md:text-[14px] lg:text-[16px] text-[#1A1A1A]">
                <span className="text-red-500">
                  &#8377;{discountedPrice.toFixed(2)}
                </span>{" "}
                <span className="line-through text-gray-400 text-[12px]">
                  &#8377;{product.price}
                </span>
              </p>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(product)}
                className="bg-white hover:bg-green-200 text-black border border-black py-1 px-3 md:py-2 md:px-4 rounded text-[10px] md:text-[12px] lg:text-[14px] mt-2 flex items-center gap-2"
              >
                Add to Cart
                <span className="text-xl">🛒</span>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default NewArrivals;
