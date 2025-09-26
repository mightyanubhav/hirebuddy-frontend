// import {  useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { backend_url } from "../../context/HardCodedValues";
import { useNavigate } from "react-router-dom";

const Header = ({ credits, setCredits }) => {
  const { user } = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // helper to load Razorpay SDK dynamically
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) {
        return resolve(true); // already loaded
      }
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleBuyCredits = async () => {
    const token = user?.token;
    if (!token) {
      alert("Please log in to buy credits");
      return;
    }

    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      // create Razorpay order from backend
      const { data } = await axios.post(
        `${backend_url}/payment/create-order`,
        { amount: 500 }, // Rs.500 for example
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const options = {
        key: "rzp_test_R9zYZpwuU3bt98", // your Razorpay key
        amount: data.amount,
        currency: "INR",
        order_id: data.orderId,
        name: "HireBuddy Credits",
        description: "Buy more buddy credits",
        handler: async function (response) {
          await axios.post(
            "/api/payment/verify",
            {
              orderId: data.orderId,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          alert("Payment successful! Credits added.");
          setCredits((prev) => prev + 10); // +10 credits on success
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong with payment.");
    }
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Customer Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="text-gray-700 font-semibold">
            Credits: {credits}
          </div>
          <button
            onClick={handleBuyCredits}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Buy Credits
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
