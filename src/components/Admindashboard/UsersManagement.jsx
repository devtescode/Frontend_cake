import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";
import { API_URLS } from "../../utils/apiConfig";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(API_URLS.admingetallusers);
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

  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);


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
                    className="
                                 hover:bg-gray-50 
                                 flex flex-col 
                                 sm:table-row 
                                 px-4 sm:px-0 
                                 py-3
                               "
                    >
                    {/* USER */}
                    <td className="sm:table-cell sm:px-6 py-2 flex items-center gap-3 align-middle">
                      <div className="w-10 h-10 min-w-10 min-h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                        {user.profileImage ? (
                          <img
                            src={user.profileImage}
                            alt="User"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-pink-500 text-white font-medium uppercase">
                            {user.fullname?.charAt(0)}
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="text-gray-900 font-medium">{user.fullname}</div>
                      </div>
                    </td>

                    {/* CONTACT */}
                    <td className="hidden sm:table-cell sm:px-6 py-2 align-middle">
                      <div className="text-gray-900">{user.email}</div>
                      <div className="text-gray-500 text-xs">{user.phonenumber}</div>
                    </td>

                    {/* JOINED */}
                    <td className="sm:table-cell sm:px-6 py-2 text-gray-500 text-xs sm:text-sm align-middle">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    {/* STATUS */}
                    <td className="sm:table-cell sm:px-6 py-2 align-middle">
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

                    {/* ACTIONS */}
                    <td className="sm:table-cell sm:px-6 py-2 align-middle">
                      <button
                        className="text-indigo-600 hover:text-indigo-900 text-sm font-medium transition-all"
                        onClick={() => {
                          setSelectedUser(user);
                          setShowModal(true);
                        }}
                      >
                        View
                      </button>
                    </td>
                  </motion.tr>

                ))
              )}
            </tbody>

            {/* <button
                    className={`${user.isActive
                    ? "text-red-600 hover:text-red-900"
                    : "text-green-600 hover:text-green-900"
                    } text-sm`}
                    >
                    {user.isActive ? "Deactivate" : "Activate"}
                    </button>
            {/* USER DETAILS MODAL */}
            {showModal && selectedUser && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative"
                >

                  {/* Close Button */}
                  <button
                    className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-2xl font-bold"
                    onClick={() => setShowModal(false)}
                  >
                    ×
                  </button>

                  {/* Profile Image */}
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gray-200 shadow-md">
                    {selectedUser.profileImage ? (
                      <img
                        src={selectedUser.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-pink-500 text-white text-3xl font-bold">
                        {selectedUser.fullname?.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* User Name */}
                  <h2 className="text-xl font-bold text-center mt-4 text-gray-900">
                    {selectedUser.fullname}
                  </h2>

                  {/* User Info */}
                  <div className="mt-5 space-y-3 text-sm text-gray-700">

                    <div className="flex justify-between">
                      <strong>Email:</strong>
                      <span>{selectedUser.email}</span>
                    </div>

                    <div className="flex justify-between">
                      <strong>Phone:</strong>
                      <span>{selectedUser.phonenumber}</span>
                    </div>

                    <div className="flex justify-between">
                      <strong>Address:</strong>
                      <span>{selectedUser.address || "No address provided"}</span>
                    </div>

                    <div className="flex justify-between">
                      <strong>Bio:</strong>
                      <span>{selectedUser.bio || "No bio available"}</span>
                    </div>

                    <div className="flex justify-between">
                      <strong>Joined:</strong>
                      <span>{new Date(selectedUser.createdAt).toLocaleDateString()}</span>
                    </div>

                  </div>

                  {/* Close Button Bottom */}
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-6 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700 shadow-md"
                    >
                      Close
                    </button>
                  </div>

                </motion.div>
              </div>
            )}

          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
