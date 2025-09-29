// pages/CakesManagement.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from '../Modal';
import CakeForm from '../CakeForm';

const CakesManagement = () => {
  const [cakes, setCakes] = useState([
    {
      id: 1,
      name: 'Chocolate Delight',
      price: '₦15,000',
      category: 'Chocolate',
      image: 'https://via.placeholder.com/60x60',
      description: 'Rich chocolate cake with cream frosting'
    },
    {
      id: 2,
      name: 'Vanilla Dream',
      price: '₦12,000',
      category: 'Vanilla',
      image: 'https://via.placeholder.com/60x60',
      description: 'Classic vanilla cake with buttercream'
    },
    {
      id: 3,
      name: 'Red Velvet',
      price: '₦18,000',
      category: 'Special',
      image: 'https://via.placeholder.com/60x60',
      description: 'Luxurious red velvet with cream cheese frosting'
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCake, setEditingCake] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Chocolate', 'Vanilla', 'Special', 'Birthday'];

  const filteredCakes = cakes.filter(cake => {
    const matchesSearch = cake.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || cake.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddCake = () => {
    setEditingCake(null);
    setIsModalOpen(true);
  };

  const handleEditCake = (cake) => {
    setEditingCake(cake);
    setIsModalOpen(true);
  };

  const handleDeleteCake = (id) => {
    setCakes(cakes.filter(cake => cake.id !== id));
  };

  const handleSaveCake = (cakeData) => {
    if (editingCake) {
      setCakes(cakes.map(cake => 
        cake.id === editingCake.id ? { ...cake, ...cakeData } : cake
      ));
    } else {
      setCakes([...cakes, { ...cakeData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Cakes Management</h1>
        <button
          onClick={handleAddCake}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center"
        >
          <span className="mr-2">+</span>
          Add New Cake
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search cakes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="text-sm text-gray-600">
            Total Cakes: {filteredCakes.length}
          </div>
        </div>
      </div>

      {/* Cakes Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCakes.map((cake, index) => (
                <motion.tr
                  key={cake.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={cake.image}
                      alt={cake.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{cake.name}</div>
                      <div className="text-sm text-gray-500">{cake.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {cake.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-pink-100 text-pink-800">
                      {cake.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEditCake(cake)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCake(cake.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Cake Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCake ? 'Edit Cake' : 'Add New Cake'}
      >
        <CakeForm
          cake={editingCake}
          onSave={handleSaveCake}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default CakesManagement;
