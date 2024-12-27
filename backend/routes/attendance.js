const express = require('express');
const router = express.Router();
const Student = require('../models/Student'); // Import Student model


// Get attendance records for a specific year and month
router.get('/', async (req, res) => {
  const { year, month } = req.query;

  // Validate query parameters
  if (!year || !month) {
    return res.status(400).json({ message: 'Year and month are required.' });
  }

  try {
    // Fetch all students
    const students = await Student.find();

    // Filter attendance for each student
    const filteredAttendance = students.map((student) => {
      // Check if student has an attendance array
      if (!student.attendance || !Array.isArray(student.attendance)) {
        return {
          studentId: student._id,
          name: student.name,
          rollNumber: student.rollNumber,
          class: student.class,
          attendance: [], // Return an empty array if attendance is not available
        };
      }

      // Filter attendance records based on year and month
      const attendance = student.attendance.filter((record) => {
        const recordDate = new Date(record.date);
        return (
          recordDate.getFullYear() === parseInt(year, 10) &&
          recordDate.getMonth() + 1 === parseInt(month, 10)
        );
      });

      // Return the filtered data
      return {
        studentId: student._id,
        name: student.name,
        rollNumber: student.rollNumber,
        class: student.class,
        attendance,
      };
    });

    res.json(filteredAttendance);
  } catch (err) {
    console.error('Error fetching attendance:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark Attendance for a Student
router.post('/:id', async (req, res) => {
    const { id } = req.params;
    const { date, status } = req.body;

    

    if (!date || !status) {
        return res.status(400).json({ message: 'Date and status are required' });
    }

    try {
        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Add attendance record
        student.attendance.push({ date: new Date(date), status });
        await student.save();

        res.status(200).json({ message: 'Attendance marked successfully', student });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get Attendance for a Student
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ attendance: student.attendance });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router;

