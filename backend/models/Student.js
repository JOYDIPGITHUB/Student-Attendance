const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollNumber: { type: String, required: true, unique: true },
    class: { type: String, required: true },
    attendance: [{
        date: { type: Date, required: true },
        status: { type: String, enum: ['Present', 'Absent'], required: true }
    }],
});

module.exports = mongoose.model('Student', StudentSchema);

