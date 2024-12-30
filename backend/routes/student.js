const express = require('express');
const router = express.Router();
const Student = require('../models/Student');


// Update a student's information
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, rollNumber, class: studentClass } = req.body;
  
    try {
      // Validate input
      if (!name || !rollNumber || !studentClass) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
  
      // Find and update the student
      const updatedStudent = await Student.findByIdAndUpdate(
        id,
        { name, rollNumber, class: studentClass },
        { new: true, runValidators: true }
      );
  
      // If student not found
      if (!updatedStudent) {
        return res.status(404).json({ message: 'Student not found.' });
      }
  
      res.json({ message: 'Student updated successfully.', student: updatedStudent });
    } catch (err) {
      console.error('Error updating student:', err.message);
      res.status(500).json({ message: 'Server error.' });
    }
  });
// Add New Student
router.post('/', async (req, res) => {
    const { name, rollNumber, class: studentClass } = req.body;
    try {
        const student = new Student({ name, rollNumber, class: studentClass });
        await student.save();
        res.json(student);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get All Students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete Student by ID
router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
