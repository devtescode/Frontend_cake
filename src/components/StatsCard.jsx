import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon, change, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    pink: 'bg-pink-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <p className="text-sm text-green-600 mt-1">{change} from last month</p>
        </div>
        <div className={`w-12 h-12 ${colorClasses[color]} rounded-lg flex items-center justify-center text-white text-xl`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
