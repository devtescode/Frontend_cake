// pages/Dashboard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import StatsCard from '../StatsCard';
import RevenueChart from '../RevenueChart';
import RecentOrders from '../RecentOrders';

const AdminLayout = () => {
  const stats = [
    { title: 'Total Users', value: '1,234', icon: '👥', change: '+12%', color: 'blue' },
    { title: 'Total Cakes', value: '89', icon: '🧁', change: '+5%', color: 'pink' },
    { title: 'Total Orders', value: '2,456', icon: '🛒', change: '+18%', color: 'green' },
    { title: 'Revenue', value: '₦450,000', icon: '💰', change: '+25%', color: 'purple' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors">
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <RevenueChart />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <RecentOrders />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLayout;
