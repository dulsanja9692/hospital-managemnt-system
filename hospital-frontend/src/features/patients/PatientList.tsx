import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, UserPlus, Database, Filter } from 'lucide-react';

// Shadcn UI Imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Import your new Table component
import { PatientTable, Patient } from './components/PatientTable';

const mockPatients: Patient[] = [
  { id: 'P-1001', name: 'Saman Kumara', nic: '198522334410', phone: '0712345678', status: 'Active' },
  { id: 'P-1002', name: 'Nuwanthi Silva', nic: '199512345678', phone: '0777654321', status: 'Pending' },
  { id: 'P-1003', name: 'Arjun Perera', nic: '200188997766', phone: '0701122334', status: 'Emergency' },
];

export const PatientList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = mockPatients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.nic.includes(searchTerm) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 text-left font-sans">
      
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-primary rounded-3xl text-white shadow-xl shadow-primary/30 relative overflow-hidden group">
            <Database size={28} className="relative z-10" />
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </div>
          <div>
            <h2 className="text-4xl font-black text-foreground tracking-tighter uppercase leading-none">
              Patient <span className="text-primary">Registry</span>
            </h2>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] mt-2">
              Central Hospital Management • Secure Records
            </p>
          </div>
        </div>

        <Button 
          onClick={() => navigate('register')}
          className="h-14 px-8 bg-primary text-white font-black rounded-2xl hover:scale-105 active:scale-95 shadow-xl shadow-primary/20 gap-3 transition-all"
        >
          <UserPlus size={20} />
          <span className="tracking-widest text-xs">REGISTER PATIENT</span>
        </Button>
      </div>

      {/* 2. SEARCH BAR */}
      <Card className="p-1.5 bg-card/40 backdrop-blur-xl border-border/40 rounded-[2.5rem] shadow-2xl shadow-blue-900/5">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary z-10" size={20} />
            <Input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="SEARCH BY NAME, NIC, OR SYSTEM ID..." 
              className="h-14 pl-16 pr-6 bg-transparent border-none focus-visible:ring-0 text-foreground font-bold placeholder:text-muted-foreground/40 tracking-wider text-[11px] uppercase"
            />
          </div>
          <Separator orientation="vertical" className="h-8 opacity-20" />
          <Button variant="ghost" size="icon" className="w-14 h-14 rounded-full text-muted-foreground hover:text-primary">
            <Filter size={20} />
          </Button>
        </div>
      </Card>

      {/* 3. PATIENT DATA FEED (Scrollable) */}
      <ScrollArea className="h-[calc(100vh-400px)] pr-4">
        <div className="pb-10">
          <PatientTable 
            patients={filteredPatients} 
          />
          
          {/* Empty State Integration */}
          {filteredPatients.length === 0 && (
            <div className="py-20 text-center opacity-20 flex flex-col items-center border-2 border-dashed border-border rounded-3xl">
              <Database size={64} className="mb-4 text-muted-foreground" />
              <p className="font-black uppercase tracking-[0.6em] text-xs">Zero Records found in Uplink</p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* 4. SYSTEM STATUS FOOTER */}
      <div className="pt-8 border-t border-border/40 flex justify-between items-center opacity-30">
        <p className="text-[9px] font-black tracking-[0.4em] uppercase">Security Level: Tier 1 Clearance</p>
        <p className="text-[9px] font-black tracking-[0.4em] uppercase underline underline-offset-4 decoration-primary">Encryption: AES-256 Valid</p>
      </div>
    </div>
  );
};