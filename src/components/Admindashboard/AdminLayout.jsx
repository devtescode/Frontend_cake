import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import StatsCard from "../StatsCard";
import RevenueChart from "../RevenueChart";
import RecentOrders from "../RecentOrders";

const AdminLayout = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:4500/admin/getdashboardstatus");
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = stats
    ? [
        { title: "Total Users", value: stats.totalUsers, icon: "👥", color: "blue" },
        { title: "Orders", value: stats.totalCakes, icon: "🧁", color: "pink" },
        { title: "Quantity", value: stats.totalQuantity, icon: "🛒", color: "green" },
        { title: "Revenue", value: `₦${stats.totalRevenue?.toLocaleString()}`, icon: "💰", color: "purple" },
      ]
    : Array(4).fill({ title: "", value: "", icon: "", color: "" });

  return (
    <div className="space-y-6 sm:mt-0 mt-20 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors">
          Generate Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            {loading ? (
              <div className="relative h-28 rounded-2xl bg-gray-200 overflow-hidden">
                {/* Light shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[shimmer_1.8s_infinite] opacity-70"></div>
                {/* Very soft blur */}
                <div className="absolute inset-0 backdrop-blur-[0.5px]" />
              </div>
            ) : (
              <StatsCard {...stat} />
            )}
          </motion.div>
        ))}
      </div>

      {/* Charts and Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {loading ? (
            <div className="relative h-64 bg-gray-200 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[shimmer_1.8s_infinite] opacity-70"></div>
              <div className="absolute inset-0 backdrop-blur-[0.5px]" />
            </div>
          ) : (
            <RevenueChart totalRevenue={stats.totalRevenue} />
          )}
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {loading ? (
            <div className="relative h-64 bg-gray-200 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[shimmer_1.8s_infinite] opacity-70"></div>
              <div className="absolute inset-0 backdrop-blur-[0.5px]" />
            </div>
          ) : (
            <RecentOrders orders={stats.recentOrders} />
          )}
        </motion.div>
      </div>

      {/* Shimmer keyframes */}
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}
      </style>
    </div>
  );
};

export default AdminLayout;
