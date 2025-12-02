// pages/NotificationsManagement.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Modal from "../Modal";
import axios from "axios";
import { ClosedCaption, ColumnsSettings, EyeClosed } from "lucide-react";

const NotificationsManagement = () => {
  const [notifications, setNotifications] = useState([]);
  const [usersList, setUsersList] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    targetAudience: "All Users",
    selectedUsers: [],
  });

  // ✅ Fetch notifications from backend
  const fetchNotifications = async () => {
    const res = await axios.get("http://localhost:4500/admin/getnotifications");
    setNotifications(res.data);
    console.log(res, "responsive");

  };

  // ✅ Fetch all users for selected users option
  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:4500/admin/getAllUsers");
    setUsersList(res.data);
  };

  useEffect(() => {
    fetchNotifications();
    fetchUsers();
  }, []);

  // ✅ Send notification to backend
  const handleSendNotification = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4500/admin/sendnotification", {
        title: newNotification.title,
        message: newNotification.message,
        targetAudience: newNotification.targetAudience,
        selectedUsers: newNotification.selectedUsers,
      });
      // console.log(title);


      fetchNotifications();

      setNewNotification({
        title: "",
        message: "",
        targetAudience: "All Users",
        selectedUsers: [],
      });

      setIsModalOpen(false);
    } catch (error) {
      alert("Error sending notification");
    }
  };



const deleteNotification = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#f6339a",
    confirmButtonText: "Yes, delete it!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:4500/admin/deletenotification/${id}`);
        fetchNotifications();

        Swal.fire({
          title: "Deleted!",
          text: "Notification has been deleted.",
          icon: "success"
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete notification.",
          icon: "error"
        });
      }
    }
  });
};


  return (
    <div className="space-y-6 mt-22 lg:mt-0">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Send Notifications
        </h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-pink-500 text-white px-2 py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center"
        >
          <span className="mr-1">📢</span>
          Send
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <motion.div
            key={notification._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-medium text-gray-900">
                    {notification.title}
                  </h3>
                </div>

                <p className="text-gray-700 mb-3">{notification.message}</p>

                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>
                    📅 {new Date(notification.date).toLocaleDateString()}
                  </span>
                  <span>
                    🎯 {notification.targetAudience === "All Users"
                      ? "All Users"
                      : `${notification.selectedUsers.length} selected users`}
                  </span>
                </div>
              </div>

              <button
                onClick={() => deleteNotification(notification._id)}
                className="text-red-600 hover:text-red-800 ml-4"
              >
                ❌
                
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Send New Notification"
      >
        <form onSubmit={handleSendNotification} className="space-y-4">
          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={newNotification.title}
              onChange={(e) =>
                setNewNotification({
                  ...newNotification,
                  title: e.target.value,
                })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter notification title"
            />
          </div>

          {/* MESSAGE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              value={newNotification.message}
              onChange={(e) =>
                setNewNotification({
                  ...newNotification,
                  message: e.target.value,
                })
              }
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter your message"
            />
          </div>

          {/* TARGET */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Audience
            </label>
            <select
              value={newNotification.targetAudience}
              onChange={(e) =>
                setNewNotification({
                  ...newNotification,
                  targetAudience: e.target.value,
                  selectedUsers: [],
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="All Users">All Users</option>
              <option value="Selected Users">Selected Users</option>
            </select>
          </div>

          {/* SELECT USERS */}
          {newNotification.targetAudience === "Selected Users" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Choose Users
              </label>


              <div className="p-1 h-40 overflow-y-auto border border-gray-300 rounded-lg">
                {usersList.map((user) => {
                  const isSelected = newNotification.selectedUsers.includes(user._id);

                  return (
                    <label
                      key={user._id}
                      className="flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-100 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {
                          let updatedUsers = [];

                          if (isSelected) {
                            // Remove user
                            updatedUsers = newNotification.selectedUsers.filter(
                              (id) => id !== user._id
                            );
                          } else {
                            // Add user
                            updatedUsers = [...newNotification.selectedUsers, user._id];
                          }

                          setNewNotification({
                            ...newNotification,
                            selectedUsers: updatedUsers,
                          });
                        }}
                      />

                      <span className="text-gray-700">
                        {user.fullname}
                        {isSelected && <span className="text-green-500 ml-2">✔</span>}
                      </span>
                    </label>
                  );
                })}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Click to select multiple users.
              </p>
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-lg"
            >
              Send Notification
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default NotificationsManagement;
