import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, ChevronRight, UserRound, Activity } from 'lucide-react';
import { DoctorProfileModal } from './DoctorProfileModal';

interface Doctor {
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
    <div className="flex flex-col min-h-full animate-soft-load text-left p-2 space-y-8">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-(--text-h) tracking-tighter italic uppercase">
            Medical <span className="text-accent">Staff</span>
          </h2>
          <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.3em] mt-1">
            Personnel Directory • Clinical Departments
          </p>
        </div>
        
        <button 
          onClick={() => navigate('/dashboard/doctors/add')} 
          className="group relative flex items-center gap-3 px-10 py-5 bg-accent text-white font-black rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-neon-purple"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <Plus size={22} className="relative" />
          <span className="relative uppercase tracking-widest text-xs">Add New Doctor</span>
        </button>
      </div>

      {/* Search Bar - Cyber Style */}
      <div className="flex gap-4 p-2 bg-white/2 border border-glass-border rounded-[2.5rem] backdrop-blur-xl shadow-glass-inner">
        <div className="relative flex-1">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-accent" size={20} />
          <input 
            type="text" 
            placeholder="SEARCH BY NAME, DEPARTMENT, OR ID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-16 pr-6 py-4 bg-transparent border-none outline-none text-accent font-bold placeholder:text-accent/20 tracking-widest text-xs"
          />
        </div>
      </div>

      {/* Staff Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doc) => (
            <div 
              key={doc.id} 
              onClick={() => handleOpenProfile(doc)}
              className="group relative cursor-pointer"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-accent blur-xl opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              
              <div className="relative bg-white/3 p-8 rounded-[3rem] border border-glass-border hover:border-accent/40 transition-all duration-300 backdrop-blur-sm group-hover:-translate-y-1 shadow-glass-inner">
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-accent border border-glass-border group-hover:bg-accent group-hover:text-white transition-all shadow-lg">
                    <UserRound size={32} />
                  </div>
                  <div className="pt-1">
                    <h3 className="font-black text-(--text-h) text-xl tracking-tight leading-tight group-hover:text-accent transition-colors">
                      {doc.name}
                    </h3>
                    <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em] mt-2 bg-accent/10 px-3 py-1 rounded-full w-fit">
                      {doc.dept}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-glass-border">
                  <div className="flex items-center gap-3">
                    <div className={`relative flex items-center justify-center w-3 h-3`}>
                      <span className={`absolute inset-0 rounded-full animate-ping opacity-20 ${doc.status === 'On Duty' ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className={`relative w-2 h-2 rounded-full ${doc.status === 'On Duty' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]' : 'bg-red-500/40'}`} />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${doc.status === 'On Duty' ? 'text-green-500' : 'text-red-500/60'}`}>
                      {doc.status}
                    </span>
                  </div>
                  
                  <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-accent group-hover:text-white transition-all duration-500">
                    <ChevronRight size={18} />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-24 bg-white/2 rounded-[3.5rem] border border-dashed border-glass-border flex flex-col items-center justify-center text-accent/20">
            <Activity size={64} className="mb-6 opacity-10" />
            <p className="font-black uppercase tracking-[0.5em] text-xs">Registry Mismatch • No Records Found</p>
          </div>
        )}
      </div>

      {/* Futuristic Footer */}
      <footer className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center opacity-30 italic">
        <p className="text-[9px] font-bold tracking-[0.3em]">MEDIFLOW ACCESS • {new Date().getFullYear()}</p>
        <div className="flex items-center gap-6">
          <span className="text-[9px] font-bold tracking-[0.3em]">SECURE DATA TERMINAL</span>
          <span className="text-[9px] font-bold tracking-[0.3em]">V2.4.0</span>
        </div>
      </footer>

      {/* MODAL: Conditional Rendering Logic */}
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