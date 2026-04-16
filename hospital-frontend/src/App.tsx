/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'sonner'; 

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
import { TaskOrchestrator } from './features/dashboard/TaskOrchestrator';
import { PrescriptionTerminal } from './features/medical-records/PrescriptionTerminal';
import { PaymentSystem } from './features/billing/PaymentSystem'; 

import type { User } from './types'; 

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      const token = localStorage.getItem('token');
      try {
        if (token) {
          const response = await api.get('/auth/me'); 
          const userData = response.data?.user || 
                           response.data?.data?.user || 
                           response.data?.data || 
                           response.data;
          
          if (userData && (userData.role || userData.role_name)) {
            setUser(userData);
          }
        } else {
          await api.get('/health');
        }
      } catch (err: any) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };
    initializeApp();
  }, []); 

  if (loading) return null;

  // --- MOCK DATA FOR TERMINAL DEMO ---
  const demoPatient = { id: 'P-1001', name: 'Saman Kumara' };
  const demoItems = [
    { name: 'General Consultation', price: 2500 },
    { name: 'Amoxicillin 500mg (30 Tabs)', price: 1850 },
    { name: 'Digital Record Maintenance', price: 500 }
  ];

  return (
    <>
      {/* 1. NEURAL ALERT LAYER (Sub Task 9) */}
      <Toaster 
        position="top-right" 
        expand={false} 
        richColors 
        theme="light"
        closeButton
      />

      <BrowserRouter>
        <Routes>
          {/* 2. PUBLIC LANDING */}
          <Route path="/" element={<PublicDashboard />} />

          {/* 3. AUTHENTICATION GATES */}
          <Route 
            path="/login" 
            element={user ? <Navigate to="/dashboard" replace /> : <LoginPage onLoginSuccess={(u: User) => setUser(u)} />} 
          />

          {/* 4. PROTECTED TERMINAL INTERFACE */}
          <Route element={<ProtectedRoute />}> 
            <Route path="/dashboard" element={<DashboardLayout user={user} />}>
              <Route index element={<DashboardOverview />} />
              
              {/* Patient Care Registry */}
              <Route path="patients" element={<PatientList />} /> 
              <Route path="patients/register" element={<PatientRegistration />} />
              <Route path="patients/:id" element={<PatientProfile />} />
              <Route path="patients/edit/:id" element={<EditPatientProfile />} />

              {/* Specialist Management & Scheduling (Sub Task 11) */}
              <Route path="doctors" element={<DoctorList />} />
              <Route path="doctors/add" element={<DoctorRegistration />} />
              <Route path="doctors/schedule" element={<DoctorSchedule />} />

              {/* Logistics & Medical Operations */}
              <Route path="appointments" element={<AppointmentList />} /> 
              <Route path="appointments/session/:id" element={<ConsultationSession />} /> 
              <Route path="prescriptions" element={<PrescriptionTerminal />} />
              <Route path="workflows" element={<TaskOrchestrator />} />

              {/* Financial Gateway (Sub Task 8) */}
              <Route path="billing" element={
                <div className="p-4 md:p-8 animate-in fade-in zoom-in-95 duration-500">
                  <PaymentSystem patient={demoPatient} billItems={demoItems} />
                </div>
              } />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;