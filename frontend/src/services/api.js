import axios from 'axios';

const API = axios.create({
  baseURL: 'https://attendance-wthe.onrender.com/api',// Proxy base URL in development
});
export const register = (userData) => API.post('/users/register', userData);
export const login = (credentials) => API.post('/auth/login', credentials);
export const fetchStudents = () => API.get('/students');
export const addStudent = (studentData) => API.post('/students', studentData);
export const markAttendance = (id,attendanceData) => API.post(`/attendance/${id}`, attendanceData);
export const deleteStudent = (id) => API.delete(`/students/${id}`);
export const updateStudent = (id, updatedStudent) =>API.put(`/students/${id}`, updatedStudent);
export const filterAttendance = (params) => API.get('/attendance/filter', { params });
export const fetchStudentNames = () => API.get('/attendance/names');
