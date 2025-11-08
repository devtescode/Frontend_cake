import React, { useEffect, useState } from "react";
import axios from "axios";
import { X, ShoppingBag, DollarSign, Package, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const OverviewPage = () => {
  const [userInfo, setUserInfo] = useState({
    totalOrders: 0,
    totalSpent: 0,
    activeOrders: 0,
    totalQuantity: 0,
    likedCakes: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const storedUser = localStorage.getItem("UserData");
        if (!storedUser) {
          navigate("/login");
          return;
        }

        const user = JSON.parse(storedUser);
        const userId = user.id;

        const res = await axios.get(
          `http://localhost:4500/usercake/getUserDashboard/${userId}`
        );

        console.log("Dashboard data:", res.data);

        const { totalOrders, totalSpent, activeOrders, totalQuantity, recentOrders } = res.data;

        setUserInfo({
          totalOrders,
          totalSpent,
          activeOrders,
          totalQuantity,
          likedCakes: 0,
        });

        // Show first 3 orders in dashboard
        setRecentOrders(res.data.recentOrders.slice(0, 2)); // first 3
        setAllOrders(res.data.recentOrders); // all for modal

        // setRecentOrders(recentOrders.slice(0, 2));
        // setAllOrders(recentOrders);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) return <LoadingSkeleton />;

  const stats = [
    { title: "Total", value: userInfo.totalOrders },
    { title: "Total Orders", value: `₦${userInfo.totalSpent.toLocaleString()}` },
    { title: "Total Quantity", value: userInfo.totalQuantity },
    { title: "Liked Cakes", value: userInfo.likedCakes },
  ];

  return (
    <div className="space-y-5 px-0 md:px-0 py-2">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's a quick look at your activity.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      {/* Recent Orders */}
      <div className="bg-white p-3">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
          {allOrders.length > 2 && (
            <button
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              onClick={() => setModalOpen(true)}
            >
              View All
            </button>
          )}
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No recent orders found.</p>
        ) : (
          <div className="space-y-4">
            {recentOrders.map(order => (
              <OrderRow key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>


      {/* Modal for remaining orders */}
      {modalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white w-full max-w-3xl p-6 overflow-y-auto max-h-[80vh] shadow-lg rounded-2xl"
            initial={{ y: -50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 40 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">All Orders</h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X />
              </button>
            </div>

            <div className="space-y-4">
              {allOrders
                .slice(recentOrders.length) // <-- only show remaining orders
                .map(order => (
                  <OrderRow key={order._id} order={order} />
                ))}
            </div>
          </motion.div>
        </motion.div>
      )}




    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-200 flex items-center justify-between hover:shadow-md transition-shadow duration-200">
    <div>
      <p className="text-sm md:text-base opacity-80">{title}</p>
      <p className="text-2xl md:text-3xl font-bold mt-1">{value}</p>
    </div>
    <div className="text-gray-400 text-3xl">{icon}</div>
  </div>
);

const OrderRow = ({ order }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 space-y-3 sm:space-y-0">
    <div className="flex items-center space-x-4">
      <img src={order.cakeImage} alt={order.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
      <div className="min-w-0">
        <p className="font-medium text-gray-800 truncate">{order.name}</p>
        <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
        <p className="text-sm text-gray-500">Quantity: {order.quantity}</p>
      </div>
    </div>
    <div className="flex items-center justify-between sm:flex-col sm:items-end space-y-1 sm:space-y-2">
      <p className="font-semibold text-gray-800">₦{(order.price * order.quantity).toLocaleString()}</p>
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status.toLowerCase() === "delivered"
        ? "bg-green-100 text-green-800"
        : order.status.toLowerCase() === "processing"
          ? "bg-blue-100 text-blue-800"
          : order.status.toLowerCase() === "pending"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-red-100 text-red-800"
        }`}>
        {order.status}
      </span>
    </div>
  </div>
);

const LoadingSkeleton = () => (
  <div className="flex justify-center items-center h-[70vh]">
    <div className="animate-pulse space-y-4 w-full max-w-6xl">
      <div className="h-10 bg-gray-300 rounded-lg w-1/3 mx-auto"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {Array(4).fill(0).map((_, i) => <div key={i} className="h-28 bg-gray-200 rounded-xl animate-pulse"></div>)}
      </div>
      <div className="h-64 bg-gray-200 rounded-xl mt-6 animate-pulse"></div>
    </div>
  </div>
);

export default OverviewPage;
