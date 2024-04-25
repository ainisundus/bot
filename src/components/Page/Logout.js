import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext'; // Assuming AuthContext is in a separate file

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
