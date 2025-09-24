// Adminlogin.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
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
        <div className="px-2 py-13 flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-blue-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-3  py-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100"
            >
                <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
                    {adminExists ? "🔐 Admin Login" : "👑 Create Admin"}
                </h2>

                {!adminExists && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="fullname"
                            placeholder="Enter full name"
                            value={formData.fullname}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            required
                        />
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        required
                    />
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="w-50  bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
                    >
                        {adminExists ? "Login" : "Create Admin"}
                    </button>
                </div>

                <p className="mt-6 text-center text-sm text-gray-500">
                    {adminExists
                        ? "Welcome back, Admin 👋"
                        : "Setup your admin account to get started 🚀"}
                </p>
            </form>
        </div>

    );
};

export default Adminlogin;
