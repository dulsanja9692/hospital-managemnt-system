import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, ChevronRight, UserRound, Activity, Database } from 'lucide-react';

// Shadcn UI Imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

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
    <div className="flex flex-col min-h-full animate-in fade-in duration-700 text-left p-2 space-y-8 font-sans">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-primary rounded-3xl text-white shadow-xl shadow-primary/30 relative group overflow-hidden">
            <Database size={28} className="relative z-10" />
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </div>
          <div>
            <h2 className="text-4xl font-black text-foreground tracking-tighter uppercase leading-none italic">
              Medical <span className="text-primary">Staff</span>
            </h2>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] mt-2">
              Personnel Directory • Clinical Departments
            </p>
          </div>
        </div>
        
        <Button 
          onClick={() => navigate('/dashboard/doctors/add')} 
          className="h-14 px-10 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all gap-3"
        >
          <Plus size={20} />
          <span className="uppercase tracking-widest text-[10px]">Add New Doctor</span>
        </Button>
      </div>

      {/* 2. Cyber Search Terminal */}
      <Card className="p-1.5 bg-card/40 backdrop-blur-xl border-border/40 rounded-[2.5rem] shadow-2xl">
        <div className="relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary z-10" size={20} />
          <Input 
            type="text" 
            placeholder="SEARCH BY NAME, DEPARTMENT, OR ID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-14 pl-16 bg-transparent border-none focus-visible:ring-0 text-foreground font-bold placeholder:text-muted-foreground/30 tracking-widest text-[11px] uppercase"
          />
        </div>
      </Card>

      {/* 3. Staff Cards Grid */}
      <ScrollArea className="h-[calc(100vh-350px)] pr-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doc) => (
              <Card 
                key={doc.id} 
                onClick={() => handleOpenProfile(doc)}
                className="group relative cursor-pointer border-border/40 bg-card/60 backdrop-blur-md rounded-[3rem] hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 shadow-sm"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-5">
                    <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                      <UserRound size={32} />
                    </div>
                    <div className="pt-1 flex-1">
                      <h3 className="font-black text-foreground text-xl tracking-tighter leading-tight group-hover:text-primary transition-colors uppercase">
                        {doc.name}
                      </h3>
                      <Badge variant="secondary" className="mt-2 bg-primary/5 text-primary border-primary/10 font-black uppercase text-[9px] tracking-widest px-3">
                        {doc.dept}
                      </Badge>
                    </div>
                  </div>
                  
                  <Separator className="my-6 bg-border/40" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative flex items-center justify-center w-3 h-3">
                        <span className={`absolute inset-0 rounded-full animate-ping opacity-20 ${doc.status === 'On Duty' ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className={`relative w-2 h-2 rounded-full ${doc.status === 'On Duty' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]' : 'bg-red-500/40'}`} />
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${doc.status === 'On Duty' ? 'text-green-600' : 'text-red-500/60'}`}>
                        {doc.status}
                      </span>
                    </div>
                    
                    <div className="p-3 bg-muted/50 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm border border-border/40">
                      <ChevronRight size={18} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full py-24 border-2 border-dashed border-border/40 rounded-[3.5rem] flex flex-col items-center justify-center text-muted-foreground/40">
              <Activity size={64} className="mb-6 opacity-10 animate-pulse" />
              <p className="font-black uppercase tracking-[0.5em] text-xs">Registry Mismatch • No Records Found</p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* 4. Footer Terminal */}
      <footer className="pt-8 border-t border-border/40 flex justify-between items-center opacity-30 italic">
        <p className="text-[9px] font-black tracking-[0.4em] uppercase">Mediflow Access • {new Date().getFullYear()}</p>
        <div className="flex items-center gap-6">
          <span className="text-[9px] font-black tracking-[0.4em] uppercase">Secure Data Terminal</span>
          <span className="text-[9px] font-black tracking-[0.4em] uppercase underline decoration-primary">V2.4.0_STABLE</span>
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