import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchStudents, addStudent,deleteStudent,updateStudent } from '../services/api';
import './Students.css';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [editing, setEditing] = useState(false); // Track editing state
  const [editId, setEditId] = useState(null); // Store the ID of the student being edited

  useEffect(() => {
    const getStudents = async () => {
      const response = await fetchStudents();
      setStudents(response.data);
    };
    getStudents();
  }, []);

  const handleAddStudent = async () => {
    try{
    const newStudent = { name, rollNumber, class: studentClass };
    await addStudent(newStudent);
    setStudents([...students, newStudent]);
    setName('');
    setRollNumber('');
    setStudentClass('');
    toast.success('Student Record Added successfully');
    }
    catch(err)
    {
      toast.error('Failed to add student!');
    }
  };

  // Delete student
  const handleDeleteStudent = async (id) => {
    try {
      await deleteStudent(id);
      setStudents(students.filter((student) => student._id !== id)); // Update state after deletion
      toast.success('Student Record deleted successfully');
    } catch (err) {
      toast.error('Failed to delete student!');
    }
  };

  // Start editing a student record
  const handleEditStudent = (student) => {
    setEditing(true);
    setEditId(student._id);
    setName(student.name);
    setRollNumber(student.rollNumber);
    setStudentClass(student.class);
  };

  // Save edited student record
  const handleSaveEdit = async () => {
    try {
      const updatedStudent = { name, rollNumber, class: studentClass };
      await updateStudent(editId, updatedStudent);
      setStudents(
        students.map((student) =>
          student._id === editId ? { ...student, ...updatedStudent } : student
        )
      );
      setEditing(false);
      setEditId(null);
      setName('');
      setRollNumber('');
      setStudentClass('');
      toast.success('Student Record updated successfully');
    } catch (err) {
      toast.error('Failed to update student!');
    }
  };

  return (
    <div>
      <h2>Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student.rollNumber}>{student.rollNumber} - {student.name} - {student.class}
          <button onClick={() => handleEditStudent(student)}>Edit</button>
          <button onClick={() => handleDeleteStudent(student._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>{editing ? 'Edit Student' : 'Add Student'}</h3>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Roll Number"
        value={rollNumber}
        onChange={(e) => setRollNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Class"
        value={studentClass}
        onChange={(e) => setStudentClass(e.target.value)}
      />
      {editing ? (
        <button onClick={handleSaveEdit}>Save</button>
      ) : (
        <button onClick={handleAddStudent}>Add Student</button>
      )}
    </div>
  );
};

export default Students;
