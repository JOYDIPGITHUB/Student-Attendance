import React from 'react';
import {ToastContainer,toast} from 'react-toastify';

import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Students from './components/Students';
import Attendance from './components/Attendance';
import Register from './components/Register';
import AttendanceFilter from './components/AttendanceFilter';
import HomePage from './components/HomePage';
import './App.css';
import Footer from './components/Footer';



const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    toast.success('You have been logged out.');
    navigate('/'); // Redirect to login page
  };

  return (
    <header className="app-header">
      <div className="header-links">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

const App = () => {
  return (
    <Router>
      
      <div className="app-container">
      
        <Header />
      <main className='app-main'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/attendancefilter" element={<AttendanceFilter />} />
      </Routes>
      </main>
      <Footer/>
      <ToastContainer
      position="top-right" // Align to top-center
      autoClose={4000} // Match the duration
      hideProgressBar={false} // Show the progress bar
      newestOnTop={false} // Maintain reverse order as false
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      style={{ marginTop: '4rem' }} // Add margin at the top
      toastStyle={{
        background: '#bbe1e8', // Custom background color
        color: 'black', // Text color
        padding: '25px', // Add padding for better readability
        paddingBottom: '30px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional: Add shadow for better design
    borderRadius: '8px', // Rounded corners
      }}
      theme="light"
     
      />
      </div>
    </Router>
  );
};

export default App;