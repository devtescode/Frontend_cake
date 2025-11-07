import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import StatsCard from "../StatsCard";
import RevenueChart from "../RevenueChart";
import RecentOrders from "../RecentOrders";
import { FaSpinner } from "react-icons/fa";

const AdminLayout = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:4500/admin/getdashboardstatus");
        setStats(res.data);
        console.log(res.data, "stats");
        
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      // <div className="flex justify-center items-center h-96 text-gray-600 text-lg">
      //   Loading dashboard...
      // </div>
       <div className="py-20 flex justify-center items-center h-[60vh] text-lg font-medium text-gray-600">
       <FaSpinner className="animate-spin text-4xl text-pink-500" />
     </div>
    );
  }

  if (!stats) return <div>Error loading dashboard</div>;

  const cards = [
    { title: "Total Users", value: stats.totalUsers, icon: "👥", color: "blue" },
    { title: "Orders", value: stats.totalCakes, icon: "🧁", color: "pink" },
    { title: "Quantity", value: stats.totalQuantity, icon: "🛒", color: "green" },
    { title: "Revenue", value: `₦${stats.totalRevenue.toLocaleString()}`, icon: "💰", color: "purple" },
  ];

  return (
    <div className="space-y-6 sm:mt-0 mt-20">
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
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Charts and Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <RevenueChart totalRevenue={stats.totalRevenue} />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <RecentOrders orders={stats.recentOrders} />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLayout;
