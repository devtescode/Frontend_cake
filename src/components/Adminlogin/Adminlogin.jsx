// Adminlogin.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// import { AlertCircle, CheckCircle, User, Lock, Mail } from "lucide-react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { AlertCircle, CheckCircle } from "lucide-react";

// Validation Schema
// const createAdminSchema = z.object({
//     fullname: z.string().min(10, "Full name must be at least 3 characters"),
//     email: z.string().email("Enter a valid email"),
//     password: z.string().min(6, "Password must be at least 6 characters"),
// });


const createAdminSchema = z
    .object({
        fullname: z.string().min(10, "Full name must be at least 10 characters"),
        email: z.string().email("Enter a valid email"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().optional(),
    })
    .refine(
        (data) => {
            // if confirmPassword is provided (create mode), it must match password
            if (data.confirmPassword !== undefined && data.confirmPassword !== "") {
                return data.password === data.confirmPassword;
            }
            return true;
        },
        {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        }
    );

const loginSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const Adminlogin = () => {
    const [adminExists, setAdminExists] = useState(null);
    const navigate = useNavigate();

    // Dynamic schema depending on state
    const schema = adminExists ? loginSchema : createAdminSchema;

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, touchedFields, isSubmitted },
    } = useForm({
        resolver: zodResolver(schema),
    });

    // Watch fields for green check feedback
    const fullnameValue = watch("fullname");
    const emailValue = watch("email");
    const passwordValue = watch("password");
    const confirmPasswordValue = watch("confirmPassword");

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

    const onSubmit = async (data) => {
        try {
            if (!adminExists) {
                const { confirmPassword, ...payload } = data;
                const res = await axios.post("http://localhost:4500/admin/create", payload);
                // Swal.fire("Success", "Admin created successfully!", "success");
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });

                Toast.fire({
                    icon: "success",
                    title: res.data.message
                });
                setAdminExists(true);
                reset();
            } else {
                const res = await axios.post("http://localhost:4500/admin/login", data);
                // Swal.fire("Welcome Admin 🚀", "Login successful", "success");
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });

                Toast.fire({
                    icon: "success",
                    title: res.data.message
                });
                localStorage.setItem("adminToken", res.data.token);
                navigate("/admindashboard");
                // console.log( "response", res);
            }
        } catch (err) {
            // Swal.fire("Error", err.response?.data?.message || "Something went wrong", "error");
            const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });

                Toast.fire({
                    icon: "warning",
                    title: err.response?.data?.message
                });
        }
    };

    if (adminExists === null) return <p>Loading...</p>;

    return (
        <div className="px-2 flex justify-center items-center h-screen bg-gradient-to-r from-pink-200 to-blue-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 py-10 shadow-xl w-full max-w-md border border-gray-100"
            >
                <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-500">
                    {adminExists ? "🔐 Admin Login" : "Create Admin"}
                </h2>

                {/* Full Name */}
                {!adminExists && (
                    <div className="mb-4 relative">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Full Name
                        </label>
                        <div
                            className={`flex items-center border rounded-lg px-3
        ${errors.fullname
                                    ? "border-red-500 focus-within:ring-2 focus-within:ring-red-200"
                                    : (touchedFields.fullname || isSubmitted) && fullnameValue
                                        ? "border-green-500 focus-within:ring-2 focus-within:ring-green-200"
                                        : "border-gray-300 focus-within:ring-2 focus-within:ring-gray-100"
                                }`}
                        >
                            {/* Left Icon */}
                            <FaUser className="text-gray-400 mr-2" />

                            {/* Input */}
                            <input
                                type="text"
                                placeholder="Enter full name"
                                {...register("fullname")}
                                className="w-full px-2 py-2 focus:outline-none"
                            />

                            {/* Right Validation Icon */}
                            {errors.fullname ? (
                                <AlertCircle className="text-red-500 w-5 h-5" />
                            ) : (touchedFields.fullname || isSubmitted) && fullnameValue ? (
                                <CheckCircle className="text-green-500 w-5 h-5" />
                            ) : null}
                        </div>

                        {/* Error Message */}
                        {errors.fullname && (
                            <p className="text-red-500 text-sm mt-1">{errors.fullname.message}</p>
                        )}
                    </div>
                )}


                {/* Email Input */}
                <div className="mb-4 relative">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                    <div
                        className={`flex items-center border rounded-lg px-3
                                ${errors.email
                                ? "border-red-500 focus-within:ring-2 focus-within:ring-red-200"
                                : (touchedFields.email || isSubmitted) && emailValue
                                    ? "border-green-500 focus-within:ring-2 focus-within:ring-green-200"
                                    : "border-gray-300 focus-within:ring-2 focus-within:ring-gray-100"
                            }`}
                    >
                        <FaEnvelope className="text-gray-400 mr-2" />
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            {...register("email")}
                            className="w-full px-2 py-2 focus:outline-none"
                        />
                        {errors.email ? (
                            <AlertCircle className="text-red-500 w-5 h-5" />
                        ) : (touchedFields.email || isSubmitted) && emailValue ? (
                            <CheckCircle className="text-green-500 w-5 h-5" />
                        ) : null}
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                {/* Password Input */}
                {/* Password Input */}
                <div className="mb-6 relative">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                    <div
                        className={`flex items-center border rounded-lg px-3
      ${errors.password
                                ? "border-red-500 focus-within:ring-2 focus-within:ring-red-200"
                                : (touchedFields.password || isSubmitted) && passwordValue
                                    ? "border-green-500 focus-within:ring-2 focus-within:ring-green-200"
                                    : "border-gray-300 focus-within:ring-2 focus-within:ring-gray-100"
                            }`}
                    >
                        <FaLock className="text-gray-400 mr-2" />
                        <input
                            type="password"
                            placeholder="Enter your Password"
                            {...register("password")}
                            className="w-full px-2 py-2 focus:outline-none"
                        />
                        {errors.password ? (
                            <AlertCircle className="text-red-500 w-5 h-5" />
                        ) : (touchedFields.password || isSubmitted) && passwordValue ? (
                            <CheckCircle className="text-green-500 w-5 h-5" />
                        ) : null}
                    </div>
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>

                {/* Confirm Password (only show when creating admin) */}
                {!adminExists && (
                    <div className="mb-6 relative">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Confirm Password
                        </label>
                        <div
                            className={`flex items-center border rounded-lg px-3
        ${errors.confirmPassword
                                    ? "border-red-500 focus-within:ring-2 focus-within:ring-red-200"
                                    : (touchedFields.confirmPassword || isSubmitted) && confirmPasswordValue
                                        ? "border-green-500 focus-within:ring-2 focus-within:ring-green-200"
                                        : "border-gray-300 focus-within:ring-2 focus-within:ring-gray-100"
                                }`}
                        >
                            <FaLock className="text-gray-400 mr-2" />
                            <input
                                type="password"
                                placeholder="Confirm your Password"
                                {...register("confirmPassword")}
                                className="w-full px-2 py-2 focus:outline-none"
                            />
                            {errors.confirmPassword ? (
                                <AlertCircle className="text-red-500 w-5 h-5" />
                            ) : (touchedFields.confirmPassword || isSubmitted) && confirmPasswordValue ? (
                                <CheckCircle className="text-green-500 w-5 h-5" />
                            ) : null}
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>
                )}



                <div className="text-center">
                    <button
                        type="submit"
                        className=" bg-blue-600 text-white px-4 py-1 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
                    >
                        {adminExists ? "Login" : "Create Admin"}
                    </button>
                </div>

                <p className="mt-6 text-center text-sm text-gray-500">
                    {adminExists ? "Welcome back, Admin 👋" : "Setup your admin account to get started 🚀"}
                </p>
            </form>
        </div>
    );
};

export default Adminlogin;
