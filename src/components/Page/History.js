import React, { useState, useEffect } from "react";
import '../Style/history.css'; // Import file CSS untuk styling
import HistoryIcon from '@mui/icons-material/History';

const History = () => {
  // State untuk menyimpan data history pencarian
  const [historyData, setHistoryData] = useState([]);

  // Fungsi untuk mengambil data history dari backend API
  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      const response = await fetch(`http://localhost:8080/history/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Mengirim token JWT di header
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data from API");
      }

      const responseData = await response.json();
      console.log("Response from API:", responseData);

      // Mengambil data user dari response
      const userHistory = responseData.user || [];

      // Menyimpan data user ke dalam state historyData
      setHistoryData(userHistory);
    } catch (error) {
      console.error("Error fetching history data:", error);
    }
  };

  // Memanggil fungsi fetchHistory saat komponen dimuat pertama kali
  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className='history'>
      <div className="history-data">
        <h2>History Pencarian</h2>
        {/* Menampilkan setiap elemen history dalam format yang diinginkan */}
        {historyData.map((item, index) => (
          <div key={index} className="history-item">
            <div className="history-logo">
                <svg data-testid="LogoutIcon">
                    <HistoryIcon />
                </svg>
                <h3>History {index + 1}:</h3>
            </div>
            <p><strong>Question:</strong> {item.question}</p>
            <p><strong>Answer:</strong> {item.answer}</p>
          </div>
        ))}
      </div>
    </div> 
  );
};

export default History;
