import React, { useState } from "react";
import { useAuth } from "../../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import '../Style/login_.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // State untuk mengontrol visibilitas password

  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    if (input.email !== "" && input.password !== "") {
      try {
        const signin = await auth.login(input.email, input.password);
        console.log(signin)
        navigate('/home'); 
      } catch (error) {
        console.error("Login failed:", error);
        // Handle login error (optional: display error message)
      }
    } else {
      alert("Please provide a valid input");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => { // Fungsi untuk mengubah visibilitas password
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmitEvent}>
      <div className="login-form">
        <div className="login-form-container">
          <h1 style={{ textAlign: 'center'}}>Sign-In</h1>
          <div className="form_control">
            <h5>Email</h5>
            <div className="email">
              <input
               type="email"
                id="user-email"
                name="email"
                placeholder="example@yahoo.com"
                aria-describedby="user-email"
                aria-invalid="false"
                onChange={handleInput}
              />
            </div>
          </div>
          <div className="form_control">
            <h5>Password</h5>
            <div className="password">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                aria-describedby="user-password"
                aria-invalid="false"
                onChange={handleInput}
              />
              <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </span>
            </div>
            <div id="user-password" className="sr-only">
            </div>
          </div>
          <button className="btn-submit">Sign In</button>
          <h5 className="login-newToVacaybot">New to VacayBot?</h5>
          <Link to="/Registration" className="login-registerButton">
            Create your VacayBot Account
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Login;
