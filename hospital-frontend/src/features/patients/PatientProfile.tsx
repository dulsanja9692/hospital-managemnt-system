import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Edit3, ShieldCheck, Zap, 
  FileText, Fingerprint, Loader2, Plus, Activity 
} from 'lucide-react';

// Shadcn UI & Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Feature Components
import { VitalsMonitor } from "./components/VitalsMonitor";
import { AddMeetingModal } from "./components/AddMeetingModal";

// Define a quick interface for the entry to avoid 'any' errors
interface MedicalEntry {
  title: string;
  doctor: string;
  dept: string;
  status: string;
  date: string;
}

export const PatientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock Data
  const patient = {
    id: id || 'P-1001',
    name: 'Saman Kumara',
    nic: '198522334410',
    status: 'Stable',
    lastSync: '2026-04-03 09:45'
  };

  const isMedicalEntry = (entry: unknown): entry is MedicalEntry => {
    if (typeof entry !== 'object' || entry === null) return false;
    const candidate = entry as Record<string, unknown>;
    return (
      typeof candidate.title === 'string' &&
      typeof candidate.doctor === 'string' &&
      typeof candidate.dept === 'string' &&
      typeof candidate.status === 'string' &&
      typeof candidate.date === 'string'
    );
  };

  const handleAddEntry = (entry: unknown) => {
    if (!isMedicalEntry(entry)) {
      console.error("Invalid medical entry payload:", entry);
      return;
    }

    console.log("New Entry Securely Uplinked:", entry);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-2 space-y-10 text-left animate-in fade-in duration-700 pb-20 font-sans">
      
      {/* 1. TOP COMMAND BAR */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard/patients')}
          className="flex items-center gap-3 text-primary/60 font-black uppercase tracking-[0.3em] text-[10px] hover:text-primary transition-all group p-0 h-auto bg-transparent"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
          Back to Registry
        </Button>

        <div className="flex gap-4">
          <Button 
            variant="outline"
            onClick={() => navigate(`/dashboard/patients/edit/${id}`)}
            className="h-12 px-8 border-white/20 rounded-2xl text-primary font-black uppercase tracking-widest text-[10px] hover:bg-primary/5 transition-all"
          >
            <Edit3 size={16} className="mr-2" /> Modify Profile
          </Button>
          <Button className="h-12 px-8 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/30 uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all">
            <FileText size={16} className="mr-2" /> Generate Report
          </Button>
        </div>
      </div>

      {/* 2. MAIN HUD LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: BIOMETRIC IDENTITY CARD */}
        <Card className="lg:col-span-1 rounded-[3rem] border-white/20 bg-card/40 backdrop-blur-3xl shadow-2xl overflow-hidden relative group">
           <div className="absolute top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
           
           <CardContent className="p-10 flex flex-col items-center relative z-10">
              <Avatar className="w-44 h-44 rounded-[2.5rem] border-4 border-background shadow-2xl mb-8 group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                <AvatarFallback className="bg-white/40 dark:bg-slate-800/40 text-primary">
                  <Fingerprint size={80} className="opacity-40 animate-pulse" />
                </AvatarFallback>
                <div className="absolute inset-0 bg-linear-to-t from-primary/20 to-transparent pointer-events-none" />
              </Avatar>
              
              <h2 className="text-3xl font-black text-foreground tracking-tighter text-center uppercase leading-none">
                {patient.name}
              </h2>
              <Badge variant="secondary" className="mt-4 px-4 py-1 text-[10px] font-black text-primary tracking-[0.4em] bg-primary/10 hover:bg-primary/10">
                REF_ID: {patient.id}
              </Badge>

              <div className="mt-10 w-full pt-8 border-t border-primary/10 space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Registry NIC</span>
                  <span className="font-mono text-xs font-bold text-foreground">{patient.nic}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Signal Status</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
                    <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">{patient.status}</span>
                  </div>
                </div>
              </div>
           </CardContent>
        </Card>

        {/* RIGHT COLUMN: VITALS & DIAGNOSTIC HISTORY */}
        <div className="lg:col-span-2 space-y-8">
          
          <VitalsMonitor />

          <Card className="rounded-[3rem] border-white/20 bg-card/40 backdrop-blur-3xl p-10 relative overflow-hidden shadow-2xl shadow-blue-900/5 border">
            <CardContent className="p-0 space-y-8">
              <div className="flex items-center justify-between mb-2 border-b border-primary/10 pb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary">
                    <Zap size={20} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-black text-foreground tracking-tighter uppercase leading-none">Recent Diagnostics</h3>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.3em] mt-2">System Sync: {patient.lastSync}</p>
                  </div>
                </div>
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="h-10 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all gap-2 px-6"
                >
                  <Plus size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">Add Entry</span>
                </Button>
              </div>

              <div className="space-y-4 relative z-10">
                {[
                  { date: '24 APR 2026', title: 'Cardiology Follow-up', Dr: 'Dr. Saman Perera', type: 'Clinical' },
                  { date: '12 MAR 2026', title: 'Blood Chemistry Panel', Dr: 'Lab-Core-01', type: 'Diagnostic' }
                ].map((entry, idx) => (
                  <div key={idx} className="flex items-center gap-6 p-5 bg-white/40 dark:bg-white/5 border border-white/10 rounded-3xl hover:border-primary/40 transition-all cursor-pointer group shadow-sm">
                    <div className="text-center w-24">
                      <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{entry.date}</div>
                    </div>
                    <div className="flex-1 border-l border-primary/10 pl-6 text-left">
                      <h4 className="text-sm font-black text-foreground uppercase tracking-tight">{entry.title}</h4>
                      <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Authorized: {entry.Dr}</p>
                    </div>
                    <Badge variant="outline" className="px-4 py-1.5 rounded-full text-[8px] font-black uppercase group-hover:bg-primary group-hover:text-white transition-all border-primary/20">
                      {entry.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>

            <Activity size={240} className="absolute -bottom-10 -right-10 text-primary opacity-5 rotate-12 pointer-events-none" />
          </Card>
        </div>
      </div>

      <AddMeetingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAddEntry} 
      />

      <footer className="mt-12 pt-8 border-t border-primary/5 flex justify-between items-center opacity-40">
        <div className="flex items-center gap-4">
          <ShieldCheck size={14} className="text-primary" />
          <p className="text-[9px] font-bold text-foreground tracking-[0.3em] uppercase">Encrypted Connection • Staff ID: ITBIN-2211-0249</p>
        </div>
        <div className="flex items-center gap-2">
          <Loader2 size={14} className="animate-spin text-primary" />
          <p className="text-[9px] font-bold text-foreground tracking-[0.3em] uppercase underline decoration-primary">Live Bio-Feed Stream</p>
        </div>
      </footer>
    </div>
  );
};