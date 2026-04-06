import { 
  Home, 
  Users, 
  Calendar, 
  CreditCard, 
  LogOut, 
  Activity, 
  Stethoscope, 
  ClipboardList // Added for Consultations
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { UserRole } from '../types';

// Shadcn UI Imports
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { cn } from "../lib/utils";

interface SidebarProps {
  role: UserRole;
  collapsed?: boolean;
}

export const Sidebar = ({ role, collapsed = false }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Unified Menu Items based on Feature-Driven paths
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
    // NEW: Consultation Link (Visible to Admins and Doctors)
    { 
      icon: ClipboardList, 
      label: 'Consultations', 
      path: '/dashboard/appointments/session/active', 
      roles: ['Super Admin', 'Hospital Admin', 'Doctor'] 
    },
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
    window.location.reload();
  };

  const filteredMenu = menuItems.filter(item => item.roles.includes(role));

  return (
    <div className="flex flex-col h-full py-6 transition-all duration-500 font-sans">
      
      {/* 1. BRAND TERMINAL */}
      <div className={cn(
        "mb-12 px-4 transition-all duration-500",
        collapsed ? "items-center flex flex-col px-0" : "text-left"
      )}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-primary rounded-2xl shadow-xl shadow-primary/30 shrink-0 group hover:rotate-12 transition-transform duration-300">
            <Activity size={24} className="text-white" />
          </div>
          {!collapsed && (
            <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase leading-none italic animate-in fade-in slide-in-from-left-4">
              MediFlow <span className="text-primary">+</span>
            </h2>
          )}
        </div>
        
        {!collapsed && (
          <div className="flex items-center gap-2 ml-1 animate-in fade-in duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
            </span>
            <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em]">
              {role} TERMINAL
            </span>
          </div>
        )}
      </div>
      
      {/* 2. NAVIGATION STACK */}
      <nav className="flex-1 space-y-2 px-2">
        {filteredMenu.map((item) => {
          const isActive = item.path === '/dashboard' 
            ? location.pathname === '/dashboard' 
            : location.pathname.startsWith(item.path);

          return (
            <Link key={item.label} to={item.path} className="block">
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-4 h-14 rounded-2xl transition-all duration-300 group relative overflow-hidden border border-transparent",
                  isActive 
                    ? "bg-primary text-white shadow-xl shadow-primary/20 hover:bg-primary/90 translate-x-1 border-primary/20" 
                    : "text-muted-foreground hover:bg-primary/5 hover:text-primary hover:border-primary/10",
                  collapsed && "justify-center px-0 translate-x-0"
                )}
              >
                <item.icon 
                  size={22} 
                  className={cn(
                    "transition-transform duration-300 group-hover:scale-110 relative z-10",
                    isActive ? "text-white" : "group-hover:text-primary"
                  )} 
                />
                
                {!collapsed && (
                  <span className="text-[11px] font-black uppercase tracking-widest relative z-10 animate-in fade-in slide-in-from-left-2">
                    {item.label}
                  </span>
                )}

                {isActive && (
                  <div className="absolute inset-0 bg-linear-to-r from-white/10 to-transparent pointer-events-none" />
                )}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* 3. SESSION TERMINATION */}
      <div className="px-2 pt-6">
        <Separator className="mb-6 opacity-20 bg-primary/20" />
        <Button 
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "w-full justify-start gap-4 h-14 rounded-2xl text-red-500 hover:bg-red-500/10 hover:text-red-600 transition-all group",
            collapsed && "justify-center px-0"
          )}
        >
          <LogOut size={22} className="group-hover:-translate-x-1 transition-transform duration-300" />
          {!collapsed && (
            <span className="text-[11px] font-black uppercase tracking-widest">Log out</span>
          )}
        </Button>
        
        {!collapsed && (
          <p className="mt-4 text-[8px] text-center font-bold text-muted-foreground/30 uppercase tracking-[0.4em]">
            Uplink: 111234
          </p>
        )}
      </div>
    </div>
  );
};