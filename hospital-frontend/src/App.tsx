/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// --- API Utility ---
import api from './lib/api'; 

// --- Pages (Route Entry Points) ---
import { LoginPage } from './pages/LoginPage';
import { PublicDashboard } from './pages/PublicDashboard';
import { DashboardOverview } from './pages/DashboardOverview';

// --- Feature Components (Patient Management) ---
import { PatientList } from './features/patients/PatientList'; 
import { PatientRegistration } from './features/patients/PatientRegistration';
import { PatientProfile } from './features/patients/PatientProfile';
import { EditPatientProfile } from './features/patients/EditPatientProfile';

// --- Feature Components (Doctor Management) ---
import { DoctorList } from './features/doctors/DoctorList';
import { DoctorRegistration } from './features/doctors/DoctorRegistration';
import { DoctorSchedule } from './features/doctors/DoctorSchedule'; 

// --- Feature Components (Appointment & Consultation) ---
import { AppointmentList } from './features/appointments/AppointmentList';
import { ConsultationSession } from './features/consultations/ConsultationSession'; // NEW IMPORT

// --- Layouts ---
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
    // 1. Check Backend Connection
    api.get('/health')
      .then(() => console.log("✅ Medical Data Uplink: Stable"))
      .catch((err: any) => {
        console.error("❌ Medical Data Uplink: Failed. Verify src/lib/api.ts config.", err);
      });

    // 2. Check Auth Session
    const checkSession = () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
        // Personnel ID: ITBIN-2211-0249
        setUser({ 
          id: 'ITBIN-2211-0249', 
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
        {/* 1. PUBLIC LANDING PAGE */}
        <Route path="/" element={<PublicDashboard />} />

        {/* 2. AUTHENTICATION */}
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

        {/* 3. PROTECTED MEDICAL DASHBOARD */}
        <Route element={<ProtectedRoute isAllowed={isAuthenticated} />}> 
          <Route path="/dashboard" element={<DashboardLayout user={user} />}>
            
            {/* Index Route: Intelligence HUD */}
            <Route index element={<DashboardOverview />} />
            
            {/* Patient Registry Module */}
            <Route path="patients" element={<PatientList />} /> 
            <Route path="patients/register" element={<PatientRegistration />} />
            <Route path="patients/:id" element={<PatientProfile />} />
            <Route path="patients/edit/:id" element={<EditPatientProfile />} />

            {/* Doctor & Schedule Module */}
            <Route path="doctors" element={<DoctorList />} />
            <Route path="doctors/add" element={<DoctorRegistration />} />
            <Route path="doctors/schedule" element={<DoctorSchedule />} />

            {/* Appointment & Consultation Module */}
            <Route path="appointments" element={<AppointmentList />} /> 
            {/* NEW ROUTE: This makes the consultation page appear */}
            <Route path="appointments/session/:id" element={<ConsultationSession />} /> 

            {/* Billing Module Placeholder */}
            <Route path="billing" element={
              <div className="flex flex-col items-center justify-center py-20 opacity-20 italic">
                <h1 className="text-4xl font-black uppercase tracking-[0.5em]">Financial Uplink Pending</h1>
                <p className="text-xs font-bold uppercase tracking-widest mt-4">ITBIN-2211-0249 • Module Locked</p>
              </div>
            } />
          </Route>
        </Route>

        {/* 4. CATCH-ALL REDIRECT */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;