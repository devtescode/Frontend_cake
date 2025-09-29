// pages/NotificationsManagement.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from '../Modal';

const NotificationsManagement = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Cake Launch',
      message: 'Try our new Red Velvet Supreme cake with 20% off!',
      date: '2024-01-15',
      recipients: 1234,
      status: 'Sent'
    },
    {
      id: 2,
      title: 'Weekend Special',
      message: 'Get 2 cakes for the price of 1 this weekend only!',
      date: '2024-01-12',
      recipients: 856,
      status: 'Sent'
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    targetAudience: 'All Users'
  });

  const handleSendNotification = (e) => {
    e.preventDefault();
    const notification = {
      id: Date.now(),
      ...newNotification,
      date: new Date().toISOString().split('T')[0],
      recipients: Math.floor(Math.random() * 1000) + 500,
      status: 'Sent'
    };
    
    setNotifications([notification, ...notifications]);
    setNewNotification({ title: '', message: '', targetAudience: 'All Users' });
    setIsModalOpen(false);
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Notifications Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center"
        >
          <span className="mr-2">📢</span>
          Send Notification
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-medium text-gray-900">{notification.title}</h3>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {notification.status}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-3">{notification.message}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>📅 {new Date(notification.date).toLocaleDateString()}</span>
                  <span>👥 {notification.recipients} recipients</span>
                </div>
              </div>
              
              <button
                onClick={() => deleteNotification(notification.id)}
                className="text-red-600 hover:text-red-800 ml-4"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Send Notification Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Send New Notification"
      >
        <form onSubmit={handleSendNotification} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={newNotification.title}
              onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Enter notification title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              value={newNotification.message}
              onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Enter your message"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Audience
            </label>
            <select
              value={newNotification.targetAudience}
              onChange={(e) => setNewNotification({...newNotification, targetAudience: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="All Users">All Users</option>
              <option value="Active Users">Active Users</option>
              <option value="Premium Users">Premium Users</option>
              <option value="New Users">New Users</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-lg hover:bg-pink-600"
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
