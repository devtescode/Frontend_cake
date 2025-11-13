import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaMoneyCheck, FaSpinner, FaTrashAlt } from "react-icons/fa";
import { API_URLS } from "../../utils/apiConfig";

const Orderdisplaypage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🧠 Fetch user orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("UserData"));
        const userId = storedUser?.id;

        if (!userId) {
          console.error("User not found in localStorage");
          setLoading(false);
          return;
        }

        const res = await axios.get(API_URLS.getuserorders(userId));
        setOrders(res.data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ➕ Increment quantity
  const handleIncrement = async (orderId, currentQuantity, isPaid) => {
    if (isPaid) return; // Disable increment if paid
    const newQuantity = currentQuantity + 1;
    try {
      await axios.put(API_URLS.updatequantity(orderId), {
        quantity: newQuantity,
      });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, quantity: newQuantity } : order
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // ➖ Decrement quantity
  const handleDecrement = async (orderId, currentQuantity, isPaid) => {
    if (isPaid || currentQuantity <= 1) return; // Disable decrement if paid
    const newQuantity = currentQuantity - 1;
    try {
      await axios.put(API_URLS.updatequantity(orderId), {
        quantity: newQuantity,
      });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, quantity: newQuantity } : order
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // ❌ Remove order
  const handleRemove = async (orderId, isPaid) => {
    if (isPaid) return; // Disable remove if paid

    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This order will be permanently deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#f6339a",
        cancelButtonColor: "#fa333c",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await axios.delete(API_URLS.userdeleteorder(orderId));

        setOrders((prev) => prev.filter((order) => order._id !== orderId));

        Swal.fire({
          title: "Deleted!",
          text: "Your order has been deleted successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error deleting order:", error);

      Swal.fire({
        title: "Error!",
        text: "Something went wrong while deleting the order.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // 💳 Checkout ALL unpaid Orders
  const handleCheckoutAll = async () => {
    try {
      setIsSubmitting(true);
      const storedUser = JSON.parse(localStorage.getItem("UserData"));
      const email = storedUser?.email;

      if (!email) {
        Swal.fire("Login Required", "Please log in to continue", "warning");
        return;
      }

      // ✅ Filter only unpaid orders
      const unpaidOrders = orders.filter((order) => !order.isPaid);

      if (unpaidOrders.length === 0) {
        Swal.fire("All Paid", "You have no unpaid orders to pay for.", "info");
        return;
      }

      // ✅ Calculate total for unpaid orders
      const totalAmount = unpaidOrders.reduce(
        (sum, order) => sum + order.price * order.quantity,
        0
      );

      const paymentData = {
        email,
        amount: Number(totalAmount),
        currency: "NGN",
        metadata: { allOrders: unpaidOrders.map((o) => o._id) },
      };

      console.log("Payment Data Sent:", paymentData);

      const response = await axios.post(API_URLS.payments, paymentData);
      const { authorization_url } = response.data.data;

      if (!authorization_url) {
        throw new Error("No authorization URL returned from Paystack");
      }

      window.location.href = authorization_url;
    } catch (error) {
      console.error("Payment initialization failed:", error);
      Swal.fire("Error", "Unable to initialize payment", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🧮 Subtotal (only unpaid)
  const subtotal = orders
    .filter((o) => !o.isPaid)
    .reduce((sum, order) => sum + order.price * order.quantity, 0);

  // 🌀 Loading State
  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center h-[60vh] text-lg font-medium text-gray-600">
        <FaSpinner className="animate-spin text-4xl text-pink-500" />
      </div>
    );
  }

  // 🚫 No Orders
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <p className="text-red-600 text-lg">
          You have not placed any orders yet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-2">
      {/* LEFT SIDE — CART ITEMS */}
      <div className="lg:col-span-2 bg-white shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Order ({orders.length})
        </h1>

        {orders.map((order) => (
          <div
            key={order._id}
            className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 pb-4 mb-4"
          >
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <img
                src={order.image}
                alt={order.name}
                className="w-24 h-24 object-contain rounded-lg"
              />
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                  {order.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {order.region}, {order.city}
                </p>

                {/* ✅ Payment Status */}
                {/* <p className="mt-1">
                  {order.isPaid ? (
                    <span className="text-green-600 font-semibold text-sm">
                      ✅ Paid Successfully
                    </span>
                  ) : (
                    <span className="text-yellow-500 font-semibold text-sm">
                      ⏳ Make Payment
                    </span>
                  )}
                </p> */}

                <span
                  className={`inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full
  ${order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Awaiting Payment"
                        ? "bg-orange-100 text-orange-700"
                        : order.isPaid
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {order.isPaid
                    ? order.status === "Delivered"
                      ? "Paid & Delivered"
                      : "Paid (Awaiting Delivery)"
                    : "Make Payment"}
                </span>


                {/* ❌ Remove Button */}
                <button
                  onClick={() => handleRemove(order._id, order.isPaid)}
                  disabled={order.isPaid}
                  className={`flex items-center gap-1 text-sm font-medium mt-2 ${order.isPaid
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-red-500 hover:text-red-600"
                    }`}
                >
                  <FaTrashAlt size={14} /> Remove
                </button>
              </div>
            </div>

            {/* QUANTITY & PRICE */}
            <div className="mt-4 sm:mt-0 text-right">
              <p className="text-lg font-bold text-gray-900">
                ₦ {order.price.toLocaleString()}
              </p>

              {/* Quantity Buttons */}
              <div className="mt-2 text-lg font-bold text-gray-900">
                <button
                  onClick={() =>
                    handleDecrement(order._id, order.quantity, order.isPaid)
                  }
                  disabled={order.isPaid}
                  className={`px-2 py-0 rounded ${order.isPaid
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold"
                    }`}
                >
                  -
                </button>
                <span className="text-gray-800 font-semibold mx-2">
                  {order.quantity}
                </span>
                <button
                  onClick={() =>
                    handleIncrement(order._id, order.quantity, order.isPaid)
                  }
                  disabled={order.isPaid}
                  className={`px-2 py-0 rounded ${order.isPaid
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-pink-500 text-white hover:bg-pink-600"
                    }`}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE — SUMMARY */}
      <div className="bg-white shadow-sm p-6 h-fit">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Order SUMMARY</h2>
        <div className="flex justify-between text-gray-700 font-medium mb-6">
          <span>Subtotal</span>
          <span>₦ {subtotal.toLocaleString()}</span>
        </div>
        <button
          onClick={handleCheckoutAll}
          disabled={isSubmitting || subtotal === 0}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 mb-6 transition-colors disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin" /> Processing...
            </>
          ) : (
            <>
              <FaMoneyCheck size={20} /> Checkout All (₦{" "}
              {subtotal.toLocaleString()})
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Orderdisplaypage;
