import {
  LayoutDashboard, ScanFace, CalendarSearch,
  LogOut, BrainCircuit, Stethoscope, Workflow,
  Landmark
} from 'lucide-react';
import type { ElementType } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { User, UserRole } from '../types';
import { cn } from '../lib/utils';
import { ScrollArea } from '../components/ui/scroll-area';

interface SidebarProps {
  role: UserRole;
  user?: User | null;
  collapsed?: boolean;
}

interface MenuItem {
  icon: ElementType;
  label: string;
  path: string;
  roles: string[];
}

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard',    path: '/dashboard',                          roles: ['Super Admin', 'Hospital Admin', 'Receptionist', 'Doctor', 'Accountant'] },
  { icon: ScanFace,        label: 'Patients',     path: '/dashboard/patients',                 roles: ['Super Admin', 'Hospital Admin', 'Receptionist'] },
  { icon: CalendarSearch,  label: 'Appointments', path: '/dashboard/appointments',             roles: ['Super Admin', 'Hospital Admin', 'Receptionist', 'Doctor'] },
  { icon: BrainCircuit,    label: 'Consultations',path: '/dashboard/appointments/session/active', roles: ['Super Admin', 'Hospital Admin', 'Doctor'] },
  { icon: Workflow,        label: 'Workflows',    path: '/dashboard/workflows',                roles: ['Super Admin', 'Hospital Admin'] },
  { icon: Stethoscope,     label: 'Doctors',      path: '/dashboard/doctors',                  roles: ['Super Admin', 'Hospital Admin', 'Receptionist'] },
  { icon: Landmark,        label: 'Billing',      path: '/dashboard/billing',                  roles: ['Super Admin', 'Hospital Admin', 'Accountant'] },
];

// Role → badge colour
const roleBadgeColor: Record<string, string> = {
  'Super Admin':    'text-violet-600',
  'Hospital Admin': 'text-blue-600',
  'Doctor':         'text-emerald-600',
  'Receptionist':   'text-amber-600',
  'Accountant':     'text-sky-600',
};

// Role → avatar bg
const roleAvatarBg: Record<string, string> = {
  'Super Admin':    'bg-violet-600',
  'Hospital Admin': 'bg-blue-600',
  'Doctor':         'bg-emerald-600',
  'Receptionist':   'bg-amber-500',
  'Accountant':     'bg-sky-600',
};

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export const Sidebar = ({ role, user, collapsed = false }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const filteredMenu = menuItems.filter((item) =>
    item.roles.some(
      (r) => r.toLowerCase().trim() === role?.toString().toLowerCase().trim()
    )
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();
  };

  const initials  = getInitials(user?.name || role || 'U');
  const avatarBg  = roleAvatarBg[role]   ?? 'bg-slate-700';
  const roleColor = roleBadgeColor[role] ?? 'text-slate-500';

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 font-sans select-none">

      {/* ── BRAND ── */}
      <div className={cn('px-5 pt-6 pb-5 border-b border-slate-100 dark:border-slate-800', collapsed && 'px-3 items-center flex flex-col')}>
        {collapsed ? (
          <div className="w-8 h-8 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center">
            <span className="text-white dark:text-slate-900 text-xs font-black">M</span>
          </div>
        ) : (
          <h1 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            MediFlow <span className="text-blue-600">HMS</span>
          </h1>
        )}
      </div>

      {/* ── NAV ITEMS ── */}
      <ScrollArea className="flex-1 py-3">
        <nav className={cn('space-y-0.5', collapsed ? 'px-2' : 'px-3')}>
          {filteredMenu.map((item) => {
            const isActive =
              item.path === '/dashboard'
                ? location.pathname === '/dashboard'
                : location.pathname.startsWith(item.path);

            return (
              <Link key={item.label} to={item.path} className="block">
                <div
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 cursor-pointer transition-colors duration-150',
                    isActive
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white',
                    collapsed && 'justify-center px-2'
                  )}
                >
                  <item.icon
                    size={18}
                    className={cn(
                      'shrink-0',
                      isActive
                        ? 'text-white dark:text-slate-900'
                        : 'text-slate-500 dark:text-slate-400'
                    )}
                  />
                  {!collapsed && (
                    <span className="text-sm font-medium leading-none">
                      {item.label}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* ── USER PROFILE ── */}
      <div className={cn(
        'border-t border-slate-100 dark:border-slate-800 px-3 py-4 flex items-center gap-3',
        collapsed && 'justify-center px-2'
      )}>
        {/* Avatar */}
        <div className={cn(
          'shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold',
          avatarBg
        )}>
          {initials}
        </div>

        {/* Name + role */}
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate leading-tight">
              {user?.name || 'User'}
            </p>
            <p className={cn('text-xs font-semibold uppercase tracking-wide truncate', roleColor)}>
              {role}
            </p>
          </div>
        )}

        {/* Logout */}
        {!collapsed && (
          <button
            onClick={handleLogout}
            title="Log out"
            className="shrink-0 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <LogOut size={16} />
          </button>
        )}

        {/* Logout when collapsed */}
        {collapsed && (
          <button
            onClick={handleLogout}
            title="Log out"
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
          >
            <LogOut size={16} />
          </button>
        )}
      </div>
    </div>
  );
};