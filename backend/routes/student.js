const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

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
