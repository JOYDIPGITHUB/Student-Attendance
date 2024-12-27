import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <nav className="dashboard-nav">
        <Link to="/students" className="dashboard-link">Manage Students</Link>
        <Link to="/attendance" className="dashboard-link">Mark Attendance</Link>
        <Link to="/attendancefilter" className="dashboard-link">View Attendance by Month</Link>
      </nav>
    </div>
  );
};

export default Dashboard;