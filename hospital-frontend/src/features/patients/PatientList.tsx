import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Database } from 'lucide-react';

// Shadcn UI Imports
import { Button } from "@/components/ui/button";
// Card removed
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchBar } from '@/components/SearchBar';

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
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-primary rounded-3xl text-white shadow-xl shadow-primary/30 relative overflow-hidden group">
            <Database size={28} className="relative z-10" />
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </div>
          <div>
            <h2 className="text-3xl font-poppins font-black text-foreground tracking-tighter uppercase leading-none">
              Patient <span className="text-primary">Registry</span>
            </h2>
            <p className="text-[10px] font-sans font-bold text-muted-foreground uppercase tracking-[0.3em] mt-2">
              Central Hospital Care Directory • Secure Access
            </p>
          </div>
        </div>

        <Button onClick={() => navigate('register')} className="h-14 px-8 bg-primary text-white font-poppins font-black rounded-2xl hover:scale-105 active:scale-95 shadow-xl shadow-primary/20 gap-3 transition-all">
          <UserPlus size={20} />
          <span className="tracking-widest text-xs">NEW REGISTRATION</span>
        </Button>
      </div>

      {/* 2. SEARCH */}
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search by name, NIC, or record ID..."
      />

      {/* 3. TABLE AREA */}
      <ScrollArea className="h-[calc(100vh-400px)] pr-4">
        <div className="pb-10">
          <PatientTable patients={filteredPatients} />
          {filteredPatients.length === 0 && (
            <div className="py-20 text-center opacity-20 flex flex-col items-center border-2 border-dashed border-border rounded-3xl">
              <Database size={64} className="mb-4 text-muted-foreground" />
              <p className="font-poppins font-black uppercase tracking-[0.6em] text-xs">No Care Records Found</p>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="pt-8 border-t border-border/40 flex justify-between items-center opacity-30 font-sans">
        <p className="text-[9px] font-black tracking-[0.4em] uppercase">Confidential Staff Portal</p>
        <p className="text-[9px] font-black tracking-[0.4em] uppercase">Staff: ITBIN-2211-0249</p>
      </div>
    </div>
  );
};