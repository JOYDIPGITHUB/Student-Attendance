import React, { useState } from 'react';
import { filterAttendance } from '../services/api'; // Import the API service
import './AttendanceFilter.css'; // Optional for styling

const AttendanceFilter = () => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await filterAttendance({ year, month });
      setAttendanceRecords(response.data);
    } catch (err) {
      console.error('Error fetching attendance:', err.message);
      alert('Failed to fetch attendance. Please try again.');
    }
  };

  return (
    <div className="attendance-filter">
      <h2>View Attendance</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Year (e.g., 2024)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
       <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
        >
          <option value="">Select Month</option>
          {months.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
        <button type="submit">View Attendance</button>
      </form>

      {attendanceRecords.length > 0 && (
        <div className="attendance-list">
          <h3>Attendance Records</h3>
          <ul>
            {attendanceRecords.map((record) => (
              <li key={record.studentId}>
                <h4>{record.name} ({record.rollNumber}) - Class {record.class}</h4>
                <ul>
                  {record.attendance.map((att, index) => (
                    <li key={index}>
                      Date: {new Date(att.date).toLocaleDateString()} - Status: {att.status}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AttendanceFilter;