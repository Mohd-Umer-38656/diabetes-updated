"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
        "http://localhost:8000/auth/login",
        formData
      );

      if (response.status === 200) {
        setSuccess("Login successful! Redirecting...");
        localStorage.setItem("token", response.data.token);
        router.replace("/home");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get("http://localhost:8000/auth/google", {
        withCredentials: true,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        router.replace("/home");
      }
    } catch (err) {
      setError("Google Login failed. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-center font-bold text-lg mb-4 text-black">Login</h2>

        {/* Google Sign-in */}
        <div
          className="flex items-center justify-center mb-4 space-x-2 cursor-pointer p-2 rounded-lg"
          onClick={handleGoogleLogin}
        >
          <FcGoogle className="text-3xl" />
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-black">
              Username or Email *
            </label>
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

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Log in
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-black">
          Don't have an account?{" "}
          <a href="/Register" className="text-blue-500 underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
