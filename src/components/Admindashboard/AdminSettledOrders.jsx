import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminSettledOrders = () => {
    const [settledOrders, setSettledOrders] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-600 text-lg">Loading settled orders...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Settled Orders</h1>

            {settledOrders.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">No settled orders yet.</p>
            ) : (
                <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="bg-green-50 text-gray-600 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-3">Image</th>
                                <th className="px-6 py-3">Customer</th>
                                <th className="px-6 py-3">Phone</th>
                                <th className="px-6 py-3">City</th>
                                <th className="px-6 py-3">Region</th>
                                <th className="px-6 py-3 text-center">Status</th>
                                <th className="px-6 py-3 text-center">Date Delivered</th>
                            </tr>
                        </thead>
                        <tbody>
                            {settledOrders.map((order) => (
                                <tr key={order._id} className="border-b hover:bg-gray-50 transition duration-200">
                                    <td className="px-6 py-3 font-semibold text-gray-800">
                                        <img
                                            src={order.image}
                                            alt={order.name}
                                            className="w-10 h-10 object-cover rounded-lg"
                                        />
                                    </td>
                                    <td className="px-6 py-3 font-semibold text-gray-800">{order.userId?.fullname}</td>
                                    <td className="px-6 py-3">{order.userId?.phonenumber}</td>
                                    <td className="px-6 py-3">{order.city}</td>
                                    <td className="px-6 py-3">{order.region}</td>
                                    <td className="px-6 py-3 text-center">
                                        <span className="bg-green-100 text-green-700 px-3 py-1 text-xs font-semibold rounded-full">
                                            Delivered
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 text-center">
                                        {new Date(order.updatedAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminSettledOrders;
