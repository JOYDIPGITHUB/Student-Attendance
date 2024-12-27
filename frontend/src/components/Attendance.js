import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchStudents, markAttendance } from '../services/api';
import './Attendance.css';

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  // Fetch students on component mount
  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await fetchStudents();
        setStudents(response.data);

        // Initialize attendance state for each student
        const initialAttendance = {};
        response.data.forEach((student) => {
          initialAttendance[student._id] = 'Present';
        });
        setAttendance(initialAttendance);
       

      } catch (err) {
        console.error('Error fetching students!');
        
      }
    };

    getStudents();
  }, []);

  const handleSubmit = async () => {
    try {
      const attendancePromises = students.map((student) => 
        markAttendance(student._id, {
          date: new Date().toISOString(),
          status: attendance[student._id],
        })
      );
      
      await Promise.all(attendancePromises);
      toast.success('Attendance marked successfully!');
    } catch (err) {
      console.error('Error marking attendance:', err.response?.data || err.message);
      toast.error('Failed to mark attendance. Please try again.');
    }
  };

  const handleAttendanceChange = (id, status) => {
    setAttendance((prev) => ({ ...prev, [id]: status }));
   
  };

  return (
    <div>
      <h2>Mark Attendance</h2>
      {students.length > 0 ? (
        <form onSubmit={(e) => e.preventDefault()}>
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll Number</th>
                <th>Class</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.rollNumber}</td>
                  <td>{student.class}</td>
                  <td>
                    <select
                      value={attendance[student._id] || 'Present'}
                      onChange={(e) =>
                        handleAttendanceChange(student._id, e.target.value)
                      }
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" onClick={handleSubmit}>
            Submit Attendance
          </button>
        </form>
      ) : (
        <p>Loading students...</p>
      )}
    </div>
  );
};

export default Attendance;