// pages/CommentsManagement.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CommentsManagement = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'John Doe',
      cake: 'Chocolate Delight',
      comment: 'Amazing cake! The chocolate flavor is rich and the texture is perfect.',
      rating: 5,
      date: '2024-01-15',
      status: 'Approved'
    },
    {
      id: 2,
      user: 'Jane Smith',
      cake: 'Red Velvet',
      comment: 'Beautiful presentation and taste. Will definitely order again!',
      rating: 5,
      date: '2024-01-14',
      status: 'Approved'
    },
    {
      id: 3,
      user: 'Mike Johnson',
      cake: 'Vanilla Dream',
      comment: 'Good cake but could be sweeter. Overall satisfied.',
      rating: 4,
      date: '2024-01-13',
      status: 'Pending'
    },
  ]);

  const [filterStatus, setFilterStatus] = useState('All');
  const [filterProduct, setFilterProduct] = useState('All');

  const products = ['All', 'Chocolate Delight', 'Red Velvet', 'Vanilla Dream'];

  const filteredComments = comments.filter(comment => {
    const matchesStatus = filterStatus === 'All' || comment.status === filterStatus;
    const matchesProduct = filterProduct === 'All' || comment.cake === filterProduct;
    return matchesStatus && matchesProduct;
  });

  const updateCommentStatus = (commentId, newStatus) => {
    setComments(comments.map(comment => 
      comment.id === commentId ? { ...comment, status: newStatus } : comment
    ));
  };

  const deleteComment = (commentId) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Comments & Feedback</h1>
        <div className="text-sm text-gray-600">
          Total Comments: {filteredComments.length}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          >
            <option value="All">All Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
          
          <select
            value={filterProduct}
            onChange={(e) => setFilterProduct(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          >
            {products.map(product => (
              <option key={product} value={product}>{product}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {filteredComments.map((comment, index) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-medium">
                    {comment.user.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{comment.user}</h4>
                    <p className="text-sm text-gray-500">on {comment.cake}</p>
                  </div>
                  <div className="text-sm text-yellow-500">
                    {renderStars(comment.rating)}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-3">{comment.comment}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {new Date(comment.date).toLocaleDateString()}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    comment.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    comment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {comment.status}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                {comment.status === 'Pending' && (
                  <>
                    <button
                      onClick={() => updateCommentStatus(comment.id, 'Approved')}
                      className="text-green-600 hover:text-green-800 text-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateCommentStatus(comment.id, 'Rejected')}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => deleteComment(comment.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommentsManagement;
