import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Import for styling

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to the Attendance Management System</h1>
        <p>Manage students and track attendance seamlessly.</p>
        <div className="button-group">
          <button className="home-button login-button" onClick={() => navigate('/login')}>
            Login
          </button>
          <button className="home-button register-button" onClick={() => navigate('/register')}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;