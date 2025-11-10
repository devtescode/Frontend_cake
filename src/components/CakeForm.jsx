import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URLS } from "../utils/apiConfig";
// import Swal from "sweetalert2";

const CakeForm = ({ cake, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Chocolate",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Pre-fill form when editing
  useEffect(() => {
    if (cake) {
      setFormData({
        name: cake.name || "",
        price: cake.price || "",
        category: cake.category || "Chocolate",
        description: cake.description || "",
      });
    }
  }, [cake]);

  // ✅ Handle text input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Handle image file
  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  // ✅ Handle submit for both Add and Edit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("description", formData.description);
    if (image) data.append("image", image); // only append image if uploaded

    try {
      setLoading(true);
      if (cake) {
        await axios.put(API_URLS.adminupdate(cake._id), data, {
          headers: { "Content-Type": "multipart/form-data" },
        });


        Swal.fire({
          icon: "success",
          title: "Cake updated successfully!",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        // ✅ CREATE (Add new cake)
        await axios.post(API_URLS.admincreateplan, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        Swal.fire({
          icon: "success",
          title: "Cake added successfully!",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
      }

      if (onSave) onSave();
      onCancel();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Operation failed",
        text: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cake Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        />
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price (₦)
        </label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        >
          <option value="Chocolate">Chocolate</option>
          <option value="Vanilla">Vanilla</option>
          <option value="Special">Special</option>
          <option value="Birthday">Birthday</option>
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        />
      </div>

      {/* Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image Upload
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center relative cursor-pointer">
          <input
            type="file"
            accept="image/*"
            name="image"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleImageUpload}
          />
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Selected preview"
              className="mx-auto h-24 w-24 object-cover rounded"
            />
          ) : cake?.image ? (
            <img
              src={cake.image}
              alt="Current"
              className="mx-auto h-24 w-24 object-cover rounded"
            />
          ) : (
            <>
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-600">
                Click to upload or drag and drop
              </p>
            </>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className={`w-40 flex items-center justify-center gap-2 bg-pink-600 text-white py-2 rounded-lg font-semibold transition duration-300 ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-pink-700"
            }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              <span>{cake ? "Updating..." : "Adding..."}</span>
            </>
          ) : (
            cake ? "Update Cake" : "Add Cake"
          )}
        </button>
      </div>
    </form>
  );
};

export default CakeForm;
