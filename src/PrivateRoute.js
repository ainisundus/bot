import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { token, loading } = useAuth(); // Access both isAuthenticated and user
  if (loading) {
    return null;
  }
  if (!token) { // Check for authentication and user presence
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
