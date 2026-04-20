import axios from 'axios';
import type { User } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

export const authService = {
 // Logic for Login API integration [cite: 46, 54]
 login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
 const response = await axios.post(`${API_URL}/auth/login`, { email, password });
 const { user, token } = response.data;

 // Store JWT token for protected routes [cite: 48, 55]
 localStorage.setItem('token', token);
 return { user, token };
 },

 // Logic for Logout [cite: 47]
 logout: () => {
 localStorage.removeItem('token');
 window.location.href = '/login';
 }
};