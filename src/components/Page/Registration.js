import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useAuth } from "../../AuthContext";
import '../Style/Login.css'
import { useNavigate, Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Registration = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nama, setNama] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const auth = useAuth();

    const onSubmit = async (data) => {
        try {
          await auth.register(data.name, data.email, data.password);
          navigate('/home'); // Navigate to home page after successful registration
        } catch (error) {
          console.error("Registration error:", error);
          // Handle registration error (show error message to user)
        }
      
    };
    const togglePasswordVisibility = () => { // Fungsi untuk mengubah visibilitas password
      setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
          
          <div className="login-form-container">
            <h1 style={{ textAlign: 'center'}}>Sign-Up</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h5>Name</h5>
                <input
                type="text"
                placeholder="John Doe"
                {...register('name', { required: true })}
                value={nama} onChange={(e) => setNama(e.target.value)}/>
                {errors.name && <span className="error-message">Name is required</span>}
              <h5>Email</h5>
              <input
                type="text" placeholder="example@gmail.com"
                {...register('email', { required: true })}
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <span className="error-message">Email is required</span>}
    
              <h5>Password</h5>
              <div className='password'>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register('password', { required: true })}
                  value={password} onChange={(p) => setPassword(p.target.value)}
                />
                {/* Tampilan ikon mata */}
                <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </span>
              </div>
              {errors.password && <span className="error-message">Password is required</span>}
    
              <button type="submit" className="login-signInButton">Sign Up</button>
            </form>
            <h5 className="login-newToVacaybot">Have Account?</h5>
            <Link to="/Login" className="login-registerButton">LogIn to your Account</Link>
          </div>
        </div>
      );
    };

export default Registration;
