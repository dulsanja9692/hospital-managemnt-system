import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, MapPin, Phone, Cpu, Database, Zap } from 'lucide-react';

export const PatientRegistration = () => {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate high-tech save sequence
    alert("Biometric Data Uplink Successful!");
    navigate('/dashboard/patients');
  };

  return (
    <div className="max-w-5xl mx-auto animate-soft-load p-2">
      
      {/* FUTURISTIC HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div className="flex items-center gap-6 text-left">
          <div className="relative group">
            <div className="absolute inset-0 bg-accent blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative p-5 bg-white/3 rounded-4xl border border-accent/30 shadow-neon-purple">
              <Cpu className="text-accent animate-pulse-slow" size={32} />
            </div>
          </div>
          <div>
            <h2 className="text-5xl font-black text-(--text-h) tracking-tighter italic uppercase">
              New <span className="text-accent">Registration</span>
            </h2>
            <p className="text-[10px] font-bold opacity-50 uppercase tracking-[0.4em] mt-1">
              Initializing Central Patient Registry Entry
            </p>
          </div>
        </div>
        
        <button 
          onClick={() => navigate('/dashboard/patients')}
          className="flex items-center gap-2 text-accent/60 font-black uppercase tracking-widest text-[10px] hover:text-accent transition-all group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
          Return to Archive
        </button>
      </div>

      {/* REGISTRATION FORM (GLASS CARD) */}
      <form 
        onSubmit={handleRegister} 
        className="relative grid grid-cols-1 md:grid-cols-2 gap-10 bg-white/2 backdrop-blur-2xl p-12 rounded-[3.5rem] border border-glass-border shadow-glass-inner overflow-hidden"
      >
        {/* Subtle Scanning Line Effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-accent/20 to-transparent animate-scan pointer-events-none" />

        {/* IDENTITY SECTION */}
        <div className="space-y-8 flex flex-col items-start">
          <div className="flex items-center gap-3 text-accent border-b border-accent/20 pb-3 w-full">
            <ShieldCheck size={20} />
            <span className="font-black text-[10px] uppercase tracking-[0.3em]">Personal Details</span>
          </div>
          
          <div className="w-full group">
            <label className="block text-[10px] font-black uppercase tracking-widest mb-3 opacity-40 ml-1 group-focus-within:opacity-100 group-focus-within:text-accent transition-all">Full Name (with Initials)</label>
            <input 
              type="text" 
              required 
              className="w-full p-5 bg-white/3 border-b-2 border-glass-border rounded-t-2xl outline-none focus:border-accent focus:bg-accent/5 transition-all font-bold text-(--text-h) placeholder:text-white/10" 
              placeholder="ENTER FULL NAME" 
            />
          </div>

          <div className="w-full group">
            <label className="block text-[10px] font-black uppercase tracking-widest mb-3 opacity-40 ml-1 group-focus-within:opacity-100 group-focus-within:text-accent transition-all">NIC Number</label>
            <input 
              type="text" 
              required 
              className="w-full p-5 bg-white/3 border-b-2 border-glass-border rounded-t-2xl outline-none focus:border-accent focus:bg-accent/5 transition-all font-bold text-(--text-h) placeholder:text-white/10" 
              placeholder="19XXXXXXXXXX" 
            />
          </div>
        </div>

        {/* CONTACT SECTION */}
        <div className="space-y-8 flex flex-col items-start">
          <div className="flex items-center gap-3 text-accent border-b border-accent/20 pb-3 w-full">
            <Phone size={20} />
            <span className="font-black text-[10px] uppercase tracking-[0.3em]">Contact Details</span>
          </div>

          <div className="w-full group">
            <label className="block text-[10px] font-black uppercase tracking-widest mb-3 opacity-40 ml-1 group-focus-within:opacity-100 group-focus-within:text-accent transition-all">Personal Mobile Number</label>
            <input 
              type="tel" 
              required 
              className="w-full p-5 bg-white/3 border-b-2 border-glass-border rounded-t-2xl outline-none focus:border-accent focus:bg-accent/5 transition-all font-bold text-(--text-h) placeholder:text-white/10" 
              placeholder="07XXXXXXXX" 
            />
          </div>

          <div className="w-full group">
            <label className="block text-[10px] font-black uppercase tracking-widest mb-3 opacity-40 ml-1 group-focus-within:opacity-100 group-focus-within:text-accent transition-all">Emergency Contact Number</label>
            <input 
              type="text" 
              className="w-full p-5 bg-white/3 border-b-2 border-glass-border rounded-t-2xl outline-none focus:border-accent focus:bg-accent/5 transition-all font-bold text-(--text-h) placeholder:text-white/10" 
              placeholder="GUARDIAN" 
            />
          </div>
        </div>

        {/* LOCATION SECTION (FULL WIDTH) */}
        <div className="md:col-span-2 space-y-6 flex flex-col items-start pt-8">
          <div className="flex items-center gap-3 text-accent border-b border-accent/20 pb-3 w-full">
            <MapPin size={20} />
            <span className="font-black text-[10px] uppercase tracking-[0.3em]">Address</span>
          </div>
          <div className="w-full group">
            <label className="block text-[10px] font-black uppercase tracking-widest mb-3 opacity-40 ml-1 group-focus-within:opacity-100 group-focus-within:text-accent transition-all">Permanent Address</label>
            <textarea 
              required 
              rows={3} 
              className="w-full p-5 bg-white/3 border-b-2 border-glass-border rounded-t-2xl outline-none focus:border-accent focus:bg-accent/5 transition-all font-bold text-(--text-h) resize-none placeholder:text-white/10" 
              placeholder="ENTER ADDRESS"
            ></textarea>
          </div>
        </div>

        {/* FORM ACTIONS (ENHANCED) */}
        <div className="md:col-span-2 flex flex-col sm:flex-row gap-6 pt-10 mt-6 border-t border-glass-border">
          <button 
            type="submit" 
            className="group relative flex-1 py-6 bg-accent text-white text-sm font-black uppercase tracking-[0.3em] rounded-3xl shadow-neon-purple hover:scale-[1.02] active:scale-95 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative flex items-center justify-center gap-3">
               <Zap size={18} /> Confirm Registration
            </span>
          </button>
          
          <button 
            type="button" 
            onClick={() => navigate('/dashboard/patients')}
            className="px-16 py-6 border border-glass-border text-accent text-sm font-black uppercase tracking-[0.3em] rounded-3xl hover:bg-white/5 active:scale-95 transition-all"
          >
            Discard
          </button>
        </div>

        {/* Decorative Grid Icons */}
        <div className="absolute -bottom-10 -right-10 text-accent opacity-5 rotate-12 pointer-events-none">
          <Database size={240} />
        </div>
      </form>
    </div>
  );
};