import axios from 'axios';

const api = axios.create({
  // This points to your Backend running in Docker
  baseURL: 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// AUTO-AUTH: This helper automatically attaches your JWT token 
// to every request so you don't have to do it manually in every page.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;