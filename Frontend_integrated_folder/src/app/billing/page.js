import BillingForm from "@/Components/Billing_components/BillingForm";
// import OrderSummary from "@/Components/Billing_components/OrderSummary";

export default function CheckoutPage() {
  return (
    <div className="w-[90%] md:w-3/4 bg-white container mx-auto p-6 grid grid-cols-1 md:grid-1 gap-2">
      {/* BillingForm component handles the billing details input */}
      <BillingForm />

      {/* OrderSummary component is commented out, it can be used to show order details */}
      {/* <OrderSummary /> */}
    </div>
  );
}
