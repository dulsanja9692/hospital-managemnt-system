import { X, Clock, Users, Calendar, CheckCircle2, Zap } from 'lucide-react';

export const CreateSessionModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-2000 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl animate-in fade-in duration-500">
      
      {/* GLOWING BACKGROUND DECORATION */}
      <div className="absolute w-96 h-96 bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-lg bg-[#020617]/90 border border-glass-border rounded-[3rem] shadow-2xl overflow-hidden backdrop-blur-3xl animate-in zoom-in-95 duration-300">
        
        {/* HEADER AREA */}
        <div className="p-8 border-b border-glass-border flex justify-between items-center bg-white/2">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-accent/10 rounded-xl text-accent border border-accent/20">
              <Zap size={20} />
            </div>
            <div>
              <h3 className="text-xl font-black text-(--text-h) tracking-tighter uppercase leading-none">New Session</h3>
              <p className="text-[9px] font-bold opacity-30 uppercase tracking-[0.3em] mt-2">Configure daily clinical availability</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl text-(--text) transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* FORM BODY */}
        <div className="p-10 space-y-8">
          
          {/* DAY SELECTION */}
          <div className="space-y-3 group">
            <label className="text-[10px] font-black uppercase opacity-40 tracking-widest flex items-center gap-2 group-focus-within:text-accent transition-colors">
              <Calendar size={14} /> Select Weekday
            </label>
            <div className="relative">
              <select className="w-full p-5 bg-white/3 border-b-2 border-glass-border rounded-t-2xl outline-none focus:border-accent transition-all font-bold text-(--text-h) appearance-none cursor-pointer">
                {/* FIX: Solid background on options prevents the OS "White Background" bug */}
                <option className="bg-[#0f172a] text-white">Monday</option>
                <option className="bg-[#0f172a] text-white">Tuesday</option>
                <option className="bg-[#0f172a] text-white">Wednesday</option>
                <option className="bg-[#0f172a] text-white">Thursday</option>
                <option className="bg-[#0f172a] text-white">Friday</option>
                <option className="bg-[#0f172a] text-white">Saturday</option>
                <option className="bg-[#0f172a] text-white">Sunday</option>
              </select>
              
              {/* CUSTOM ARROW: Replaces the one hidden by appearance-none */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 group-focus-within:opacity-100 group-focus-within:text-accent transition-all">
                <div className="w-2 h-2 border-r-2 border-b-2 border-current rotate-45" />
              </div>
            </div>
          </div>

          {/* TIME RANGE */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3 group">
              <label className="text-[10px] font-black uppercase opacity-40 tracking-widest flex items-center gap-2 group-focus-within:text-accent transition-colors">
                <Clock size={14} /> Start Time
              </label>
              <input 
                type="time" 
                className="w-full p-5 bg-white/3 border-b-2 border-glass-border rounded-t-2xl outline-none focus:border-accent font-bold text-(--text-h) scheme-dark" 
              />
            </div>
            <div className="space-y-3 group">
              <label className="text-[10px] font-black uppercase opacity-40 tracking-widest flex items-center gap-2 group-focus-within:text-accent transition-colors">
                <Clock size={14} /> End Time
              </label>
              <input 
                type="time" 
                className="w-full p-5 bg-white/3 border-b-2 border-glass-border rounded-t-2xl outline-none focus:border-accent font-bold text-(--text-h) scheme-dark" 
              />
            </div>
          </div>

          {/* PATIENT LIMIT */}
          <div className="space-y-3 group">
            <label className="text-[10px] font-black uppercase opacity-40 tracking-widest flex items-center gap-2 group-focus-within:text-accent transition-colors">
              <Users size={14} /> Max Patients
            </label>
            <input 
              type="number" 
              placeholder="e.g. 15"
              className="w-full p-5 bg-white/3 border-b-2 border-glass-border rounded-t-2xl outline-none focus:border-accent font-bold text-(--text-h) placeholder:text-white/10" 
            />
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col gap-4 pt-4">
            <button 
              className="group relative w-full py-6 bg-accent text-white font-black rounded-2xl shadow-neon-purple hover:scale-[1.02] active:scale-95 transition-all overflow-hidden"
              onClick={onClose}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-[11px]">
                <CheckCircle2 size={18} /> Initialize Session
              </span>
            </button>
            <button 
              onClick={onClose}
              className="w-full py-6 border border-glass-border text-accent/60 font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl hover:bg-white/5 transition-all"
            >
              Discard Changes
            </button>
          </div>
        </div>

        {/* FOOTER DECO */}
        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/20 blur-3xl rounded-full pointer-events-none" />
      </div>
    </div>
  );
};