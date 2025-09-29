// components/RevenueChart.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RevenueChart = () => {
  const data = [
    { name: 'Jan', revenue: 65000 },
    { name: 'Feb', revenue: 59000 },
    { name: 'Mar', revenue: 80000 },
    { name: 'Apr', revenue: 81000 },
    { name: 'May', revenue: 56000 },
    { name: 'Jun', revenue: 95000 },
    { name: 'Jul', revenue: 120000 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => [`₦${value.toLocaleString()}`, 'Revenue']} />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#ec4899" 
            strokeWidth={2}
            dot={{ fill: '#ec4899' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
