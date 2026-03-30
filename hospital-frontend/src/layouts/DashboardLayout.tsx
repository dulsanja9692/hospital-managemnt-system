import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Footer } from './Footer';
import type { User } from '../types';

interface LayoutProps {
  user: User | null;
}

export const DashboardLayout = ({ user }: LayoutProps) => {
  return (
    <div className="flex min-h-screen bg-(--bg) text-left">
      {/* 1. Fixed Sidebar */}
      <Sidebar role={user?.role || 'Receptionist'} />
      
      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto p-8">
        
        {/* GLOBAL HEADER */}
        <Header userName={user?.name || 'User'} />
        
        {/* PAGE CONTENT - This is where your routes render */}
        <div className="flex-1">
          <div className="animate-soft-load">
            <Outlet /> 
          </div>
        </div>

        {/* GLOBAL FOOTER */}
        <Footer />
      </main>
    </div>
  );
};