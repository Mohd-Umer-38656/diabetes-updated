"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/signup",
        formData
      );

      if (response.status >= 200 && response.status < 300) {
        setSuccess("Registration successful! Redirecting...");

        // Wait for a short delay before redirecting
        setTimeout(() => {
          router.replace("/Login");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.error || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-center font-bold text-lg mb-4 text-black">
          Register
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-black">Name *</label>
            <input
              type="text"
              name="name"
              required
              autoComplete="off"
              className="w-full p-2 border rounded text-black"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-black">Email Address *</label>
            <input
              type="email"
              name="email"
              required
              autoComplete="off"
              className="w-full p-2 border rounded text-black"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-black">Password *</label>
            <input
              type="password"
              name="password"
              required
              autoComplete="off"
              className="w-full p-2 border rounded text-black"
              onChange={handleChange}
            />
          </div>

          {/* Privacy Policy */}
          <h2 className="text-sm text-center mb-4 text-gray-700">
            Your personal data will be used to support your experience, to
            manage account access, and for other purposes as described in our{" "}
            <a href="/privacy-policy" className="text-blue-500 underline">
              Privacy Policy
            </a>
            .
          </h2>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-black">
          Already have an account?{" "}
          <a href="/Login" className="text-blue-500 underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
