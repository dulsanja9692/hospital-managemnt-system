import axios from 'axios';

// Define the interface for environment variables
declare global {
  interface ImportMetaEnv {
    readonly VITE_API_URL?: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. REQUEST INTERCEPTOR: Attaches the Bearer Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. RESPONSE INTERCEPTOR: Smart Session Handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isUnauthorized = error.response?.status === 401;
    const isLoginPage = window.location.pathname.includes('/login');
    const isDashboardPage = window.location.pathname.includes('/dashboard');

    if (isUnauthorized && !isLoginPage) {
      console.warn("🚨 Session invalid. Cleaning local trace.");
      
      // Clear token only if we are sure it's a security rejection
      localStorage.removeItem('token');
      
      // Only force redirect if the user is actively trying to view the dashboard
      if (isDashboardPage) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;