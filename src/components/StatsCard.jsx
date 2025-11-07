import React from "react";
import { motion } from "framer-motion";

const StatsCard = ({ title, value, icon, change = "", color }) => {
  const colorGradients = {
    blue: "from-blue-500 to-indigo-500",
    pink: "from-pink-500 to-rose-500",
    green: "from-green-500 to-emerald-500",
    purple: "from-purple-500 to-fuchsia-500",
  };

  const glowColors = {
    blue: "hover:shadow-blue-200",
    pink: "hover:shadow-pink-200",
    green: "hover:shadow-green-200",
    purple: "hover:shadow-purple-200",
  };

  // ✅ Safely determine change color
  const isNegative = typeof change === "string" && change.trim().startsWith("-");
  const changeColor = isNegative ? "text-red-500" : "text-green-600";

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-hidden transition-all duration-300 hover:shadow-lg ${glowColors[color]}`}
    >
      {/* Decorative gradient glow */}
      <div
        className={`absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${colorGradients[color]} blur-2xl`}
      ></div>

      <div className="relative flex items-center justify-between z-10">
        <div>
          <p className="text-sm font-semibold text-gray-500 tracking-wide uppercase">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {/* {change && (
            <p className={`text-sm text-gray-500 mt-1 ${changeColor} font-medium`}>
              {change} from last month
            </p>
          )} */}
        </div>

        <div
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorGradients[color]} flex items-center justify-center text-white text-2xl shadow-md`}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
