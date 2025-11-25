import React, { useEffect, useState } from "react";
import axios from "axios";
import { X, ShoppingBag, Package, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { API_URLS } from "../../utils/apiConfig";

const OverviewPage = () => {
  const [userInfo, setUserInfo] = useState({
    totalOrders: 0,        // paid quantity
    totalSpent: 0,         // paid amount
    totalQuantity: 0,      // pending quantity
    pendingAmount: 0,      // pending amount
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

        const res = await axios.get(API_URLS.getUserDashboard(userId));

        console.log("Dashboard data:", res.data);

        const { totalOrders, totalSpent, totalQuantity, pendingAmount, recentOrders } = res.data;

        setUserInfo({
          totalOrders,     // Paid quantity
          totalSpent,      // Paid amount
          totalQuantity,   // Pending quantity
          pendingAmount,   // Pending money
          likedCakes: 0,
        });

        setRecentOrders(recentOrders.slice(0, 2));
        setAllOrders(recentOrders);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) return <LoadingSkeleton />;

  // UPDATED STATS TO MATCH BACKEND
  const stats = [
    { 
      title: "Paid Quantity", 
      value: userInfo.totalOrders, 
      icon: <ShoppingBag />, 
      color: "from-pink-500 to-rose-400" 
    },

    { 
      title: "Paid Amount", 
      value: `₦${userInfo.totalSpent.toLocaleString()}`, 
      icon: "₦", 
      color: "from-emerald-500 to-green-400" 
    },

    { 
      title: "Pending Quantity", 
      value: userInfo.totalQuantity, 
      icon: <Package />, 
      color: "from-blue-500 to-indigo-400" 
    },

    { 
      title: "Pending Amount", 
      value: `₦${userInfo.pendingAmount.toLocaleString()}`, 
      icon: "₦", 
      color: "from-yellow-500 to-orange-400" 
    },
  ];

  return (
    <div className="space-y-5 px-0 md:px-0 py-2">
      
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's a quick look at your activity.</p>
      </div>

      {/* STATS GRID */}
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

      {/* RECENT ORDERS */}
      <div className="bg-white p-3">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>

          {allOrders.length > 2 && (
            <button
              className="text-pink-600 hover:text-pink-700 font-medium text-sm"
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

      {/* MODAL */}
      {modalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white w-full max-w-3xl p-4 overflow-y-auto max-h-[80vh] shadow-lg"
            initial={{ y: -50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">All Orders</h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X />
              </button>
            </div>

            <div className="space-y-4">
              {allOrders.map(order => (
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
  <div className="bg-white p-5 md:p-6 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow duration-200">
    <div>
      <p className="text-sm md:text-base opacity-80">{title}</p>
      <p className="text-2xl md:text-3xl font-bold mt-1">{value}</p>
    </div>
    <div className="text-gray-400 text-3xl">{icon}</div>
  </div>
);

const OrderRow = ({ order }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 shadow-sm hover:shadow-md transition-shadow duration-200 space-y-3 sm:space-y-0">
    <div className="flex items-center space-x-4">
      <img src={order.cakeImage} alt={order.name} className="w-12 h-12 rounded-lg object-cover" />
      <div>
        <p className="font-medium text-gray-800">{order.name}</p>
        <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
        <p className="text-sm text-gray-500">Quantity: {order.quantity}</p>
      </div>
    </div>

    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        order.status.toLowerCase() === "success" || order.status.toLowerCase() === "delivered"
          ? "bg-green-100 text-green-800"
          : order.status.toLowerCase() === "processing"
          ? "bg-blue-100 text-blue-800"
          : order.status.toLowerCase() === "pending"
          ? "bg-yellow-100 text-yellow-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      {order.status}
    </span>
  </div>
);

const LoadingSkeleton = () => (
  <div className="flex justify-center items-center h-[70vh]">
    <div className="animate-pulse space-y-4 w-full max-w-6xl">
      <div className="h-10 bg-gray-300 rounded-lg w-1/3 mx-auto"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {Array(4).fill(0).map((_, i) => <div key={i} className="h-28 bg-gray-200 rounded-xl"></div>)}
      </div>
      <div className="h-64 bg-gray-200 rounded-xl mt-6"></div>
    </div>
  </div>
);

export default OverviewPage;
