import { useState } from 'react';
import { 
 Plus, Clock, Trash2, Users, ArrowRight, 
 CalendarDays, CheckCircle2, Zap, Database 
} from 'lucide-react';

// Shadcn UI Imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
 DialogDescription,
} from "@/components/ui/dialog";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";

interface Session {
 id: string;
 day: string;
 startTime: string;
 endTime: string;
 maxPatients: number;
}

export const DoctorSchedule = () => {
 const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
 const [sessions, setSessions] = useState<Session[]>([
 { id: '1', day: 'Monday', startTime: '09:00', endTime: '12:00', maxPatients: 15 },
 { id: '2', day: 'Wednesday', startTime: '14:00', endTime: '17:00', maxPatients: 10 },
 ]);

 const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

 return (
 <div className="space-y-12 animate-in fade-in duration-700 text-left p-2 min-h-screen font-sans antialiased">
 
 {/* 1. HEADER SECTION */}
 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
 <div className="flex items-center gap-6 text-left">
 <div className="relative group">
 <div className="absolute inset-0 bg-primary blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
 <div className="relative p-5 bg-primary  text-white  group-hover:scale-105 transition-transform duration-500">
 <CalendarDays size={32} />
 </div>
 </div>
 <div>
 <h2 className="text-2xl font-poppins  text-foreground  uppercase leading-none">
 Care <span className="text-primary">Schedule</span>
 </h2>
 <p className="text-[10px] font-sans  text-muted-foreground uppercase  mt-3">
 Weekly Consultation Hours • Availability Roster
 </p>
 </div>
 </div>
 
 <Button 
 onClick={() => setIsCreateModalOpen(true)}
 className="h-16 px-10 bg-primary text-white font-poppins   hover:scale-105 active:scale-95  gap-3 transition-all"
 >
 <Plus size={22} /> 
 <span className="uppercase  text-xs">Define New Session</span>
 </Button>
 </div>

 {/* 2. TIMELINE VIEW */}
 <div className="flex flex-col gap-6">
 {days.map((day) => {
 const daySessions = sessions.filter(s => s.day === day);
 
 return (
 <div key={day} className="group flex flex-col md:flex-row items-stretch gap-4 transition-all duration-500 hover:translate-x-2">
 
 {/* Day Label Sidebar */}
 <Card className="md:w-52 bg-card border-border  p-6 flex flex-col justify-center items-center  relative overflow-hidden group-hover:border-primary/40 ">
 <div className="absolute top-0 left-0 w-1.5 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
 <h3 className="text-xs font-poppins  uppercase  text-primary">{day}</h3>
 <Badge variant="secondary" className="mt-3 bg-primary/5 text-primary border-primary/10 font-sans  text-[9px] uppercase ">
 {daySessions.length} Scheduled
 </Badge>
 </Card>

 {/* Sessions Track */}
 <Card className="flex-1 bg-card border-border  p-4 flex flex-wrap gap-4 items-center min-h-30  ">
 {daySessions.map(session => (
 <Card key={session.id} className="relative animate-in zoom-in-95 duration-500 bg-card border-border  hover:border-primary/40 transition-all ">
 <CardContent className="p-6 flex items-center gap-8">
 <div className="flex flex-col text-left">
 <div className="flex items-center gap-3 text-foreground text-xl font-poppins  ">
 <Clock size={16} className="text-primary" />
 {session.startTime} <ArrowRight size={14} className="opacity-20" /> {session.endTime}
 </div>
 <div className="flex items-center gap-2 mt-3">
 <Badge variant="outline" className="px-3 py-1 bg-primary/5 border-primary/10 text-primary text-[9px] font-sans  uppercase  gap-2">
 <Users size={12} />
 {session.maxPatients} Patients Capacity
 </Badge>
 </div>
 </div>

 <Button 
 variant="ghost" 
 size="icon"
 onClick={() => setSessions(prev => prev.filter(s => s.id !== session.id))}
 className="h-10 w-10 text-muted-foreground/30 hover:text-red-500 hover:bg-red-500/10  transition-all"
 >
 <Trash2 size={18} />
 </Button>
 </CardContent>
 </Card>
 ))}

 {daySessions.length === 0 && (
 <div className="ml-8 text-[10px] font-sans  uppercase  text-muted-foreground/20">
 Rest period • No sessions defined
 </div>
 )}
 </Card>
 </div>
 );
 })}
 </div>

 {/* 3. SYSTEM FOOTER */}
 <footer className="mt-20 pt-8 border-t border-border flex justify-between items-center opacity-30 font-sans">
 <p className="text-[9px]   uppercase">Personnel Secure Access • ITBIN-2211-0249</p>
 <div className="flex items-center gap-2">
 <Database size={12} className="text-primary" />
 <p className="text-[9px]   uppercase underline decoration-primary">Active Roster Synchronization</p>
 </div>
 </footer>

 {/* 4. CREATE SESSION MODAL */}
 <CreateSessionModal 
 isOpen={isCreateModalOpen} 
 onClose={() => setIsCreateModalOpen(false)} 
 />
 </div>
 );
};

