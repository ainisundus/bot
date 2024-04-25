import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import HistoryIcon from '@mui/icons-material/History';
import newt from '../../assets/1.jpg';
import '../Style/Header.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const Profile = ({ onCloseMenu }) => {
  const [user, setUser] = useState({});
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("id");
        const response = await fetch(`http://localhost:8080/users/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        console.log(userData);
        setUser(userData.user[0]); // Mengambil objek pengguna pertama dari array user
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };
  
  return (
    <div className='vacaybot__navbar_profile'>
      <div className='sub-menu-wrap'>
        <div className='sub-menu'>
          <div className='user-info'>
            <img src={newt} alt='' className='topbarImg' />
            <p>{user.nama}</p> {/* Mengakses properti 'nama' dari objek pengguna */}
          </div>
          <hr />
          <div className='sub-menu-link-edit' onClick={onCloseMenu}>
            <svg data-testid="LogoutIcon">
              <EditIcon />
            </svg>
            <p><a href="users">Kelola Akun Anda</a></p>
          </div>
          <div className='sub-menu-link-edit' onClick={onCloseMenu}>
            <svg data-testid="LogoutIcon">
              <LogoutRoundedIcon />
            </svg>
            <p onClick={handleLogout}>Logout</p>
          </div>
          <div className='sub-menu-link-edit' onClick={onCloseMenu}>
            <svg data-testid="LogoutIcon">
              <HistoryIcon />
            </svg>
            <p><a href="history">History</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
