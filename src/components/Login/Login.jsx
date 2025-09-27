import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
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
  //   console.log("Login Data:", data);
  //   alert(" dfgb")
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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    try {
      setErrorMessage(""); // clear previous errors
      setLoading(true);
      const res = await axios.post("http://localhost:4500/usercake/login", data);

      // ✅ check the response message
      if (res.data && res.data.message === "Login successful") {
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

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("UserData", JSON.stringify(res.data.user));
        navigate("/userdashboard");
      } else {
        setErrorMessage(res.data?.message || "Unexpected response from server");
      }
    } catch (err) {
      console.error("❌ Login error:", err.response?.data);
      if (err.response && err.response.data.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
    finally {
      setLoading(false);
    }
  };

  // watch fields
  const emailValue = watch("email");
  const passwordValue = watch("password");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-white to-pink-50 px-2">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-pink-600 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {errorMessage && (
            <div className="flex items-center gap-2 mt-3 p-3 rounded-lg bg-red-50 border border-red-200">
              <span className="text-red-600 text-lg">⚠️</span>
              <p className="text-sm text-red-600 font-medium">{errorMessage}</p>
            </div>
          )}

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

          {/* Password */}
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

          {/* Submit */}
          <div className="flex justify-center">
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
                  <span>Logging in...</span>
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>

        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-gray-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
