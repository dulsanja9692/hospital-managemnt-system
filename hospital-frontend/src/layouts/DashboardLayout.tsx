import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Footer } from './Footer';
import { ThemeProvider } from '../components/theme-provider';
import { ChevronLeft, ChevronRight, PanelLeftOpen } from 'lucide-react';
import type { User } from '../types';

// Shadcn UI Primitives
import { Button } from "../components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";

interface LayoutProps {
  user: User | null;
}

export const DashboardLayout = ({ user }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <ThemeProvider defaultTheme="light" storageKey="hospital-theme">
      <div className="flex min-h-screen bg-background text-foreground transition-colors duration-500 overflow-hidden font-sans">
        
        {/* 1. SIDEBAR: Desktop Glass Panel */}
        <aside 
          className={`
            hidden md:flex flex-col sticky top-0 z-50 h-screen transition-all duration-500 ease-in-out border-r border-border/40
            ${isSidebarOpen ? 'w-80' : 'w-24'}
            bg-card/30 backdrop-blur-3xl shadow-2xl
          `}
        >
          <ScrollArea className="flex-1 px-4">
            <div className={`py-8 transition-all duration-300 ${!isSidebarOpen && 'scale-90 opacity-50'}`}>
              <Sidebar role={user?.role || 'Receptionist'} />
            </div>
          </ScrollArea>

          {/* Futuristic Toggle Switch */}
          <Button 
            variant="medical"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute -right-5 top-12 z-50 h-10 w-10 rounded-xl shadow-xl shadow-primary/20 border-4 border-background"
          >
            {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </Button>
        </aside>

        {/* 2. MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          
          {/* HEADER: Shadcn-enhanced Glass Header */}
          <header className="sticky top-0 z-40 w-full bg-background/60 backdrop-blur-xl border-b border-border/40 px-6 py-4">
            <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
              
              {/* Mobile Sidebar Trigger (Shadcn Sheet) */}
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-xl">
                      <PanelLeftOpen size={24} className="text-primary" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 p-0 bg-card/95 backdrop-blur-2xl border-r-primary/20">
                    <ScrollArea className="h-full py-10 px-6">
                      <Sidebar role={user?.role || 'Receptionist'} />
                    </ScrollArea>
                  </SheetContent>
                </Sheet>
              </div>

              <div className="flex-1">
                <Header userName={user?.name || 'User'} />
              </div>
            </div>
          </header>

          {/* PAGE CONTENT: The Floating Medical "Pod" */}
          <ScrollArea className="flex-1 bg-slate-50/50 dark:bg-slate-950/20">
            <main className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto min-h-full flex flex-col">
              
              {/* THE WHITE DASHBOARD POD (Shadcn Card style) */}
              <div className="
                flex-1 bg-card/80 backdrop-blur-md rounded-[3.5rem] 
                border border-white/40 dark:border-white/5 
                p-6 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] 
                transition-all duration-500
              ">
                <Outlet /> 
              </div>

              {/* FOOTER */}
              <footer className="mt-12 py-8 opacity-60">
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