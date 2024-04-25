import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/edit.css'
import maldives from '../../assets/pexels.jpg';

const ChangePasswordComponent = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Password baru dan konfirmasi password tidak sama.');
      return;
    }

    
    const data = {
      password: newPassword,
    };

    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      const response = await fetch(`http://localhost:8080/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Mengirim token JWT di header
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send data to API");
      }

      const responseData = await response.json();
      console.log("Response from API:", responseData);
      setSuccess('Password berhasil diubah.');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      navigate('/users');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="change-password-container">
      <div className='foto'>
      <img src={maldives} alt="gambar" className="gambar" />
      </div>
      <div className='change-password-container-1'>
        <h1>Ubah Password</h1>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="newPassword">Password Baru </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Konfirmasi Password </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit">Simpan</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordComponent;
