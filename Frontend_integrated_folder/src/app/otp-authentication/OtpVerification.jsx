"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const OTPAuthentication = () => {
  const [phone, setPhone] = useState(""); // State to store phone number input
  const [phoneError, setPhoneError] = useState(""); // State for phone number validation error
  const [otp, setOtp] = useState(""); // State to store OTP input
  const [generatedOtp, setGeneratedOtp] = useState(null); // State to store the generated OTP
  const [otpSent, setOtpSent] = useState(false); // State to track if OTP is sent
  const [otpVerified, setOtpVerified] = useState(false); // State to track if OTP is verified
  const [otpError, setOtpError] = useState(""); // State to show incorrect OTP message
  const router = useRouter(); // Next.js router for navigation

  // Function to validate phone number (Only 10 digits allowed)
  const validatePhone = (value) => {
    const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters

    if (numericValue.length > 10) {
      setPhoneError("Phone number must be 10 digits.");
    } else if (numericValue.length < 10 && numericValue.length > 0) {
      setPhoneError("Phone number should be exactly 10 digits.");
    } else {
      setPhoneError(""); // Clear error if valid
    }

    setPhone(numericValue);
  };

  // Function to generate and send OTP
  const sendOtp = () => {
    if (phone.length === 10) {
      const otpCode = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit OTP
      setGeneratedOtp(otpCode);
      setOtpSent(true);
      setOtpError(""); // Clear any previous OTP errors
      alert(`Your OTP is: ${otpCode}`); // Simulated OTP alert (Replace with real SMS API)
    }
  };

  // Function to verify OTP and redirect if correct
  const verifyOtp = () => {
    if (otp === generatedOtp?.toString()) {
      setOtpVerified(true);
      setOtpError(""); // Clear OTP error if correct
      alert("OTP Verified Successfully ✅");

      // Store phone number in localStorage (Temporary Authentication)
      localStorage.setItem("authenticatedPhone", phone);

      // Redirect user to Billing Page after successful verification
      router.push("/billing");
    } else {
      setOtpError("Incorrect OTP. Please try again."); // Show error for incorrect OTP
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Centered OTP Box */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl text-black font-semibold mb-6">
          OTP Authentication
        </h2>

        {/* Phone Number Input Section */}
        {!otpSent && (
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Enter Phone Number"
              autoComplete="off"
              className={`text-black border rounded-md p-3 outline-none ${
                phoneError
                  ? "border-red-500"
                  : "border-gray-300 focus:border-black"
              }`}
              value={phone}
              onChange={(e) => validatePhone(e.target.value)}
              maxLength={10} // Limit input to 10 characters
            />
            {phoneError && (
              <p className="text-red-500 text-sm mt-1">{phoneError}</p>
            )}

            {/* Send OTP Button */}
            {phone.length === 10 && !phoneError && (
              <button
                className="mt-4 bg-green-500 text-white px-6 py-2 rounded-md w-full"
                onClick={sendOtp}
              >
                Send OTP
              </button>
            )}
          </div>
        )}

        {/* OTP Verification Section */}
        {otpSent && (
          <div className="flex flex-col mt-4">
            <input
              type="text"
              placeholder="Enter OTP"
              autoComplete="off"
              className="text-black border rounded-md p-3 outline-none border-gray-300 focus:border-black"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6} // Limit OTP input to 6 characters
            />

            {/* Error Message for Wrong OTP */}
            {otpError && (
              <p className="text-red-500 text-sm mt-2">{otpError}</p>
            )}

            {/* Verify OTP Button */}
            <button
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md w-full"
              onClick={verifyOtp}
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OTPAuthentication;
