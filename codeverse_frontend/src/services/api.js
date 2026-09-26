import axios from 'axios';

// Uses VITE_API_URL from .env if present, otherwise defaults based on hostname
export const BASE_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_BACKEND_URL ||
  (typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:3000'
    : 'https://codeverseapi.onrender.com');

const api = axios.create({
  baseURL: BASE_URL,
});

// Attach Authorization header if JWT token exists in localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication
export const signinUser = (data) => api.post('/signin', data);
export const signupUser = (data) => api.post('/signup', data);

// User Profile Data
export const getUserProfile = (username) => api.get(`/user/${username}`);
export const syncUserProfile = (username) => api.put(`/user/${username}`);

// Edit Profile
export const updatePersonalDetails = (data) => api.put('/user/updatedetails', data);
export const updateSocials = (data) => api.put('/user/addsocial', data);
export const updateCodingPlatforms = (data) => api.put('/user/addplatform', data);

// Leaderboard
export const getLeaderboard = () => api.get('/leaderboard');

export default api;
