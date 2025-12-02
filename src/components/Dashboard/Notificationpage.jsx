import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

const Notificationpage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ loading state
  const user = JSON.parse(localStorage.getItem("UserData"));
  const userId = user?.id;

  const fetchNotifications = async () => {
    try {
      setLoading(true); // start loading
      const res = await axios.get(
        `http://localhost:4500/admin/getusernotifications/${userId}`
      );
      setNotifications(res.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false); // done loading
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-0 px-0 md:px-10 lg:px-0">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Notifications</h1>

      {loading ? (
        <div className="text-center py-20">
          {/* <p className="text-gray-400 text-lg">Loading notifications...</p> */}
          <div className="py-20 flex justify-center items-center h-[20vh] text-lg font-medium text-gray-600">
                  <FaSpinner className="animate-spin text-4xl text-pink-500" />
                </div>
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No notifications available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {notifications.map((notif) => {
            const isRead = notif.readBy.includes(userId);

            return (
              <div
                key={notif._id}
                className={`relative bg-white border border-gray-200 shadow-md p-5 transition-transform transform hover:scale-100 ${
                  isRead ? "opacity-70" : ""
                }`}
              >
                {!isRead && (
                  <span className="absolute top-3 right-3 w-3 h-3 bg-pink-500 rounded-full animate-pulse"></span>
                )}

                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold text-gray-900">{notif.title}</h2>
                  <span className="text-sm text-gray-400">
                    {new Date(notif.date).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-gray-700 mb-3">{notif.message}</p>

                {!isRead && (
                  <button
                    onClick={async () => {
                      await axios.patch(
                        `http://localhost:4500/admin/markasread/${notif._id}`,
                        { userId }
                      );
                      fetchNotifications();
                    }}
                    className="mt-3 text-pink-500 font-medium hover:underline text-sm"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Notificationpage;
