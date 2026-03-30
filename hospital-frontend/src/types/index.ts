// src/types/index.ts

// Add 'export' here to fix the error in Sidebar.tsx
export type UserRole = 'Super Admin' | 'Hospital Admin' | 'Receptionist' | 'Doctor' | 'Accountant';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}