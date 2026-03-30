import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Auth & Public
import { LoginPage } from './features/auth/LoginPage';
import { PublicDashboard } from './features/public/PublicDashboard';

// Patient Management
import { PatientList } from './features/patients/PatientList'; 
import { PatientRegistration } from './features/patients/PatientRegistration';
import { PatientProfile } from './features/patients/PatientProfile';
import { EditPatientProfile } from './features/patients/EditPatientProfile';

// Doctor Management
import { DoctorList } from './features/doctors/DoctorList';
import { DoctorRegistration } from './features/doctors/DoctorRegistration';
import { DoctorSchedule } from './features/doctors/DoctorSchedule'; // NEW: Schedule import

// Layouts
import { DashboardLayout } from './layouts/DashboardLayout';
import type { User } from './types'; 

// Guard component to handle unauthorized access
const ProtectedRoute = ({ isAllowed }: { isAllowed: boolean }) => {
  return isAllowed ? <Outlet /> : <Navigate to="/login" replace />; 
};

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
        // Defaulting to Receptionist for development
        setUser({ 
          id: '1', 
          name: 'Sanjana', 
          role: 'Receptionist',
          email: 'sanjana@hospital.lk' 
        });
      }
      setLoading(false);
    };
    checkSession();
  }, []); 

  if (loading) return null;

  return (
    <BrowserRouter>
      <Routes>
        {/* 1. PUBLIC ROUTES */}
        <Route path="/" element={<PublicDashboard />} />

        {/* 2. AUTH ROUTES */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
            <Navigate to="/dashboard" replace /> : 
            <LoginPage onLoginSuccess={(u: User) => { 
              setUser(u); 
              setIsAuthenticated(true); 
            }} />
          } 
        />

        {/* 3. PROTECTED DASHBOARD */}
        <Route element={<ProtectedRoute isAllowed={isAuthenticated} />}> 
          <Route path="/dashboard" element={<DashboardLayout user={user} />}>
            
            {/* Index Route */}
            <Route index element={<h1 className="text-left text-3xl font-black">Welcome back, {user?.name}</h1>} />
            
            {/* Patient Module */}
            <Route path="patients" element={<PatientList />} /> 
            <Route path="patients/register" element={<PatientRegistration />} />
            <Route path="patients/:id" element={<PatientProfile />} />
            <Route path="patients/edit/:id" element={<EditPatientProfile />} />

            {/* Doctor & Schedule Module */}
            <Route path="doctors" element={<DoctorList />} />
            <Route path="doctors/add" element={<DoctorRegistration />} />
            {/* NEW: This is the route triggered by the Calendar icon in your modal */}
            <Route path="doctors/schedule" element={<DoctorSchedule />} />

            {/* Other Modules */}
            <Route path="appointments" element={<h1 className="text-left text-3xl font-black">Appointment Scheduling</h1>} />
            <Route path="billing" element={<h1 className="text-left text-3xl font-black">Billing & Payments</h1>} />
          </Route>
        </Route>

        {/* 4. CATCH-ALL */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;