/* --- SUB-COMPONENT: RE-STYLED MODAL --- */

const CreateSessionModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
 return (
 <Dialog open={isOpen} onOpenChange={onClose}>
 <DialogContent className="sm:max-w-lg  p-0 overflow-hidden border-border bg-card  font-sans">
 
 <DialogHeader className="p-8 border-b border-border bg-primary/2">
 <div className="flex items-center gap-4 text-left">
 <div className="p-3 bg-primary/10  text-primary border border-primary/20">
 <Zap size={20} />
 </div>
 <div>
 <DialogTitle className="text-2xl font-poppins  text-foreground  uppercase leading-none">New Session</DialogTitle>
 <DialogDescription className="text-[9px] font-sans  text-muted-foreground uppercase  mt-2">
 Planning your clinical availability hours
 </DialogDescription>
 </div>
 </div>
 </DialogHeader>

 <div className="p-10 space-y-8 text-left font-sans">
 <div className="space-y-3">
 <label className="text-[10px] font-poppins  uppercase text-muted-foreground  flex items-center gap-2 ml-1">
 <CalendarDays size={14} className="text-primary" /> Workday Selection
 </label>
 <Select defaultValue="Monday">
 <SelectTrigger className="h-14  bg-background border-border focus:ring-primary/20 ">
 <SelectValue placeholder="Choose Day" />
 </SelectTrigger>
 <SelectContent className=" font-sans  uppercase text-xs">
 {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
 <SelectItem key={day} value={day}>{day}</SelectItem>
 ))}
 </SelectContent>
 </Select>
 </div>

 <div className="grid grid-cols-2 gap-6">
 <div className="space-y-3">
 <label className="text-[10px] font-poppins  uppercase text-muted-foreground  flex items-center gap-2 ml-1">
 <Clock size={14} className="text-primary" /> Shift Start
 </label>
 <Input type="time" className="h-14  bg-background border-border " />
 </div>
 <div className="space-y-3">
 <label className="text-[10px] font-poppins  uppercase text-muted-foreground  flex items-center gap-2 ml-1">
 <Clock size={14} className="text-primary" /> Shift End
 </label>
 <Input type="time" className="h-14  bg-background border-border " />
 </div>
 </div>

 <div className="space-y-3">
 <label className="text-[10px] font-poppins  uppercase text-muted-foreground  flex items-center gap-2 ml-1">
 <Users size={14} className="text-primary" /> Daily Patient Limit
 </label>
 <Input 
 type="number" 
 placeholder="e.g. 20"
 className="h-14  bg-background border-border  placeholder:text-muted-foreground/30" 
 />
 </div>

 <div className="flex flex-col gap-4 pt-4 pb-2">
 <Button 
 className="h-16 bg-primary text-white font-poppins    hover:scale-[1.02] active:scale-95 transition-all gap-3 uppercase  text-[11px]"
 onClick={onClose}
 >
 <CheckCircle2 size={18} /> Confirm Availability
 </Button>
 <Button 
 variant="ghost"
 onClick={onClose}
 className="h-14 font-poppins  uppercase  text-[10px] text-muted-foreground hover:text-red-500 transition-colors"
 >
 Discard Changes
 </Button>
 </div>
 </div>
 </DialogContent>
 </Dialog>
 );
};