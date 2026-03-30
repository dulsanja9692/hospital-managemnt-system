import { useNavigate } from 'react-router-dom';
import { UserPlus, ArrowLeft, ShieldCheck, Briefcase } from 'lucide-react';

export const DoctorRegistration = () => {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    alert("New medical staff record created successfully.");
    navigate('/dashboard/doctors');
  };

  return (
    <div className="max-w-5xl mx-auto animate-soft-load p-2">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div className="flex items-center gap-6 text-left">
          <div className="relative p-5 bg-white/3 rounded-4xl border border-accent/30 shadow-neon-purple">
            <UserPlus className="text-accent" size={32} />
          </div>
          <div>
            <h2 className="text-5xl font-black text-(--text-h) tracking-tighter italic uppercase">
              Staff <span className="text-accent">Registration</span>
            </h2>
            <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.4em] mt-1">
              Onboarding New Medical Personnel
            </p>
          </div>
        </div>
        
        <button 
          onClick={() => navigate('/dashboard/doctors')}
          className="flex items-center gap-2 text-accent/60 font-black uppercase tracking-widest text-[10px] hover:text-accent transition-all group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
          Back to Directory
        </button>
      </div>

      {/* REGISTRATION FORM */}
      <form 
        onSubmit={handleRegister} 
        className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white/2 backdrop-blur-2xl p-12 rounded-[3.5rem] border border-glass-border shadow-glass-inner"
      >
        {/* Personal Details */}
        <div className="space-y-8 flex flex-col items-start">
          <div className="flex items-center gap-3 text-accent border-b border-accent/20 pb-3 w-full">
            <ShieldCheck size={20} />
            <span className="font-black text-[10px] uppercase tracking-[0.3em]">Personal Identity</span>
          </div>
          
          <div className="w-full group">
            <label className="block text-[10px] font-black uppercase tracking-widest mb-3 opacity-40 group-focus-within:text-accent transition-all">Full Name</label>
            <input 
              type="text" required 
              className="w-full p-5 bg-white/3 border-b-2 border-glass-border rounded-t-2xl outline-none focus:border-accent focus:bg-accent/5 transition-all font-bold text-(--text-h) placeholder:text-white/10" 
              placeholder="DR. NAME HERE" 
            />
          </div>

          <div className="w-full group">
            <label className="block text-[10px] font-black uppercase tracking-widest mb-3 opacity-40 group-focus-within:text-accent transition-all">Contact Number</label>
            <input 
              type="tel" required 
              className="w-full p-5 bg-white/3 border-b-2 border-glass-border rounded-t-2xl outline-none focus:border-accent focus:bg-accent/5 transition-all font-bold text-(--text-h) placeholder:text-white/10" 
              placeholder="07XXXXXXXX" 
            />
          </div>
        </div>

        {/* Professional Details */}
        <div className="space-y-8 flex flex-col items-start">
          <div className="flex items-center gap-3 text-accent border-b border-accent/20 pb-3 w-full">
            <Briefcase size={20} />
            <span className="font-black text-[10px] uppercase tracking-[0.3em]">Professional Info</span>
          </div>

          <div className="w-full group">
            <label className="block text-[10px] font-black uppercase tracking-widest mb-3 opacity-40 group-focus-within:text-accent transition-all">Specialty / Department</label>
            <select className="w-full p-5 bg-white/3 border-b-2 border-glass-border rounded-t-2xl outline-none focus:border-accent focus:bg-accent/5 transition-all font-bold text-(--text-h) appearance-none cursor-pointer">
              <option value="Cardiology">CARDIOLOGY</option>
              <option value="Pediatrics">PEDIATRICS</option>
              <option value="OPD">OPD</option>
              <option value="Neurology">NEUROLOGY</option>
            </select>
          </div>

          <div className="w-full group">
            <label className="block text-[10px] font-black uppercase tracking-widest mb-3 opacity-40 group-focus-within:text-accent transition-all">SLMC License Number</label>
            <input 
              type="text" required 
              className="w-full p-5 bg-white/3 border-b-2 border-glass-border rounded-t-2xl outline-none focus:border-accent focus:bg-accent/5 transition-all font-bold text-(--text-h) placeholder:text-white/10" 
              placeholder="SLMC-XXXXX" 
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="md:col-span-2 flex flex-col sm:flex-row gap-6 pt-10 mt-6 border-t border-glass-border">
          <button 
            type="submit" 
            className="flex-1 py-6 bg-accent text-white text-sm font-black uppercase tracking-[0.3em] rounded-3xl shadow-neon-purple hover:scale-[1.02] active:scale-95 transition-all"
          >
            Save Record
          </button>
          
          <button 
            type="button" 
            onClick={() => navigate('/dashboard/doctors')}
            className="px-16 py-6 border border-glass-border text-accent text-sm font-black uppercase tracking-[0.3em] rounded-3xl hover:bg-white/5 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};