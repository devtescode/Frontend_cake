import React from 'react';
import { ShoppingBag, DollarSign, Package, Heart } from 'lucide-react';

const OverviewPage = () => {
  const userInfo = {
    totalOrders: 12,
    totalSpent: 485.50,
    activeOrders: 2,
    likedCakes: 8
  };

  const recentOrders = [
    {
      id: 1,
      cakeImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1789&q=80',
      name: 'Chocolate Birthday Cake',
      price: 45.99,
      status: 'Delivered',
      date: '2024-01-15',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 2,
      cakeImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1789&q=80',
      name: 'Vanilla Wedding Cake',
      price: 125.00,
      status: 'Processing',
      date: '2024-01-20',
      statusColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 3,
      cakeImage: '/api/placeholder/80/80',
      name: 'Red Velvet Cupcakes',
      price: 36.00,
      status: 'Pending',
      date: '2024-01-22',
      statusColor: 'bg-yellow-100 text-yellow-800'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your orders.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl p-4 md:p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Orders</p>
              <p className="text-2xl md:text-3xl font-bold">{userInfo.totalOrders}</p>
            </div>
            <ShoppingBag className="h-8 w-8 md:h-12 md:w-12 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl p-4 md:p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Spent</p>
              <p className="text-2xl md:text-3xl font-bold">${userInfo.totalSpent}</p>
            </div>
            <DollarSign className="h-8 w-8 md:h-12 md:w-12 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl p-4 md:p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Active Orders</p>
              <p className="text-2xl md:text-3xl font-bold">{userInfo.activeOrders}</p>
            </div>
            <Package className="h-8 w-8 md:h-12 md:w-12 text-orange-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl p-4 md:p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-sm">Liked Cakes</p>
              <p className="text-2xl md:text-3xl font-bold">{userInfo.likedCakes}</p>
            </div>
            <Heart className="h-8 w-8 md:h-12 md:w-12 text-pink-200" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">Recent Orders</h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All Orders
          </button>
        </div>
        
        <div className="space-y-4">
          {recentOrders.map(order => (
            <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <img 
                  src={order.cakeImage} 
                  alt={order.name} 
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0" 
                />
                <div className="min-w-0">
                  <p className="font-medium text-gray-800 truncate">{order.name}</p>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>
              </div>
              <div className="flex items-center justify-between sm:flex-col sm:items-end">
                <p className="font-semibold text-gray-800">${order.price}</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Browse Cakes</h3>
          <p className="text-sm text-gray-600 mb-4">Discover our delicious cake collection</p>
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
            Shop Now
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Track Orders</h3>
          <p className="text-sm text-gray-600 mb-4">Monitor your active orders</p>
          <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
            Track Now
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-6 w-6 text-pink-600" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Favorites</h3>
          <p className="text-sm text-gray-600 mb-4">Reorder your favorite cakes</p>
          <button className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors">
            View Favorites
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
