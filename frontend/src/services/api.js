import axios from 'axios';

const API = axios.create({
  baseURL: `${process.env.BACKEND_URI}/api`,// Proxy base URL in development
});
export const register = (userData) => API.post('/users/register', userData);
export const login = (credentials) => API.post('/auth/login', credentials);
export const fetchStudents = () => API.get('/students');
export const addStudent = (studentData) => API.post('/students', studentData);
export const markAttendance = (id,attendanceData) => API.post(`/attendance/${id}`, attendanceData);
export const deleteStudent = (id) => API.delete(`/students/${id}`);
export const filterAttendance = (data) => API.get('/attendance', { params: data }); // Use query parameters for year and month
