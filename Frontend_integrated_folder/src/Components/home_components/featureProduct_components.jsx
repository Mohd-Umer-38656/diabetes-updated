"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function FeaturedProducts() {
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

  const addToCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first.");
      router.push("/Register");
      return;
    }
    try {
      await axios.post(
        "http://localhost:8000/cart/",
        { product_id: productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const handleProductClick = (product) => {
    if (!product) return;

    sessionStorage.setItem("selectedProduct", JSON.stringify(product)); // Store data in sessionStorage
    router.push("/Product_description"); // Navigate without query params
  };

  return (
    <div className="w-[90%] md:w-[80%] lg:w-[80%] container mx-auto p-4 py-8">
      <h2 className="text-xl md:text-lg lg:text-[2rem] font-bold mb-6 text-black">
        Feature <span className="text-blue-500">Products</span>
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const discountAmount =
              (product.price * (product.discount || 0)) / 100;
            const discountedPrice = product.price - discountAmount;
            return (
              <div
                key={product.id}
                className="bg-white flex flex-row gap-4 rounded-[5px] p-2 md:p-3 border items-center text-center relative transition-all duration-300 hover:scale-101 hover:shadow-lg"
              >
                <div className="w-[45%]">
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
                    className="w-full h-24 md:h-28 lg:h-32 object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between text-left w-[45%] h-24 md:h-28 lg:h-32">
                  <div>
                    {/* Product Details */}
                    <h3 className="text-[12px] md:text-[14px] lg:text-[1rem] font-bold text-[#4D4D4D]">
                      {product.name}
                    </h3>

                    <p className="text-[12px] md:text-[14px] lg:text-[16px] mt-2 text-[#1A1A1A]">
                      <span className="text-red-500">
                        &#8377;{discountedPrice.toFixed(2)}
                      </span>{" "}
                      <span className="line-through text-gray-400 text-[12px]">
                        &#8377;{product.price}
                      </span>
                    </p>
                  </div>

                  <div>
                    {/* Add to Cart Button */}
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-white hover:bg-green-200 text-black border border-black py-1 px-2 md:py-1 md:px-2 rounded text-[10px] md:text-[12px] lg:text-[14px] mt-2 flex items-center gap-2"
                    >
                      Add to Cart
                      <span className="text-xl hidden md:block">🛒</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
