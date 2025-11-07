import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const AdminprotectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      setIsValid(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        // Token expired
        localStorage.removeItem("adminToken");

        Swal.fire({
          icon: "warning",
          title: "Session Expired",
          text: "Your session has expired. Please log in again.",
          confirmButtonColor: "#f6339a",
        }).then(() => {
          navigate("/adlogin", { replace: true });
        });

        setIsValid(false);
      }
    } catch (error) {
      // Invalid token or decode error
      localStorage.removeItem("adminToken");
      setIsValid(false);
      navigate("/adlogin", { replace: true });
    }
  }, [navigate]);

  if (!isValid) {
    return <Navigate to="/adlogin" replace />;
  }

  return children;
};

export default AdminprotectedRoute;
