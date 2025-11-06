import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:4500/admin/admingetallusers");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const timeAgo = (timestamp) => {
    if (!timestamp) return "N/A";
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks}w ago`;
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths}mo ago`;
    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears}y ago`;
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.number?.includes(searchTerm);

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && user.isActive) ||
      (statusFilter === "Inactive" && !user.isActive);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-3 p-3 sm:p-6 ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-20 sm:mt-0">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Users Management</h1>
        {/* <div className="text-sm text-gray-600">Total Users: {users.length}</div> */}
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0 w-full">
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Total Users */}
          <div className="text-gray-700 text-sm font-medium text-center md:text-right">
            <span className="font-semibold text-pink-600">Users:{users.length}</span>
          </div>
        </div>
      </div>


      {/* Responsive Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 hidden sm:table-header-group">
              <tr>
                {["User", "Contact", "Joined", "Status", "Actions"].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500 text-sm">
                    <div className="flex justify-center items-center text-lg font-medium text-gray-600">
                      <FaSpinner className="animate-spin text-4xl text-pink-500" />
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500 text-sm">
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 sm:table-row flex flex-col sm:flex-row sm:items-center sm:justify-between border-b sm:border-0 px-4 sm:px-0 py-3 sm:py-0"
                  >
                    {/* User Info */}
                    <td className="sm:px-6 py-2 flex items-center gap-3">
                      <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-medium uppercase">
                        {user.fullname?.charAt(0) || "?"}
                      </div>
                      <div>
                        <div className="text-gray-900 font-medium">{user.fullname}</div>
                        <div className="sm:hidden text-gray-500 text-xs">{user.email}</div>
                      </div>
                    </td>

                    {/* Contact Info */}
                    <td className="sm:px-6 py-2 hidden sm:table-cell">
                      <div className="text-gray-900">{user.email}</div>
                      <div className="text-gray-500 text-xs">{user.phonenumber}</div>
                    </td>

                    {/* Joined */}
                    <td className="sm:px-6 py-2 text-gray-500 text-xs sm:text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    {/* Status */}
                    <td className="sm:px-0 py-2">
                      <div className="flex justify-center items-center">
                        {user.isActive ? (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                            {timeAgo(user.lastActiveAt)}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="sm:px-6 py-2 flex justify-end sm:justify-start gap-2">
                      <button className="text-indigo-600 hover:text-indigo-900 text-sm">
                        View
                      </button>
                      {/* <button
                        className={`${user.isActive
                          ? "text-red-600 hover:text-red-900"
                          : "text-green-600 hover:text-green-900"
                          } text-sm`}
                      >
                        {user.isActive ? "Deactivate" : "Activate"}
                      </button> */}
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
