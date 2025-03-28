import PaymentMethod from "@/Components/Billing_components/PaymentMethod"; // Importing the PaymentMethod component
import React from "react";

// Main component for the Payment page
const payment = () => {
  return (
    <div>
      <PaymentMethod /> {/* Rendering the PaymentMethod component */}
    </div>
  );
};

export default payment; // Exporting the payment component as default
