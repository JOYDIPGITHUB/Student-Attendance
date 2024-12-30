import React, { useState, useEffect } from 'react';
import { filterAttendance, fetchStudentNames } from '../services/api';
import jsPDF from 'jspdf'; // Import jsPDF
import 'jspdf-autotable'; // Import autoTable plugin
import './AttendanceFilter.css';

const AttendanceFilter = () => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');

  useEffect(() => {
    // Fetch student names for the dropdown
    const getStudentNames = async () => {
      const response = await fetchStudentNames();
      setStudents(response.data);
    };
    getStudentNames();
  }, []);

  const handleViewAttendance = async (e) => {
    e.preventDefault();

    try {
      const params = {
        year: year || undefined,
        month: month || undefined,
        name: selectedStudent || undefined,
      };

      const response = await filterAttendance(params);
      setAttendanceRecords(Array.isArray(response.data) ? response.data : [response.data]);
    } catch (err) {
      console.error('Error fetching attendance:', err.message);
      alert('Failed to fetch attendance. Please try again.');
    }
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    const tableColumn = ['Name', 'Roll Number', 'Class', 'Date', 'Time', 'Status'];
    const tableRows = [];

    attendanceRecords.forEach((record) => {
      record.attendance.forEach((att) => {
        const date = new Date(att.date);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();

        tableRows.push([
          record.name,
          record.rollNumber,
          record.class,
          formattedDate,
          formattedTime,
          att.status,
        ]);
      });
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save(`Attendance_${year}_${month}.pdf`);
  };

  return (
    <div className="attendance-filter">
      <h2>View Attendance</h2>
      <form onSubmit={handleViewAttendance}>
        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
        >
          <option value="">All Students</option>
          {students.map((student) => (
            <option key={student._id} value={student.name}>
              {student.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Year (e.g., 2024)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          <option value="">Select Month</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
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
                      Date: {new Date(att.date).toLocaleDateString()} - Time: {new Date(att.date).toLocaleTimeString()} - Status: {att.status}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <button onClick={handleGeneratePDF}>Generate PDF</button>
        </div>
      )}
    </div>
  );
};

export default AttendanceFilter;
