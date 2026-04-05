import { Bell, Search, User, ChevronDown, Moon, Sun, Settings, LogOut, Shield } from 'lucide-react';
import { useTheme } from '../components/theme-provider';

// Shadcn UI Imports
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

export const Header = ({ userName }: { userName: string }) => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex items-center justify-between w-full transition-all duration-300">
      
      {/* 1. Global Search Bar - Using Shadcn Input with Relative Pathing */}
      <div className="relative w-72 lg:w-96 group">
        <Search 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors z-10" 
          size={18} 
        />
        <Input 
          type="text" 
          placeholder="Search records, doctors..." 
          className="h-12 pl-12 pr-4 bg-muted/40 border-border/40 rounded-2xl focus-visible:ring-primary/20 focus-visible:border-primary transition-all font-medium"
        />
      </div>

      {/* 2. Utility Actions */}
      <div className="flex items-center gap-3">
        
        {/* THEME TOGGLE - Using Shadcn Button ghost variant */}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="h-11 w-11 rounded-xl border border-border/40 bg-card/50 hover:border-primary/50 hover:bg-primary/5 transition-all"
        >
          {theme === "light" ? (
            <Moon size={20} className="text-slate-700 transition-colors" />
          ) : (
            <Sun size={20} className="text-amber-400 transition-colors" />
          )}
        </Button>
        
        {/* NOTIFICATIONS - With custom red pulse */}
        <Button 
          variant="ghost" 
          size="icon"
          className="h-11 w-11 rounded-xl border border-border/40 bg-card/50 hover:border-primary/50 hover:bg-primary/5 relative transition-all"
        >
          <Bell size={20} className="text-foreground/70" />
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background shadow-[0_0_10px_rgba(239,68,68,0.4)] animate-pulse" />
        </Button>

        {/* 3. USER PROFILE DROPDOWN - Using Shadcn DropdownMenu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center gap-3 h-14 pl-1.5 pr-4 bg-card/50 border border-border/40 rounded-2xl hover:border-primary/50 hover:bg-primary/5 transition-all group focus-visible:ring-0"
            >
              <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-black shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
                <User size={20} />
              </div>
              
              <div className="text-left hidden sm:block">
                <p className="text-[11px] font-black leading-tight uppercase tracking-tighter">
                  {userName}
                </p>
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">
                  Receptionist
                </p>
              </div>
              
              <ChevronDown size={14} className="text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 mt-2 rounded-2xl border-border/40 bg-card/95 backdrop-blur-xl p-2 shadow-2xl">
            <DropdownMenuLabel className="px-3 py-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">My Account</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/40 mx-2" />
            <DropdownMenuItem className="rounded-xl py-2.5 focus:bg-primary/10 focus:text-primary cursor-pointer transition-colors">
              <User className="mr-2 h-4 w-4" /> Profile Details
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-xl py-2.5 focus:bg-primary/10 focus:text-primary cursor-pointer transition-colors">
              <Settings className="mr-2 h-4 w-4" /> System Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-xl py-2.5 focus:bg-primary/10 focus:text-primary cursor-pointer transition-colors">
              <Shield className="mr-2 h-4 w-4" /> Privacy Protocol
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border/40 mx-2" />
            <DropdownMenuItem className="rounded-xl py-2.5 text-red-500 focus:bg-red-500/10 focus:text-red-600 cursor-pointer transition-colors font-bold">
              <LogOut className="mr-2 h-4 w-4" /> Terminate Session
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>
  );
};