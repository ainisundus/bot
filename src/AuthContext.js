import React, { useContext, createContext, useState,  useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    setLoading(false); 
  }, []);


  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data)
      if (data.status === 'success') {
        localStorage.setItem("token", data.tokenLogin);
        localStorage.setItem("id", data.idUser);
        console.log("Token successfully stored:", data.tokenLogin)
        // Menggunakan tokenLogin sebagai token untuk autentikasi
        setToken({ isAuthenticated: true, token: data.tokenLogin });
        console.log("Auth state updated.");
      } else {
        // Handle login error
        console.error("Login failed:", data.error);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const register = async (nama, email, password) => {
    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, email, password }),
      });
      const data = await response.json();
      console.log(data)
      if (data.status === 'success') {
        login(email, password);
      } else {
        // Handle registration error
        console.error("Registration failed:", data.error);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken({ token: "" });
  };
  return (
    <AuthContext.Provider value={{ token, setToken, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
