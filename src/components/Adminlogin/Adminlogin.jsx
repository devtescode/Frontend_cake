// Adminlogin.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
// import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Adminlogin = () => {
  const [adminExists, setAdminExists] = useState(null); // null = loading
  const [formData, setFormData] = useState({ fullname: "", email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get("http://localhost:4500/admin/check");
        setAdminExists(res.data.exists);
      } catch (err) {
        console.error("Error checking admin:", err);
      }
    };
    checkAdmin();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!adminExists) {
        // Create Admin
        await axios.post("http://localhost:4500/admin/create", formData);
        Swal.fire("Success", "Admin created successfully!", "success");
        setAdminExists(true); // switch to login mode
      } else {
        // Login Admin
        const res = await axios.post("http://localhost:4500/admin/login", formData);
        Swal.fire("Welcome Admin 🚀", "Login successful", "success");
        localStorage.setItem("adminToken", res.data.token);
        navigate("/admindashboard");
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Something went wrong", "error");
    }
  };

  if (adminExists === null) return <p>Loading...</p>;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {adminExists ? "Admin Login" : "Create Admin"}
        </h2>

        {!adminExists && (
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded"
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 mb-6 border rounded"
          required
        />

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
          {adminExists ? "Login" : "Create Admin"}
        </button>
      </form>
    </div>
  );
};

export default Adminlogin;
