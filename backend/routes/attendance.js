const express = require('express');
const router = express.Router();
const Student = require('../models/Student'); // Import Student model


// Get attendance records with optional filtering by student name, year, and month
router.get('/filter', async (req, res) => {
  const { name, year, month } = req.query;

  try {
    if (name) {
      // Fetch attendance for a specific student
      const student = await Student.findOne({ name });
      if (!student) {
        return res.status(404).json({ message: 'Student not found.' });
      }

      const filteredAttendance = student.attendance.filter((record) => {
        const recordDate = new Date(record.date);
        return (
          (!year || recordDate.getFullYear() === parseInt(year, 10)) &&
          (!month || recordDate.getMonth() + 1 === parseInt(month, 10))
        );
      });

      return res.json({
        studentId: student._id,
        name: student.name,
        rollNumber: student.rollNumber,
        class: student.class,
        attendance: filteredAttendance,
      });
    } else {
      // Fetch attendance for all students
      const students = await Student.find();

      const filteredAttendance = students.map((student) => {
        const attendance = student.attendance.filter((record) => {
          const recordDate = new Date(record.date);
          return (
            (!year || recordDate.getFullYear() === parseInt(year, 10)) &&
            (!month || recordDate.getMonth() + 1 === parseInt(month, 10))
          );
        });

        return {
          studentId: student._id,
          name: student.name,
          rollNumber: student.rollNumber,
          class: student.class,
          attendance,
        };
      });

      return res.json(filteredAttendance);
    }
  } catch (err) {
    console.error('Error fetching attendance:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to fetch student names only
router.get('/names', async (req, res) => {
  try {
    const students = await Student.find({}, 'name'); // Fetch only the name field
    res.json(students);
  } catch (err) {
    console.error('Error fetching student names:', err.message);
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

