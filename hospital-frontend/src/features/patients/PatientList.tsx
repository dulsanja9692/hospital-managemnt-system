import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, UserPlus, ChevronRight, Activity, Fingerprint, Database } from 'lucide-react';

const mockPatients = [
  { id: 'P-1001', name: 'Saman Kumara', nic: '198522334410', phone: '0712345678', status: 'Active' },
  { id: 'P-1002', name: 'Nuwanthi Silva', nic: '199512345678', phone: '0777654321', status: 'Pending' },
  { id: 'P-1003', name: 'Arjun Perera', nic: '200188997766', phone: '0701122334', status: 'Active' },
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
    <div className="space-y-10 animate-soft-load text-left p-2">
      {/* Header with Futuristic Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-white/3 border border-accent/30 rounded-4xl text-accent shadow-neon-purple animate-pulse-slow">
            <Database size={28} />
          </div>
          <div>
            <h2 className="text-5xl font-black text-(--text-h) tracking-tighter italic uppercase">
              Patient <span className="text-accent">DETAILS</span>
            </h2>
            <p className="text-[10px] font-bold opacity-50 uppercase tracking-[0.3em] mt-1">
              Neural Database • Central Records v4.0
            </p>
          </div>
        </div>

        <button 
          onClick={() => navigate('/dashboard/patients/register')}
          className="group relative flex items-center justify-center gap-3 px-10 py-5 bg-accent text-white font-black rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-neon-purple"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <UserPlus size={22} className="relative" />
          <span className="relative">ADD NEW PATIENT</span>
        </button>
      </div>

      {/* Futuristic Search Bar */}
      <div className="flex gap-4 p-2 bg-white/2 border border-glass-border rounded-[2.5rem] backdrop-blur-xl shadow-glass-inner">
        <div className="relative flex-1">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-accent" size={20} />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="SCAN BY NAME, NIC, OR SYSTEM ID..." 
            className="w-full pl-16 pr-6 py-5 bg-transparent border-none outline-none text-accent font-bold placeholder:text-accent/30 tracking-widest text-xs"
          />
        </div>
        <button className="px-6 border-l border-glass-border text-accent/50 hover:text-accent transition-colors">
          <Filter size={20} />
        </button>
      </div>

      {/* Holographic List Container */}
      <div className="space-y-4">
        {filteredPatients.map((patient) => (
          <div 
            key={patient.id} 
            onClick={() => navigate(`/dashboard/patients/${patient.id}`)}
            className="group relative cursor-pointer"
          >
            {/* Hover Glow Background */}
            <div className="absolute inset-0 bg-accent blur-xl opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
            
            <div className="relative flex flex-col md:flex-row items-center gap-6 p-6 bg-white/3 border border-glass-border rounded-4xl hover:border-accent/40 transition-all duration-300 backdrop-blur-sm group-hover:translate-x-2">
              
              {/* Biometric ID Badge */}
              <div className="flex items-center gap-4 md:w-48">
                <div className="p-3 bg-accent/10 border border-accent/20 rounded-xl text-accent">
                  <Fingerprint size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-accent/40 uppercase tracking-tighter">System ID</span>
                  <span className="font-mono text-xs font-bold text-accent">{patient.id}</span>
                </div>
              </div>

              {/* Patient Core Info */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-black text-(--text-h) tracking-tight group-hover:text-accent transition-colors">
                  {patient.name}
                </h3>
                <div className="flex items-center justify-center md:justify-start gap-4 mt-1 opacity-50">
                  <span className="text-[10px] font-bold tracking-widest uppercase">NIC: {patient.nic}</span>
                  <span className="w-1 h-1 bg-white/20 rounded-full" />
                  <span className="text-[10px] font-bold tracking-widest uppercase">MOB: {patient.phone}</span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-8">
                <div className="flex flex-col items-end">
                  <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border ${
                    patient.status === 'Active' 
                      ? 'bg-green-500/10 border-green-500/20 text-green-500' 
                      : 'bg-orange-500/10 border-orange-500/20 text-orange-500'
                  }`}>
                    <Activity size={12} className={patient.status === 'Active' ? 'animate-pulse' : ''} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{patient.status}</span>
                  </div>
                </div>
                
                <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-accent group-hover:text-white transition-all duration-500">
                  <ChevronRight size={20} />
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredPatients.length === 0 && (
          <div className="py-20 text-center opacity-20 flex flex-col items-center">
            <Activity size={48} className="mb-4" />
            <p className="font-black uppercase tracking-[0.5em] text-xs">Zero Matches in Registry</p>
          </div>
        )}
      </div>

      {/* System Footer */}
      <footer className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center opacity-30 italic">
        <p className="text-[9px] font-bold tracking-[0.3em]">SECURE ACCESS • {new Date().getFullYear()}</p>
        <p className="text-[9px] font-bold tracking-[0.3em]">ENCRYPTED STREAM</p>
      </footer>
    </div>
  );
};