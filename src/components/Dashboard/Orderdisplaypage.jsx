import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";

const Orderdisplaypage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

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

    //   const handleRemove = (id) => {
    //     setOrders(orders.filter((order) => order._id !== id));
    //   };

    const subtotal = orders.reduce((sum, order) => sum + order.price, 0);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-lg font-semibold text-gray-600">
                Loading your orders...
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center text-center min-h-screen">
                <p className="text-gray-600 text-lg">You have not placed any orders yet.</p>
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
                                {/* <p className="text-xs text-gray-400 mt-1">Few units left</p> */}
                                <p className="text-orange-600 text-xs font-semibold mt-1">
                                    Sweet Delights
                                </p>
                                <button
                                    //   onClick={() => handleRemove(order._id)}
                                    className="flex items-center gap-1 text-red-500 text-sm font-medium mt-2"
                                >
                                    <FaTrashAlt size={14} /> Remove
                                </button>
                            </div>
                        </div>

                        <div className="mt-4 sm:mt-0 text-right">
                            <p className="text-lg font-bold text-gray-900">
                                ₦ {order.price.toLocaleString()}
                            </p>
                            {(() => {
                                const oldPrices = JSON.parse(localStorage.getItem("oldPrices") || "{}");
                                const oldPrice = oldPrices[order.planId]?.oldPrice;

                                return oldPrice ? (
                                    <p className="text-sm line-through text-gray-400">
                                        ₦ {Number(oldPrice).toLocaleString()}
                                    </p>
                                ) : (
                                    <p className="text-sm line-through text-gray-400 opacity-50">
                                        ₦ {(order.price * 1.1).toLocaleString()}
                                    </p>
                                );
                            })()}

                            <p className="text-xs text-orange-600 font-semibold">-15%</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* RIGHT SIDE — CART SUMMARY */}
            <div className="bg-white shadow-sm p-6 h-fit">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Order SUMMARY</h2>
                <div className="flex justify-between text-gray-700 font-medium mb-6">
                    <span>Subtotal</span>
                    <span>₦ {subtotal.toLocaleString()}</span>
                </div>
                <button
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md transition-all"
                >
                    Checkout (₦ {subtotal.toLocaleString()})
                </button>
            </div>
        </div>
    );
};

export default Orderdisplaypage;
