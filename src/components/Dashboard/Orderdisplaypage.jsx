import React, { useEffect, useState } from "react";
import axios from "axios";

const Orderdisplaypage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("UserData"));
        const userId = storedUser?.id; // ✅ use .id (not ._id)

        if (!userId) {
          console.error("User not found in localStorage");
          setLoading(false);
          return;
        }

        const res = await axios.get(`http://localhost:4500/usercake/getuserorders/${userId}`);
        setOrders(res.data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-semibold text-gray-600">
        Loading your orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <p className="text-red-600 text-lg">You have not placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Your Orders</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
          >
            <img
              src={order.image}
              alt={order.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold text-gray-800">{order.name}</h2>
              <p className="text-gray-600 font-medium">
                Price: <span className="text-orange-600">₦{order.price.toLocaleString()}</span>
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Region:</span> {order.region}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">City:</span> {order.city}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Address:</span> {order.address}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Ordered on: {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orderdisplaypage;
