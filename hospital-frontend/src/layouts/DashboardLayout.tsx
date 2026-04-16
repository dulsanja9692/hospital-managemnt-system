import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Footer } from './Footer';
import { ThemeProvider } from '../components/theme-provider';
import { ChevronLeft, ChevronRight, PanelLeftOpen, Loader2 } from 'lucide-react';
import type { User, UserRole } from '../types';

// Shadcn UI Primitives
import { Button } from "../components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";

interface LayoutProps {
  user: User | null;
}

export const DashboardLayout = ({ user }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const hasToken = !!localStorage.getItem('token');

  if (!user) {
    if (hasToken) {
      return (
        // Added font-sans (Inter) to the loader text
        <div className="h-screen w-full flex flex-col items-center justify-center bg-background gap-4 font-sans">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">
            Re-establishing Secure Session...
          </p>
        </div>
      );
    }
    return <Navigate to="/login" replace />;
  }

  const currentRole = user.role as UserRole; 
  const currentName = user.name;

  return (
    <ThemeProvider defaultTheme="light" storageKey="hospital-theme">
      {/* - font-sans: Applies Inter globally to the body/data
          - antialiased: Makes fonts look sharper on modern screens
      */}
      <div className="flex min-h-screen bg-background text-foreground overflow-hidden font-sans antialiased">
        
        {/* SIDEBAR: Desktop View */}
        <aside
          className={`hidden md:flex flex-col sticky top-0 z-50 h-screen transition-all duration-300 ease-in-out border-r border-slate-200 dark:border-slate-800 ${
            isSidebarOpen ? 'w-60' : 'w-16'
          } bg-white dark:bg-slate-900 shadow-sm`}
        >
          <Sidebar role={currentRole} user={user} collapsed={!isSidebarOpen} />
          
          <Button 
            variant="default" 
            size="icon" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="absolute -right-5 top-12 z-50 h-10 w-10 rounded-xl shadow-xl shadow-primary/20 border-4 border-background"
          >
            {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </Button>
        </aside>

        {/* MAIN AREA */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Header Bar */}
          <header className="sticky top-0 z-40 w-full bg-background/60 backdrop-blur-xl border-b border-border/40 px-6 py-4">
            <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
              
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-xl">
                      <PanelLeftOpen size={24} className="text-primary" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 p-0 bg-card/95 backdrop-blur-2xl">
                    <ScrollArea className="h-full py-10 px-6">
                    <Sidebar role={currentRole} user={user} />
                    </ScrollArea>
                  </SheetContent>
                </Sheet>
              </div>
              
              <div className="flex-1">
                <Header userName={currentName} userRole={currentRole} />
              </div>
            </div>
          </header>

          <ScrollArea className="flex-1 bg-slate-50/50 dark:bg-slate-950/20">
            {/* Applying font-poppins to the main container ensures headers 
                inside the Outlet can inherit the stylized font 
            */}
            <main className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto min-h-full flex flex-col font-poppins">
              <div className="flex-1 bg-card/80 backdrop-blur-md rounded-[3.5rem] border border-white/40 dark:border-white/5 p-6 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] transition-all duration-500">
                <Outlet context={{ user }} /> 
              </div>
              
              <footer className="mt-12 py-8 opacity-60 font-sans">
                <div className="mb-8 h-px w-full bg-border opacity-20" />
                <Footer />
              </footer>
            </main>
          </ScrollArea>
        </div>
      </div>
    </ThemeProvider>
  );
};