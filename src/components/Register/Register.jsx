import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const schema = z.object({
    fullname: z
        .string()
        .min(10, "Full name must be at least 10 characters")
        .max(150, "Full name must not exceed 50 characters")
        .regex(/^[A-Za-z]+(?: [A-Za-z]+)+$/, "Please enter your full name"),
    email: z.string().email("Invalid email address"),
    phonenumber: z
        .string()
        .regex(
            /^\+?[1-9]\d{6,18}$/,
            "Enter a valid phone number with country code (e.g. +1234567890)"
        ),

    password: z.string().min(6, "Password must be at least 6 characters"),
});

const Register = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, touchedFields, isSubmitted },
    } = useForm({
        resolver: zodResolver(schema),
        mode: "onBlur", // validate only after leaving the field
        reValidateMode: "onChange", // update after the first check
    });

    // const onSubmit = (data) => {
    //     console.log("Login Data:", data);
    //     alert(" dfgb")
    // };

    const navigate = useNavigate()
    // const onSubmit = async (data) => {
    //     try {
    //         // Replace with your backend API endpoint
    //         const response = await axios.post("http://localhost:4500/usercake/register", data);

    //         if (response.status === 201 || response.status === 200) {
    //             alert("✅ Signup successful!");
    //             navigate('/login');
    //             console.log("Response:", response.data);
    //         }
    //     } catch (error) {
    //         console.error("Signup failed:", error);
    //         alert("❌ Signup failed. Please try again.");
    //     }
    // };
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage("");
            }, 10000);

            return () => clearTimeout(timer); // cleanup
        }
    }, [errorMessage]);
    const onSubmit = async (data) => {
        try {
            setErrorMessage(""); // clear previous errors
            const res = await axios.post("http://localhost:4500/usercake/register", data);
            // console.log("✅ Signup success:", res.data);
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
                title: "Signup successful"
            });
            navigate('/login');
        } catch (err) {
            console.error("❌ Signup error:", err.response?.data);

            // Show backend error to user
            if (err.response && err.response.data.message) {
                setErrorMessage(err.response.data.message);
            } else {
                setErrorMessage("Something went wrong. Please try again.");
            }
        }
    };

    // watch fields
    const emailValue = watch("email");
    const passwordValue = watch("password");
    const fullnameValue = watch("fullname");
    const phonenumberValue = watch("phonenumber");
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-pink-50 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-600 mb-2">
                    Register
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Join us and enjoy the sweetest experience 🎂
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {errorMessage && (
                        <div className="flex items-center gap-2 mt-3 p-3 rounded-lg bg-red-50 border border-red-200">
                            <span className="text-red-600 text-lg">⚠️</span>
                            <p className="text-sm text-red-600 font-medium">{errorMessage}</p>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Enter your Fullname"
                                {...register("fullname")}
                                className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none
                                     ${errors.fullname
                                        ? "border-red-500 focus:ring-red-200"
                                        : (touchedFields.fullname || isSubmitted) && fullnameValue
                                            ? "border-green-500 focus:ring-green-200"
                                            : "border-gray-300 focus:ring-gray-100"
                                    }`}
                            />
                            {/* Icon */}
                            {errors.fullname ? (
                                <AlertCircle className="absolute right-3 top-3 text-red-500 w-5 h-5" />
                            ) : (touchedFields.fullname || isSubmitted) && fullnameValue ? (
                                <CheckCircle className="absolute right-3 top-3 text-green-500 w-5 h-5" />
                            ) : null}
                        </div>
                        {errors.fullname && (
                            <p className="mt-1 text-sm text-red-500">{errors.fullname.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Enter your Email"
                                {...register("email")}
                                className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none
                                     ${errors.email
                                        ? "border-red-500 focus:ring-red-200"
                                        : (touchedFields.email || isSubmitted) && emailValue
                                            ? "border-green-500 focus:ring-green-200"
                                            : "border-gray-300 focus:ring-gray-100"
                                    }`}
                            />
                            {/* Icon */}
                            {errors.email ? (
                                <AlertCircle className="absolute right-3 top-3 text-red-500 w-5 h-5" />
                            ) : (touchedFields.email || isSubmitted) && emailValue ? (
                                <CheckCircle className="absolute right-3 top-3 text-green-500 w-5 h-5" />
                            ) : null}
                        </div>
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <div className="relative">
                            <input
                                type="phonenumber"
                                placeholder="Enter your Phone Number"
                                {...register("phonenumber")}
                                className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none
                                         ${errors.phonenumber
                                        ? "border-red-500 focus:ring-red-200"
                                        : (touchedFields.phonenumber || isSubmitted) && phonenumberValue
                                            ? "border-green-500 focus:ring-green-200"
                                            : "border-gray-300 focus:ring-gray-100"
                                    }`}
                            />
                            {/* Icon */}
                            {errors.phonenumber ? (
                                <AlertCircle className="absolute right-3 top-3 text-red-500 w-5 h-5" />
                            ) : (touchedFields.phonenumber || isSubmitted) && phonenumberValue ? (
                                <CheckCircle className="absolute right-3 top-3 text-green-500 w-5 h-5" />
                            ) : null}
                        </div>
                        {errors.phonenumber && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.phonenumber.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                placeholder="Enter your Password"
                                {...register("password")}
                                className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none
                                         ${errors.password
                                        ? "border-red-500 focus:ring-red-200"
                                        : (touchedFields.password || isSubmitted) && passwordValue
                                            ? "border-green-500 focus:ring-green-200"
                                            : "border-gray-300 focus:ring-gray-100"
                                    }`}
                            />
                            {/* Icon */}
                            {errors.password ? (
                                <AlertCircle className="absolute right-3 top-3 text-red-500 w-5 h-5" />
                            ) : (touchedFields.password || isSubmitted) && passwordValue ? (
                                <CheckCircle className="absolute right-3 top-3 text-green-500 w-5 h-5" />
                            ) : null}
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 focus:outline-none"
                        />
                    </div> */}

                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-50 bg-gray-600 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition duration-300"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-gray-600 font-medium hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div >
        </div >
    );
};

export default Register;
