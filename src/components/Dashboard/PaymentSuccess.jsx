import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const location = useLocation();

  useEffect(() => {
    // Paystack returns the reference in the query string
    const query = new URLSearchParams(location.search);
    const reference = query.get("reference");

    if (reference) {
      // Send the reference to your backend to verify the payment
      axios.get(`http://localhost:4500/usercake/payments/verify/${reference}`)
        .then(res => {
          if (res.data.status === "success") {
            alert("Payment verified successfully!");
            // Update UI or order status here
          }
        })
        .catch(err => console.error(err));
    }
  }, [location]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
      <p>We’re verifying your payment...</p>
    </div>
  );
};

export default PaymentSuccess;
