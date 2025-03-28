"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

function ProductCard() {
  const [products, setProducts] = useState([]); // State to store product data
  const [loading, setLoading] = useState(true); // Loading state
  const [userId, setUserId] = useState(null); // User ID state (not currently used)
  const [error, setError] = useState(null); // Error state for handling errors
  const router = useRouter(); // Router instance for navigation

  // Fetch product data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle adding a product to the cart
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
          headers: { Authorization: `Bearer ${token}` }, // Include auth token
        }
      );
    } catch (error) {
      console.error("Failed to add to cart:", error.response?.data || error);
    }
  };

  // Function to handle "Buy Now" button click
  const handleBuyNow = (product) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in first.");
      router.push("/Register");
      return;
    }

    // Store selected product in sessionStorage before redirecting
    sessionStorage.setItem("selectedProduct", JSON.stringify(product));

    // Redirect to billing page
    router.push("/billing");
  };

  // Function to handle clicking on a product card
  const handleProductClick = (product) => {
    if (!product) return;

    sessionStorage.setItem("selectedProduct", JSON.stringify(product)); // Store data in sessionStorage
    router.push("/Product_description"); // Navigate without query params
  };

  // Handle loading and error states
  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <section className="w-[90%] md:w-full lg:w-full mx-auto mt-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-[5px] p-2 md:p-3 border flex flex-col items-center text-center relative transition-all duration-300 hover:scale-101 hover:shadow-lg"
          >
            {/* Sale Tag */}
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs md:text-[10px] px-2 py-1 rounded">
              {product.discount}% Off
            </div>

            {/* Product Image */}
            <img
              src={product.image_url}
              alt={product.name}
              className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-cover mb-4 cursor-pointer"
              onClick={() => handleProductClick(product)}
            />

            {/* Product Details */}
            <div className="w-full flex gap-2 flex-col md:flex-col lg:flex-row px-2 md:px-0 lg:px-0 justify-between text-center items-center">
              <div className="flex flex-col lg:text-left w-[50%]">
                <h3 className="text-[10px] md:text-[10px] lg:text-[10px] font-bold text-[#4D4D4D]">
                  {product.name}
                </h3>
                <p className="text-[12px] md:text-[14px] lg:text-[16px] text-[#1A1A1A]">
                  &#8377;{product.price}
                </p>

                {/* Rating (Static stars for now) */}
                <div className="flex mt-1 justify-center text-center">
                  <img
                    src="/Icons & Icon-gifs/full star.png"
                    className="w-[10px] md:w-[12px] lg:w-[14px]"
                  />
                  <img
                    src="/Icons & Icon-gifs/full star.png"
                    className="w-[10px] md:w-[12px] lg:w-[14px]"
                  />
                  <img
                    src="/Icons & Icon-gifs/full star.png"
                    className="w-[10px] md:w-[12px] lg:w-[14px]"
                  />
                  <img
                    src="/Icons & Icon-gifs/full star.png"
                    className="w-[10px] md:w-[12px] lg:w-[14px]"
                  />
                  <img
                    src="/Icons & Icon-gifs/unfull star.png"
                    className="w-[9px] md:w-[11px] lg:w-[13px]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full md:w-[80%] lg:w-[45%] flex md:flex-col gap-4 mt-2 space-y-2">
                <button
                  onClick={() => addToCart(product)}
                  className="h-8 w-full mx-auto bg-white text-black hover:bg-blue-200 border border-black py-1 px-3 md:py-2 md:px-4 lg:py-2 lg:px-2 rounded text-[10px] md:text-[8px] lg:text-[10px]"
                >
                  Add to Cart
                </button>
                {/* <button
                  onClick={() => handleBuyNow(product)}
                  className="h-8 bg-white text-black m-0 border border-black py-1 px-3 md:py-2 md:px-4 lg:py-2 lg:px-2 rounded text-[10px] md:text-[10px] lg:text-[10px]"
                >
                  Buy Now
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductCard;
