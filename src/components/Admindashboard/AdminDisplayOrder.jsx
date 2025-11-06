import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

const AdminDisplayOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedUserOrders, setSelectedUserOrders] = useState(null);

    const fetchOrders = async () => {
        try {
            const res = await axios.get("http://localhost:4500/usercake/getallorders");
            const pendingOrders = res.data.filter((order) => order.status !== "Delivered");
            setOrders(pendingOrders);
        } catch (err) {
            console.error("Error fetching orders:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // ✅ Group orders by user + region + city
    const groupedOrders = Object.values(
        orders.reduce((acc, order) => {
            const key = `${order.userId?._id}_${order.region}_${order.city}`;
            if (!acc[key]) {
                acc[key] = {
                    user: order.userId,
                    orders: [],
                    region: order.region,
                    city: order.city,
                    address: order.address,  
                    status: order.status,
                };
            }
            console.log(orders, "orders");
            
            acc[key].orders.push(order);
            return acc;
        }, {})
    );

    // ✅ Filter by search and status
    const filteredOrders = groupedOrders.filter((group) => {
        const user = group.user || {};
        const matchesSearch =
            user.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phonenumber?.includes(searchTerm) ||
            group.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            group.region?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === "All" ||
            group.orders.some((o) => o.status === statusFilter);
        return matchesSearch && matchesStatus;
    });

    // ✅ Handle Delivery Confirmation
    const handleDeliveryStatus = async (orderId) => {
        const result = await Swal.fire({
            title: "Confirm Delivery",
            text: "Has this order been delivered successfully?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Delivered",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#16a34a",
        });

        if (result.isConfirmed) {
            try {
                await axios.put(`http://localhost:4500/admin/orders/${orderId}/delivered`);
                Swal.fire("Success", "Order moved to Settled Orders.", "success");

                // ✅ Remove from current list immediately
                setOrders((prev) => prev.filter((order) => order._id !== orderId));
            } catch (error) {
                console.error(error);
                Swal.fire("Error", "Failed to update delivery status.", "error");
            }
        }
    };

    if (loading) {
        return (
            <div className=" py-20 flex justify-center items-center h-[60vh] text-lg font-medium text-gray-600">
                <FaSpinner className="animate-spin text-4xl text-pink-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-0">
            <h1 className="text-3xl font-bold text-gray-800 mb-3 text-center">
                Customer Orders
            </h1>

            {/* Search and Filter */}
            <div className="bg-white sm:p-4 mb-6 w-[100%] mx-auto md:w-full">


                <div className="bg-white rounded-lg shadow-sm p-4 mb-3 w-[100%] mx-auto md:w-full">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0 w-full">
                            <input
                                type="text"
                                placeholder="Search by name, email, phone, city, or region..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="All">All Status</option>
                                <option value="Pending">Pending</option>
                            </select>
                        </div>
                    </div>
                </div>



                {/* Orders Table */}
                {filteredOrders.length === 0 ? (
                    <p className="text-gray-500 text-center mt-10">
                        No matching orders found.
                    </p>
                ) : (
                    <div className="w-full overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
                        <div className="inline-block min-w-full align-middle">
                            <table className="min-w-full table-auto border-collapse text-sm text-left text-gray-700">
                                <thead className="bg-blue-50 text-gray-600 uppercase text-xs font-semibold">
                                    <tr>
                                        <th className="px-0 py-2 whitespace-nowrap">Customer</th>
                                        {/* <th className="px-0 py-2 whitespace-nowrap">Phone</th> */}
                                        <th className="px-0 py-2 text-center whitespace-nowrap">Status</th>
                                        <th className="px-0 py-2 text-center whitespace-nowrap">Orders</th>
                                        <th className="px-0 py-2 text-center whitespace-nowrap">Action</th>
                                        <th className="px-0 py-2 text-center whitespace-nowrap">Delivery</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.map((group, index) => (
                                        <tr
                                            key={index}
                                            className="border-b hover:bg-gray-50 transition duration-200"
                                        >
                                            <td className="px-1 py-2 font-semibold text-gray-800 truncate max-w-[80px]">
                                                {group.user?.fullname}
                                            </td>
                                            {/* <td className="px-1 py-2 truncate max-w-[80px]">
                                            {group.user?.phonenumber}
                                        </td> */}
                                            <td className="px-1 py-2 text-center">
                                                <span
                                                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${group.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : group.status === "Approved"
                                                            ? "bg-green-100 text-green-700"
                                                            : group.status === "Cancelled"
                                                                ? "bg-red-100 text-red-700"
                                                                : "bg-gray-100 text-gray-700"
                                                        }`}
                                                >
                                                    {group.status}
                                                </span>
                                            </td>
                                            <td className="px-1 py-2 text-center">
                                                {group.orders.length}
                                            </td>
                                            <td className="px-1 py-2 text-center">
                                                <button
                                                    onClick={() => setSelectedUserOrders(group)}
                                                    className="px-2 py-1 bg-pink-600 text-white rounded-md text-xs font-semibold hover:bg-pink-700 transition"
                                                >
                                                    View
                                                </button>
                                            </td>
                                            <td className="px-1 py-2 text-center relative group">
                                                <button
                                                    onClick={() => handleDeliveryStatus(group.orders[0]._id)}
                                                    disabled={group.orders.length > 1}
                                                    className={`px-2 py-1 text-white rounded-md text-xs font-semibold transition 
                    ${group.orders.length > 1
                                                            ? "bg-gray-400 cursor-not-allowed"
                                                            : "bg-orange-600 hover:bg-orange-700"
                                                        }`}
                                                >
                                                    Delivered
                                                </button>

                                                {/* Tooltip */}
                                                {group.orders.length > 1 && (
                                                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition">
                                                        Open View to Deliver
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>


            {/* Modal */}
            {selectedUserOrders && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 overflow-y-auto">
                    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 relative">
                        <button
                            onClick={() => setSelectedUserOrders(null)}
                            className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-lg"
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                            {selectedUserOrders.user?.fullname}'s Orders
                        </h2>

                        <div className="border-t border-gray-200 pt-4 space-y-4">
                            {selectedUserOrders.orders.map((order, i) => (
                                <div
                                    key={i}
                                    className="flex items-center space-x-4 border-b pb-3 last:border-none"
                                >
                                    {/* ✅ Add Checkbox */}
                                    <input
                                        type="checkbox"
                                        checked={order.selected || false}
                                        onChange={(e) => {
                                            const updatedOrders = selectedUserOrders.orders.map((o, idx) =>
                                                idx === i ? { ...o, selected: e.target.checked } : o
                                            );
                                            setSelectedUserOrders({
                                                ...selectedUserOrders,
                                                orders: updatedOrders,
                                            });
                                        }}
                                        className="w-4 h-4 accent-green-600"
                                    />

                                    <img
                                        src={order.image}
                                        alt={order.name}
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-800">{order.name}</p>
                                        <p className="text-gray-600 text-sm">
                                            ₦{order.price.toLocaleString()}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Ordered: {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                        <span
                                            className={`inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full ${order.status === "Pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : order.status === "Approved"
                                                    ? "bg-green-100 text-green-700"
                                                    : order.status === "Cancelled"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-gray-100 text-gray-700"
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ✅ Delivery Button */}
                        <div className="mt-6 text-center">
                            <button
                                onClick={async () => {
                                    const selectedIds = selectedUserOrders.orders
                                        .filter((o) => o.selected)
                                        .map((o) => o._id);

                                    if (selectedIds.length === 0) {
                                        Swal.fire("No Selection", "Please select at least one order.", "warning");
                                        return;
                                    }

                                    const result = await Swal.fire({
                                        title: "Confirm Delivery",
                                        text: `Deliver ${selectedIds.length} selected order(s)?`,
                                        icon: "question",
                                        showCancelButton: true,
                                        confirmButtonText: "Yes, Deliver",
                                        cancelButtonText: "Cancel",
                                        confirmButtonColor: "#16a34a",
                                    });

                                    if (result.isConfirmed) {
                                        try {
                                            await axios.put("http://localhost:4500/admin/deliveredgroup", {
                                                orderIds: selectedIds,
                                            });

                                            Swal.fire("Delivered!", "Selected orders have been delivered.", "success");

                                            // Remove delivered orders from state
                                            setOrders((prev) =>
                                                prev.filter((order) => !selectedIds.includes(order._id))
                                            );

                                            // Close modal
                                            setSelectedUserOrders(null);
                                        } catch (error) {
                                            console.error(error);
                                            Swal.fire("Error", "Failed to update delivery status.", "error");
                                        }
                                    }
                                }}
                                className="px-6 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition"
                            >
                                Mark Selected as Delivered
                            </button>
                        </div>

                        <div className="mt-4 text-sm text-gray-600 border-t pt-3">
                            <p>
                                <strong>Region:</strong> {selectedUserOrders.region}
                            </p>
                            <p>
                                <strong>City:</strong> {selectedUserOrders.city}
                            </p>
                           <strong>Address:</strong> {selectedUserOrders.address || "No address provided"}
                            <p>
                                <strong>Email:</strong> {selectedUserOrders.user?.email}
                            </p>
                            <p>
                                <strong>Phone:</strong> {selectedUserOrders.user?.phonenumber}
                            </p>
                            <p>
                                <strong>Name:</strong> {selectedUserOrders.user?.fullname}
                            </p>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminDisplayOrder;
