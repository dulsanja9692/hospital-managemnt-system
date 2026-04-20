import { useState } from 'react';
import { Plus, CalendarCheck, Clock, User, Activity } from 'lucide-react';

// Shadcn UI Imports
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchBar } from '@/components/SearchBar';

// Feature Components
import { AddAppointmentModal } from './components/AddAppointmentModal';
import { ViewAppointmentModal } from './components/ViewAppointmentModal';

// Define the Appointment Interface for type safety
export interface Appointment {
 id: string;
 patient: string;
 doctor: string;
 time: string;
 date: string;
 status: string;
}

export const AppointmentList = () => {
 const [isAddModalOpen, setIsAddModalOpen] = useState(false);
 const [isViewModalOpen, setIsViewModalOpen] = useState(false);
 const [selectedApt, setSelectedApt] = useState<Appointment | null>(null);
 const [searchTerm, setSearchTerm] = useState('');

 // Mock Data - In a real app, this comes from your useAppointments hook
 const [appointments, setAppointments] = useState<Appointment[]>([
 { id: 'APT-9901', patient: 'Saman Kumara', doctor: 'Dr. Saman Perera', time: '09:30 AM', date: '04 APR', status: 'Scheduled' },
 { id: 'APT-9902', patient: 'Nuwanthi Silva', doctor: 'Dr. Anna Silva', time: '11:00 AM', date: '04 APR', status: 'In Progress' },
 ]);

 const filteredAppointments = appointments.filter(apt => 
 apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
 apt.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
 apt.id.toLowerCase().includes(searchTerm.toLowerCase())
 );

 const handleRowClick = (apt: Appointment) => {
 setSelectedApt(apt);
 setIsViewModalOpen(true);
 };

 const handleUpdate = (updatedApt: Appointment) => {
 setAppointments(prev => prev.map(a => a.id === updatedApt.id ? updatedApt : a));
 setIsViewModalOpen(false);
 };

 return (
 <div className="space-y-8 animate-in fade-in duration-700 text-left p-2 font-sans">
 
 {/* 1. HEADER SECTION */}
 <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
 <div className="flex items-center gap-5">
 <div className="p-4 bg-primary  text-white  relative group overflow-hidden">
 <CalendarCheck size={28} className="relative z-10" />
 <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
 </div>
 <div>
 <h2 className="text-3xl  text-foreground  uppercase leading-none">
 Appointment <span className="text-primary">Registry</span>
 </h2>
 <p className="text-[10px]  text-muted-foreground uppercase  mt-2">
 Clinical Session Queue • Personnel ID: ITBIN-2211-0249
 </p>
 </div>
 </div>

 <Button 
 onClick={() => setIsAddModalOpen(true)}
 className="h-14 px-8 bg-primary text-white   hover:scale-105 active:scale-95  gap-3 transition-all"
 >
 <Plus size={20} />
 <span className=" text-[10px]">NEW APPOINTMENT</span>
 </Button>
 </div>

 {/* 2. SEARCH */}
 <SearchBar
 value={searchTerm}
 onChange={setSearchTerm}
 placeholder="Search by patient, doctor, or ref ID..."
 />

 {/* 3. QUEUE STREAM (Scrollable) */}
 <ScrollArea className="h-[calc(100vh-400px)] pr-4">
 <div className="space-y-4 pb-10">
 {filteredAppointments.length > 0 ? (
 filteredAppointments.map((apt) => (
 <Card 
 key={apt.id} 
 onClick={() => handleRowClick(apt)}
 className="group border-border/40 bg-card   hover:border-primary/40 transition-all cursor-pointer "
 >
 <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
 {/* Date Badge */}
 <div className="flex flex-col items-center justify-center w-20 h-20 bg-primary/5  border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-500">
 <span className="text-[10px]  uppercase  opacity-60 group-hover:opacity-100">{apt.date.split(' ')[1]}</span>
 <span className="text-2xl  leading-none">{apt.date.split(' ')[0]}</span>
 </div>

 {/* Core Engagement Info */}
 <div className="flex-1 text-center md:text-left">
 <div className="text-[9px]  text-primary uppercase  mb-1">Session Reference: {apt.id}</div>
 <h3 className="text-xl  text-foreground uppercase  leading-none group-hover:text-primary transition-colors">
 {apt.patient}
 </h3>
 <div className="flex items-center justify-center md:justify-start gap-3 mt-2">
 <User size={14} className="text-primary" />
 <span className="text-xs  text-muted-foreground uppercase ">{apt.doctor}</span>
 </div>
 </div>

 {/* Time & Status Badge */}
 <div className="flex items-center gap-8">
 <div className="flex flex-col items-end">
 <div className="flex items-center gap-2 text-foreground  text-lg">
 <Clock size={16} className="text-primary" /> {apt.time}
 </div>
 <Badge 
 variant="outline" 
 className={`mt-2 uppercase text-[9px]   border px-3 py-1  ${
 apt.status === 'In Progress' 
 ? 'bg-amber-500/10 text-amber-600 border-amber-500/20 animate-pulse' 
 : 'bg-green-500/10 text-green-600 border-green-500/20'
 }`}
 >
 {apt.status}
 </Badge>
 </div>
 </div>
 </CardContent>
 </Card>
 ))
 ) : (
 <div className="py-24 text-center border-2 border-dashed border-border/40  opacity-20 flex flex-col items-center">
 <Activity size={64} className="mb-4" />
 <p className=" uppercase  text-xs">No Scheduled Engagements Found</p>
 </div>
 )}
 </div>
 </ScrollArea>

 {/* 4. MODALS */}
 <AddAppointmentModal 
 isOpen={isAddModalOpen} 
 onClose={() => setIsAddModalOpen(false)} 
 />

 <ViewAppointmentModal 
 appointment={selectedApt}
 isOpen={isViewModalOpen}
 onClose={() => setIsViewModalOpen(false)}
 onUpdate={handleUpdate}
 />
 </div>
 );
};