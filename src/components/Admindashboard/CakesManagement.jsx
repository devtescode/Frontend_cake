// pages/CakesManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { motion } from 'framer-motion';
import Modal from '../Modal';
import CakeForm from '../CakeForm';
import { FaSpinner } from "react-icons/fa"; // nice spinning icon

const CakesManagement = () => {
  const [cakes, setCakes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCake, setEditingCake] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true); // ✅ new loading state

  const categories = ['All', 'Chocolate', 'Vanilla', 'Special', 'Birthday'];

  useEffect(() => {
    fetchCakes();
  }, []);

  const fetchCakes = async () => {
    try {
      setLoading(true); // start loader
      const res = await axios.get("http://localhost:4500/admin/admingetplan");
      setCakes(res.data.plans); 
      setLoading(false); // stop loader
    } catch (error) {
      console.log("Failed to fetch cakes:", error);
      setLoading(false); // stop loader even on error
    }
  };

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

  const handleDeleteCake = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This cake will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:4500/admin/admindelete/${id}`);
          fetchCakes();
          Swal.fire("Deleted!", "Cake has been deleted.", "success");
        } catch (error) {
          console.log(error);
          Swal.fire("Error!", "Something went wrong while deleting.", "error");
        }
      }
    });
  };

  const handleSaveCake = () => {
    fetchCakes();
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
      <div className="rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <FaSpinner className="animate-spin text-4xl text-pink-500" />
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCakes?.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 text-center text-red-500 font-semibold"
                    >
                      No cakes uploaded yet!
                    </td>
                  </tr>
                ) : (
                  filteredCakes.map((cake, index) => (
                    <motion.tr
                      key={cake._id}
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
                          onClick={() => handleDeleteCake(cake._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          )}
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
