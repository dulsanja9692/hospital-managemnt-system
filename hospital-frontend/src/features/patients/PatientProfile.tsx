import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Edit3, Activity, Droplets, Scale, 
  Ruler, Thermometer, ShieldAlert, Zap, Cpu, Fingerprint 
} from 'lucide-react';

export const PatientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock Biometric Data
  const patient = {
    id: id || 'P-1001',
    name: 'Saman Kumara',
    nic: '198522334410',
    blood: 'B+',
    weight: '72kg',
    height: '175cm',
    temp: '36.8°C',
    status: 'Stable',
    lastSync: '2026-03-29 21:45'
  };

  return (
    <div className="max-w-7xl mx-auto animate-soft-load p-2 space-y-10 text-left">
      
      {/* TOP COMMAND BAR */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <button 
          onClick={() => navigate('/dashboard/patients')}
          className="flex items-center gap-3 text-accent/60 font-black uppercase tracking-[0.3em] text-[10px] hover:text-accent transition-all group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
          Back
        </button>

        <div className="flex gap-4">
          <button 
            onClick={() => navigate(`/dashboard/patients/edit/${id}`)}
            className="flex items-center gap-3 px-8 py-4 bg-white/3 border border-glass-border rounded-2xl text-accent font-black uppercase tracking-widest text-[10px] hover:bg-accent hover:text-white transition-all shadow-glass-inner"
          >
            <Edit3 size={16} /> Modify Data
          </button>
          <button className="px-8 py-4 bg-accent text-white font-black rounded-2xl shadow-neon-purple uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all">
            Generate Report
          </button>
        </div>
      </div>

      {/* MAIN HUD LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: BIOMETRIC IDENTITY */}
        <div className="lg:col-span-1 space-y-8">
          <div className="relative group p-10 bg-white/2 border border-glass-border rounded-[3.5rem] backdrop-blur-3xl overflow-hidden shadow-glass-inner">
            {/* Rotating Scanning Circle */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-48 h-48 border-2 border-dashed border-accent/20 rounded-full animate-[spin_10s_linear_infinite]" />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-40 h-40 bg-white/3 border-4 border-code-bg rounded-full flex items-center justify-center text-accent shadow-2xl mb-8 overflow-hidden relative">
                <Fingerprint size={80} className="opacity-40 animate-pulse" />
                <div className="absolute inset-0 bg-linear-to-t from-accent/20 to-transparent" />
              </div>
              
              <h2 className="text-3xl font-black text-(--text-h) tracking-tighter text-center uppercase leading-tight">
                {patient.name}
              </h2>
              <span className="mt-2 text-[10px] font-black text-accent tracking-[0.5em] opacity-60">
                PARIENT ID: {patient.id}
              </span>

              <div className="mt-10 w-full pt-8 border-t border-glass-border space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black opacity-30 uppercase tracking-widest">Registry NIC</span>
                  <span className="font-mono text-xs text-(--text-h)">{patient.nic}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black opacity-30 uppercase tracking-widest">Signal Status</span>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    <span className="text-[10px] font-black text-green-500 uppercase">{patient.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: VITAL STREAM & ANALYTICS */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* VITALS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Blood Group', value: patient.blood, icon: Droplets, color: 'text-red-500' },
              { label: 'Body Mass', value: patient.weight, icon: Scale, color: 'text-blue-500' },
              { label: 'Height Index', value: patient.height, icon: Ruler, color: 'text-accent' },
              { label: 'Core Temp', value: patient.temp, icon: Thermometer, color: 'text-orange-500' }
            ].map((stat, i) => (
              <div key={stat.label} className="p-6 bg-white/2 border border-glass-border rounded-[2.5rem] hover:border-accent/30 transition-all group shadow-glass-inner animate-in slide-in-from-bottom-4" style={{ animationDelay: `${i * 100}ms` }}>
                <stat.icon className={`${stat.color} mb-4 opacity-60 group-hover:scale-110 transition-transform`} size={24} />
                <div className="text-2xl font-black text-(--text-h) tracking-tighter leading-none mb-2">{stat.value}</div>
                <div className="text-[8px] font-black uppercase tracking-[0.2em] opacity-40">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* MEDICAL HISTORY / TIMELINE GLASS CARD */}
          <div className="bg-white/2 border border-glass-border rounded-[3.5rem] p-10 relative overflow-hidden shadow-glass-inner">
             {/* Background Tech Icons */}
            <div className="absolute top-10 right-10 text-accent opacity-5">
              <Activity size={180} />
            </div>

            <div className="flex items-center gap-4 mb-10 border-b border-glass-border pb-6">
              <div className="p-3 bg-accent/10 rounded-xl text-accent">
                <Zap size={20} />
              </div>
              <div>
                <h3 className="text-xl font-black text-(--text-h) tracking-tighter uppercase">Recent Diagnostics</h3>
                <p className="text-[9px] font-bold opacity-30 uppercase tracking-[0.3em]">Last synchronized: {patient.lastSync}</p>
              </div>
            </div>

            <div className="space-y-6 relative z-10">
              {/* Mock Timeline Items */}
              {[
                { date: '24 MAR 2026', title: 'OPD Consultation', Dr: 'Dr. Saman Perera', type: 'General' },
                { date: '12 FEB 2026', title: 'Blood Chemistry Panel', Dr: 'Lab-Core-01', type: 'Diagnostic' }
              ].map((entry, idx) => (
                <div key={idx} className="flex items-center gap-6 p-6 bg-white/2 border border-glass-border rounded-3xl hover:bg-white/5 transition-all cursor-pointer group">
                  <div className="text-center w-24">
                    <div className="text-[10px] font-black text-accent">{entry.date}</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-black text-(--text-h) uppercase tracking-tight">{entry.title}</h4>
                    <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mt-1">Authorized By: {entry.Dr}</p>
                  </div>
                  <div className="px-4 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] font-black uppercase opacity-40 group-hover:opacity-100 group-hover:text-accent group-hover:border-accent transition-all">
                    {entry.type}
                  </div>
                </div>
              ))}
              
              <button className="w-full py-4 border-2 border-dashed border-glass-border rounded-3xl text-[10px] font-black uppercase tracking-[0.4em] opacity-20 hover:opacity-100 hover:border-accent hover:text-accent transition-all">
                + Append History
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SYSTEM SECURITY FOOTER */}
      <footer className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center opacity-30 italic">
        <div className="flex items-center gap-4">
          <ShieldAlert size={14} className="text-accent" />
          <p className="text-[9px] font-bold tracking-[0.3em]">ENCRYPTED BIOMETRIC STREAM • SESSION ACTIVE</p>
        </div>
        <div className="flex items-center gap-2">
          <Cpu size={14} />
          <p className="text-[9px] font-bold tracking-[0.3em]">ST-092 CORE</p>
        </div>
      </footer>
    </div>
  );
};