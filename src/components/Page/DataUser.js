import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import maldives from '../../assets/pexels.jpg';
import '../Style/data.css';
const AccountComponent = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("id");
        const response = await fetch(`http://localhost:8080/users/${id}`, {
          method: "GET", // Metode yang digunakan untuk mendapatkan data
          headers: {
            "Content-Type": "application/json",
            // Mengirim token JWT di header
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        console.log(userData)
        setUser(userData); // Setel data pengguna ke dalam state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData(); // Panggil fungsi fetchData di useEffect
  }, []); // Tambahkan array kosong sebagai dependencies agar useEffect hanya dijalankan sekali saat komponen dimuat

  const handleEditProfile = () => {
    // ... (navigate to edit profile page)
  };

  const handleChangePassword = () => {
    navigate('/users/edit');
  };

  return (
    <div className="akun">
      <div className='sidebar'>
        <img src={maldives} alt="gambar" className="gambar" />
      </div>
      <div className='akun_data'>
        <h1>Akun Saya</h1>
        <p>Nama : {user.user && user.user[0].nama}</p>
        <p>Email : {user.user && user.user[0].email}</p>
        <p>Password : ********</p>
        <button onClick={handleEditProfile}>Edit Profile</button>
        <button onClick={handleChangePassword}>Ubah Password</button>
      </div>
    </div>
  );
  
};

export default AccountComponent;
