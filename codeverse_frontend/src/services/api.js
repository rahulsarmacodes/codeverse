import axios from 'axios';

// Resolves backend URL safely across development, production, and environments
const rawUrl =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) ||
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_BACKEND_URL) ||
  (typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:3000'
    : 'https://codeverse-eby6.onrender.com');

// Ensure no trailing slash so path concatenation is never malformed
export const BASE_URL = (rawUrl || 'https://codeverse-eby6.onrender.com').replace(/\/+$/, '');

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30s timeout to handle free-tier cloud cold starts
});

// Attach Authorization header if JWT token exists in localStorage
api.interceptors.request.use(
  (config) => {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle authorization expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      if (typeof localStorage !== 'undefined') {
        const isAuthRequest = error.config?.url?.includes('/signin') || error.config?.url?.includes('/signup');
        if (!isAuthRequest) {
          localStorage.removeItem('token');
        }
      }
    }
    return Promise.reject(error);
  }
);

// Helper to extract clean error message string from any response
export const getErrorMessage = (error) => {
  if (error?.response?.data?.message) return error.response.data.message;
  if (typeof error?.response?.data === 'string') return error.response.data;
  return error?.message || 'Something went wrong. Please try again.';
};

// Authentication
export const signinUser = (data) => api.post('/signin', data);
export const signupUser = (data) => api.post('/signup', data);

// User Profile Data
export const getUserProfile = (username) => api.get(`/user/${encodeURIComponent(username)}`);
export const syncUserProfile = (username) => api.put(`/user/${encodeURIComponent(username)}`);

// Edit Profile
export const updatePersonalDetails = (data) => api.put('/user/updatedetails', data);
export const updateSocials = (data) => api.put('/user/addsocial', data);
export const updateCodingPlatforms = (data) => api.put('/user/addplatform', data);

// Leaderboard
export const getLeaderboard = () => api.get('/leaderboard');

// Username Validations
export const validateLeetcode = (username) => api.get(`/validate/leetcode?username=${encodeURIComponent(username)}`);
export const validateGFG = (username) => api.get(`/validate/gfg?username=${encodeURIComponent(username)}`);
export const validateCodeforces = (username) => api.get(`/validate/codeforces?username=${encodeURIComponent(username)}`);
export const validateCodechef = (username) => api.get(`/validate/codechef?username=${encodeURIComponent(username)}`);

export default api;
