import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} Attendance Management System. All rights reserved.</p>
      <p>
        Designed and developed with ❤️ by <a href="mailto:rjonlineservice2024@gmail.com" >RJ Consultency services</a>.
      </p>
    </footer>
  );
};

export default Footer;