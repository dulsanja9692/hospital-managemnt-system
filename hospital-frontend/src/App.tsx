/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// --- API Utility ---
import api from './lib/api'; 

// --- Pages & Layouts ---
import { LoginPage } from './pages/LoginPage';
import { PublicDashboard } from './pages/PublicDashboard';
import { DashboardOverview } from './pages/DashboardOverview';
import { DashboardLayout } from './layouts/DashboardLayout';

// --- Feature Components ---
import { PatientList } from './features/patients/PatientList'; 
import { PatientRegistration } from './features/patients/PatientRegistration';
import { PatientProfile } from './features/patients/PatientProfile';
import { EditPatientProfile } from './features/patients/EditPatientProfile';
import { DoctorList } from './features/doctors/DoctorList';
import { DoctorRegistration } from './features/doctors/DoctorRegistration';
import { DoctorSchedule } from './features/doctors/DoctorSchedule'; 
import { AppointmentList } from './features/appointments/AppointmentList';
import { ConsultationSession } from './features/consultations/ConsultationSession'; 

import type { User } from './types'; 

const ProtectedRoute = ({ isAllowed }: { isAllowed: boolean }) => {
  return isAllowed ? <Outlet /> : <Navigate to="/login" replace />; 
};

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Health Check
    api.get('/health')
      .then(() => console.log("✅ Medical Data Uplink: Stable"))
      .catch((err: any) => console.error("❌ Uplink Failed", err));

    // 2. Dynamic Session Recovery
    const checkSession = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const response = await api.get('/auth/me'); 
          // We check for response.data.user OR response.data based on controller logic
          const userData = response.data.user || response.data;
          setUser(userData); 
          setIsAuthenticated(true);
        } catch (err) {
          console.error("Session sync failed:", err);
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setUser(null);
        }
      }
      
      // Ensure loading turns off regardless of outcome
      setLoading(false);
    };

    checkSession();
  }, []); 

  if (loading) return null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicDashboard />} />

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

        <Route element={<ProtectedRoute isAllowed={isAuthenticated} />}> 
          <Route path="/dashboard" element={<DashboardLayout user={user} />}>
            <Route index element={<DashboardOverview />} />
            <Route path="patients" element={<PatientList />} /> 
            <Route path="patients/register" element={<PatientRegistration />} />
            <Route path="patients/:id" element={<PatientProfile />} />
            <Route path="patients/edit/:id" element={<EditPatientProfile />} />
            <Route path="doctors" element={<DoctorList />} />
            <Route path="doctors/add" element={<DoctorRegistration />} />
            <Route path="doctors/schedule" element={<DoctorSchedule />} />
            <Route path="appointments" element={<AppointmentList />} /> 
            <Route path="appointments/session/:id" element={<ConsultationSession />} /> 

            <Route path="billing" element={
              <div className="flex flex-col items-center justify-center py-20 opacity-20 italic">
                <h1 className="text-4xl font-black uppercase tracking-[0.5em]">Financial Uplink Pending</h1>
                <p className="text-xs font-bold uppercase tracking-widest mt-4">ITBIN-2211-0249 • Module Locked</p>
              </div>
            } />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;