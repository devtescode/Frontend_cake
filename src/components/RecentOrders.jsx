import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RecentOrders = ({ orders = [] }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedOrders = showAll ? orders : orders.slice(0, 4);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          🛍️ Recent Orders
        </h2>
        {orders.length > 4 && (
          <button
            onClick={() => setShowAll(true)}
            className="text-pink-600 hover:text-pink-700 font-medium text-sm transition-colors"
          >
            View All
          </button>
        )}
      </div>

      <ul className="divide-y divide-gray-100">
        {displayedOrders.map((order, i) => (
          <motion.li
            key={order._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="py-4 flex justify-between items-center hover:bg-gray-50 rounded-lg px-2 transition"
          >
            <div>
              <p className="font-medium text-gray-800">{order.name}</p>
              <p className="text-sm text-gray-500">
                {order.userId?.fullname || "Unknown"} —{" "}
                <span
                  className={`${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Pending"
                      ? "text-yellow-500"
                      : "text-gray-500"
                  }`}
                >
                  {order.status}
                </span>
              </p>
            </div>
            <span className="font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-lg">
              ₦{(order.price * order.quantity).toLocaleString()}
            </span>
          </motion.li>
        ))}
      </ul>

      {/* Modal for all orders */}
      <AnimatePresence>
        {showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto p-6 relative"
            >
              <button
                onClick={() => setShowAll(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                📋 All Orders
              </h3>
              <ul className="divide-y divide-gray-200">
                {orders.map((order, index) => (
                  <li
                    key={order._id}
                    className="py-3 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{order.name}</p>
                      <p className="text-sm text-gray-500">
                        {order.userId?.fullname || "Unknown"} —{" "}
                        <span
                          className={`${
                            order.status === "Delivered"
                              ? "text-green-600"
                              : order.status === "Pending"
                              ? "text-yellow-500"
                              : "text-gray-500"
                          }`}
                        >
                          {order.status}
                        </span>
                      </p>
                    </div>
                    <span className="font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-lg">
                      ₦{(order.price * order.quantity).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecentOrders;
