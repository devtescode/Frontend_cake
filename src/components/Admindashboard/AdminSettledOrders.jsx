import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

const AdminSettledOrders = () => {
    const [settledOrders, setSettledOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null); // for modal

    useEffect(() => {
        const fetchSettledOrders = async () => {
            try {
                const res = await axios.get("http://localhost:4500/admin/settledorders");
                setSettledOrders(res.data);
            } catch (error) {
                console.error("Error fetching settled orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSettledOrders();
    }, []);

    // ✅ Group orders by userId
    const groupedOrders = settledOrders.reduce((acc, order) => {
        const userId = order.userId?._id;
        if (!acc[userId]) acc[userId] = [];
        acc[userId].push(order);
        return acc;
    }, {});

    if (loading) {
        return (



            <div className=" py-20 flex justify-center items-center h-[60vh] text-lg font-medium text-gray-600">
                <FaSpinner className="animate-spin text-4xl text-pink-500" />
            </div>
        );
    }

    return (
        <div className=" bg-gray-50">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Settled Orders
            </h1>

            {Object.keys(groupedOrders).length === 0 ? (
                <p className="text-center text-gray-500 mt-10">No settled orders yet.</p>
            ) : (
                <div className="space-y-1">
                    {Object.entries(groupedOrders).map(([userId, orders]) => {
                        const user = orders[0].userId; // same user for this group
                        return (
                            <div
                                key={userId}
                                className="bg-white shadow-lg rounded-lg p-4 transition hover:shadow-xl"
                            >
                                <div className="flex justify-between items-center border-b pb-3 mb-3">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800">
                                            {user?.fullname}
                                        </h2>
                                        <p className="text-sm text-gray-500">{user?.phonenumber}</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedUser(userId)}
                                        className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 text-sm"
                                    >
                                        View Orders
                                    </button>
                                </div>
                                <p className="text-gray-500 text-sm">
                                    Total Delivered Orders: <strong>{orders.length}</strong>
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ✅ Modal for showing all orders of a user */}
            {selectedUser && (
                <div className="bg-opacity-50 bg-black/40 backdrop-blur-sm fixed inset-0 flex items-center justify-center z-50 px-2">
                    <div className="bg-white rounded-lg w-full max-w-lg md:w-2/3 lg:w-1/2 shadow-lg flex flex-col max-h-[85vh]">

                        {/* ✅ Fixed header section */}
                        <div className="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-white z-10">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
                                Orders by {groupedOrders[selectedUser][0].userId?.fullname}
                            </h3>
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                            >
                                ✕
                            </button>
                        </div>

                        {/* ✅ Scrollable table area */}
                        <div className="overflow-y-auto p-4">
                            <table className="w-full text-sm text-left text-gray-700">
                                <thead className="bg-green-50 text-gray-600 uppercase text-xs font-semibold">
                                    <tr>
                                        <th className="px-4 py-3">Image</th>
                                        <th className="px-4 py-3">City</th>
                                        <th className="px-4 py-3">Region</th>
                                        <th className="px-4 py-3 text-center">Date Delivered</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {groupedOrders[selectedUser].map((order) => (
                                        <tr
                                            key={order._id}
                                            className="hover:bg-gray-50 transition duration-200"
                                        >
                                            <td className="px-4 py-3">
                                                <img
                                                    src={order.image}
                                                    alt={order.name}
                                                    className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                                                />
                                            </td>
                                            <td className="px-4 py-3">{order.city}</td>
                                            <td className="px-4 py-3">{order.region}</td>
                                            <td className="px-4 py-3 text-center">
                                                {new Date(order.updatedAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminSettledOrders;
