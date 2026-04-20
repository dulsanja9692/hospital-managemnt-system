import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ChevronRight, UserRound, Activity, Database } from 'lucide-react';

// Shadcn UI Imports
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SearchBar } from '@/components/SearchBar';

// Feature Components
import { DoctorProfileModal } from './DoctorProfileModal';

export interface Doctor {
 id: string;
 name: string;
 dept: string;
 status: string;
 license?: string;
 phone?: string;
}

export const DoctorList = () => {
 const navigate = useNavigate();
 const [searchQuery, setSearchQuery] = useState('');
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

 const [doctors, setDoctors] = useState<Doctor[]>([
 { id: 'D-201', name: 'Dr. Saman Perera', dept: 'Cardiology', status: 'On Duty', license: 'SLMC-88290', phone: '071 234 5678' },
 { id: 'D-202', name: 'Dr. Anna Silva', dept: 'Pediatrics', status: 'Off Duty', license: 'SLMC-11204', phone: '077 112 2334' },
 ]);

 const filteredDoctors = doctors.filter(doc => 
 doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
 doc.dept.toLowerCase().includes(searchQuery.toLowerCase())
 );

 const handleOpenProfile = (doc: Doctor) => {
 setSelectedDoctor(doc);
 setIsModalOpen(true);
 };

 const handleUpdateDoctor = (updated: Doctor) => {
 setDoctors(prev => prev.map(d => d.id === updated.id ? updated : d));
 setIsModalOpen(false);
 };

 const handleDeleteDoctor = (id: string) => {
 setDoctors(prev => prev.filter(d => d.id !== id));
 setIsModalOpen(false);
 };

 return (
 <div className="flex flex-col min-h-full animate-in fade-in duration-700 text-left p-2 space-y-8 font-sans antialiased">
 
 {/* 1. HEADER SECTION */}
 <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
 <div className="flex items-center gap-5 text-left">
 <div className="p-4 bg-primary  text-white  relative group overflow-hidden">
 <Database size={28} className="relative z-10" />
 <div className="absolute inset-0 bg-card translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
 </div>
 <div>
 <h2 className="text-2xl font-poppins  text-foreground  uppercase leading-none">
 Medical <span className="text-primary">Team</span>
 </h2>
 <p className="text-[10px] font-sans  text-muted-foreground uppercase  mt-2">
 Clinical Team Directory • Specialist Registry
 </p>
 </div>
 </div>
 
 <Button 
 onClick={() => navigate('/dashboard/doctors/add')} 
 className="h-14 px-10 bg-primary text-white font-poppins    hover:scale-105 active:scale-95 transition-all gap-3"
 >
 <Plus size={20} />
 <span className="uppercase  text-[10px]">Onboard New Specialist</span>
 </Button>
 </div>

 {/* 2. SEARCH INTERFACE */}
 <SearchBar
 value={searchQuery}
 onChange={setSearchQuery}
 placeholder="Search by name, specialty, or ID..."
 />

 {/* 3. STAFF CARDS GRID */}
 <ScrollArea className="h-[calc(100vh-350px)] pr-4">
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
 {filteredDoctors.length > 0 ? (
 filteredDoctors.map((doc) => (
 <Card 
 key={doc.id} 
 onClick={() => handleOpenProfile(doc)}
 className="group relative cursor-pointer border-border bg-card   hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 "
 >
 <CardContent className="p-8">
 <div className="flex items-start gap-5 text-left">
 <div className="w-16 h-16 bg-primary/10  flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-500 ">
 <UserRound size={32} />
 </div>
 <div className="pt-1 flex-1">
 <h3 className="font-poppins  text-foreground text-xl  leading-tight group-hover:text-primary transition-colors uppercase">
 {doc.name}
 </h3>
 <Badge variant="secondary" className="mt-2 bg-primary/5 text-primary border-primary/10 font-sans  uppercase text-[9px]  px-3">
 {doc.dept}
 </Badge>
 </div>
 </div>
 
 <Separator className="my-6 bg-border/40" />

 <div className="flex items-center justify-between">
 <div className="flex items-center gap-3">
 <div className="relative flex items-center justify-center w-3 h-3">
 <span className={`absolute inset-0  animate-ping opacity-20 ${doc.status === 'On Duty' ? 'bg-green-500' : 'bg-red-500'}`} />
 <span className={`relative w-2 h-2  ${doc.status === 'On Duty' ? 'bg-green-500 ' : 'bg-red-500/40'}`} />
 </div>
 <span className={`text-[10px] font-poppins  uppercase  ${doc.status === 'On Duty' ? 'text-green-600' : 'text-red-500/60'}`}>
 {doc.status}
 </span>
 </div>
 
 <div className="p-3 bg-muted  group-hover:bg-primary group-hover:text-white transition-all duration-500 border border-border">
 <ChevronRight size={18} />
 </div>
 </div>
 </CardContent>
 </Card>
 ))
 ) : (
 <div className="col-span-full py-24 border-2 border-dashed border-border  flex flex-col items-center justify-center text-muted-foreground/40 text-center">
 <Activity size={64} className="mb-6 opacity-10 animate-pulse" />
 <p className="font-poppins  uppercase  text-xs">No Team Members Found</p>
 </div>
 )}
 </div>
 </ScrollArea>

 {/* 4. FOOTER TERMINAL */}
 <footer className="pt-8 border-t border-border flex justify-between items-center opacity-30 font-sans">
 <p className="text-[9px]   uppercase">Mediflow Access • {new Date().getFullYear()}</p>
 <div className="flex items-center gap-6">
 <span className="text-[9px]   uppercase">Authorized Personnel Access</span>
 <Badge variant="outline" className="text-[8px] font-poppins   uppercase border-primary/20">V2.4.0_STABLE</Badge>
 </div>
 </footer>

 {/* MODAL Integration */}
 {isModalOpen && selectedDoctor && (
 <DoctorProfileModal 
 doctor={selectedDoctor} 
 onClose={() => setIsModalOpen(false)} 
 onUpdate={handleUpdateDoctor}
 onDelete={handleDeleteDoctor}
 />
 )}
 </div>
 );
};