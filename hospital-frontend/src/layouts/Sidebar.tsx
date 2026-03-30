import { Home, Users, Calendar, CreditCard, LogOut, Activity, Stethoscope } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { UserRole } from '../types';

interface SidebarProps {
  role: UserRole;
}

export const Sidebar = ({ role }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { 
      icon: Home, 
      label: 'Dashboard', 
      path: '/dashboard', 
      roles: ['Super Admin', 'Hospital Admin', 'Receptionist', 'Doctor', 'Accountant'] 
    },
    { 
      icon: Users, 
      label: 'Patients', 
      path: '/dashboard/patients', 
      roles: ['Super Admin', 'Hospital Admin', 'Receptionist'] 
    },
    { 
      icon: Calendar, 
      label: 'Appointments', 
      path: '/dashboard/appointments', 
      roles: ['Super Admin', 'Hospital Admin', 'Receptionist', 'Doctor'] 
    },
    // NEW: Doctors Management Section
    { 
      icon: Stethoscope, 
      label: 'Doctors', 
      path: '/dashboard/doctors', 
      roles: ['Super Admin', 'Hospital Admin', 'Receptionist'] 
    },
    { 
      icon: CreditCard, 
      label: 'Billing', 
      path: '/dashboard/billing', 
      roles: ['Super Admin', 'Hospital Admin', 'Accountant'] 
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    // Using navigate is cleaner, but reload ensures state is wiped
    window.location.reload();
  };

  const filteredMenu = menuItems.filter(item => item.roles.includes(role));

  return (
    <aside className="w-72 bg-(--code-bg) border-r border-(--border) h-screen sticky top-0 flex flex-col p-6 transition-all print:hidden">
      
      {/* Brand Section */}
      <div className="mb-10 px-4 text-left">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-(--accent-bg) rounded-xl border border-(--accent-border)">
            <Activity size={24} className="text-(--accent)" />
          </div>
          <h2 className="text-2xl font-black text-(--text-h) tracking-tighter">MediFlow</h2>
        </div>
        <div className="flex items-center gap-2 ml-1">
          <span className="w-1.5 h-1.5 bg-(--accent) rounded-full animate-pulse shadow-[0_0_8px_var(--accent)]" />
          <span className="text-[10px] font-black text-(--text) uppercase tracking-[0.2em] opacity-70">
            {role} Portal
          </span>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {filteredMenu.map((item) => {
          const isActive = item.path === '/dashboard' 
            ? location.pathname === '/dashboard' 
            : location.pathname.startsWith(item.path);

          return (
            <Link 
              key={item.label} 
              to={item.path} 
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all duration-300 group ${
                isActive 
                  ? 'bg-(--accent) text-white shadow-(--shadow) scale-[1.02]' 
                  : 'text-(--text) hover:bg-(--bg) hover:text-(--text-h)'
              }`}
            >
              <item.icon 
                size={22} 
                className={`${isActive ? 'text-white' : 'group-hover:text-(--accent)'} transition-colors`} 
              />
              <span className="tracking-tight text-sm uppercase">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="pt-6 border-t border-(--border)">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-5 py-4 text-red-500 font-bold rounded-2xl hover:bg-red-500/10 transition-all group"
        >
          <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
          <span className="tracking-tight text-sm uppercase">Logout</span>
        </button>
      </div>
    </aside>
  );
};