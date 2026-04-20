import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../components/theme-provider';
import { Button } from "../components/ui/button";
import { UserDropdown } from './UserDropdown';

export const Header = ({ userName, userRole }: { userName: string; userRole: string }) => {
 const { theme, setTheme } = useTheme();

 return (
 <header className="flex items-center w-full transition-all duration-300">
 <div className="ml-auto flex items-center gap-3">

 {/* Theme Toggle */}
 <Button
 variant="ghost"
 size="icon"
 onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
 className="h-10 w-10  border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all"
 >
 {theme === 'light' ? (
 <Moon size={18} className="text-slate-700" />
 ) : (
 <Sun size={18} className="text-amber-400" />
 )}
 </Button>

 {/* User Profile Dropdown */}
 <UserDropdown userName={userName} userRole={userRole} />
 </div>
 </header>
 );
};