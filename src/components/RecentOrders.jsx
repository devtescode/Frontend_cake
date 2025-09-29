// components/RecentOrders.jsx
import React from 'react';

const RecentOrders = () => {
  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', amount: '₦45,000', status: 'Pending' },
    { id: 'ORD-002', customer: 'Jane Smith', amount: '₦27,000', status: 'Completed' },
    { id: 'ORD-003', customer: 'Mike Johnson', amount: '₦18,000', status: 'Processing' },
    { id: 'ORD-004', customer: 'Sarah Wilson', amount: '₦32,000', status: 'Completed' },
    { id: 'ORD-005', customer: 'David Brown', amount: '₦55,000', status: 'Pending' },
  ];

  const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Completed: 'bg-green-100 text-green-800',
    Processing: 'bg-blue-100 text-blue-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
        <button className="text-sm text-pink-600 hover:text-pink-800">View All</button>
      </div>
      
      <div className="space-y-4">
        {recentOrders.map((order) => (
          <div key={order.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <div>
              <div className="text-sm font-medium text-gray-900">{order.id}</div>
              <div className="text-sm text-gray-500">{order.customer}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">{order.amount}</div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[order.status]}`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;
