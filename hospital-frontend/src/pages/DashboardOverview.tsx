import { useOutletContext } from 'react-router-dom';
import { ShieldCheck, Loader2, Zap, Activity } from 'lucide-react';
import type { User } from '../types';

// Shadcn UI & Components
import { Badge } from "@/components/ui/badge";

import { SummaryStats } from "../features/dashboard/components/SummaryStats";
import { RegistryPulse } from "../features/dashboard/components/RegistryPulse";
import { LoadBalancer } from "../features/dashboard/components/LoadBalancer";
import { AppointmentBarChart } from "../features/dashboard/components/AppointmentBarChart";
import { PatientStatusChart } from "../features/dashboard/components/PatientStatusChart";

export const DashboardOverview = () => {
 const { user } = useOutletContext<{ user: User }>();

 return (
 <div className="max-w-7xl mx-auto p-4 space-y-8 text-left animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans antialiased pb-20">
 
 {/* 0. WELCOME HEADER */}
 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
 <div className="space-y-2">
 <div className="flex items-center gap-4">
 <div className="p-3 bg-primary/10  text-primary">
 <Zap size={20} fill="currentColor" />
 </div>
 <h1 className="text-3xl font-poppins   text-foreground">
 Welcome back, {user?.name?.split(' ')[0] || 'Sanjana'}
 </h1>
 </div>
 <div className="flex items-center gap-2.5 ml-1">
 <span className="relative flex h-2 w-2">
 <span className="animate-ping absolute inline-flex h-full w-full  bg-green-400 opacity-75"></span>
 <span className="relative inline-flex  h-2 w-2 bg-green-500"></span>
 </span>
 <p className="text-muted-foreground text-xs ">
 {user?.role || 'Personnel'} • System Online
 </p>
 </div>
 </div>
 
 <Badge variant="outline" className="px-4 py-2 border-primary/20 bg-primary/5 text-xs  text-primary">
 <ShieldCheck size={13} className="mr-1.5" /> Secure Session
 </Badge>
 </div>

 {/* 1. KEY PERFORMANCE METRICS */}
 <SummaryStats />

 {/* 2. MAIN ANALYTICS GRID — Area Chart + Load Balancer */}
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
 
 <div className="lg:col-span-8">
 <div className=" border border-border/40 bg-card/60 backdrop-blur-xl p-6 relative overflow-hidden h-full">
 <div className="flex items-center gap-3 mb-6">
 <Activity size={16} className="text-primary" />
 <h3 className="text-sm font-poppins  text-foreground ">Patient Registry Pulse</h3>
 </div>
 <RegistryPulse />
 </div>
 </div>

 <div className="lg:col-span-4 flex flex-col">
 <LoadBalancer />
 </div>
 </div>

 {/* 3. SECONDARY CHARTS ROW — Bar Chart + Pie Chart */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <AppointmentBarChart />
 <PatientStatusChart />
 </div>

 {/* 4. FOOTER */}
 <footer className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 opacity-40 hover:opacity-100 transition-opacity duration-500">
 <div className="flex items-center gap-3">
 <ShieldCheck size={14} className="text-primary" />
 <p className="text-[10px]  text-foreground  uppercase">
 MediFlow HMS v3.0
 </p>
 </div>
 <div className="flex items-center gap-2">
 <Loader2 size={14} className="animate-spin text-primary" />
 <p className="text-[10px]  text-foreground  uppercase">
 Node: {user?.id || 'ITBIN-2211-0249'}
 </p>
 </div>
 </footer>
 </div>
 );
};