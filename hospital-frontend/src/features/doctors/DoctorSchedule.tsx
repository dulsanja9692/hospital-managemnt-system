import { useState } from 'react';
import { 
  Plus, Clock, Trash2, Users, ArrowRight, 
  CalendarDays, X, CheckCircle2, Zap 
} from 'lucide-react';

interface Session {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  maxPatients: number;
}

export const DoctorSchedule = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([
    { id: '1', day: 'Monday', startTime: '09:00', endTime: '12:00', maxPatients: 15 },
    { id: '2', day: 'Wednesday', startTime: '14:00', endTime: '17:00', maxPatients: 10 },
  ]);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const removeSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-12 animate-soft-load text-left p-2 min-h-screen">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-accent blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative p-5 bg-white/3 border border-accent/30 rounded-4xl text-accent shadow-neon-purple">
              <CalendarDays size={32} />
            </div>
          </div>
          <div>
            <h2 className="text-5xl font-black text-(--text-h) tracking-tighter italic uppercase">
              Shift <span className="text-accent">Schedule</span>
            </h2>
            <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.4em] mt-1">
              Manage clinical sessions and patient limits
            </p>
          </div>
        </div>
        
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="group relative px-10 py-5 bg-accent text-white font-black rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-neon-purple"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <span className="relative flex items-center gap-3 uppercase tracking-widest text-xs">
            <Plus size={22} /> Create New Session
          </span>
        </button>
      </div>

      {/* TIMELINE VIEW */}
      <div className="flex flex-col gap-6">
        {days.map((day) => {
          const daySessions = sessions.filter(s => s.day === day);
          
          return (
            <div key={day} className="group flex flex-col md:flex-row items-stretch gap-4 transition-all duration-500 hover:translate-x-2">
              
              {/* Day Label Sidebar */}
              <div className="md:w-52 bg-white/2 border border-glass-border rounded-3xl p-6 flex flex-col justify-center items-center backdrop-blur-md relative overflow-hidden group-hover:border-accent/30">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-xs font-black uppercase tracking-[0.25em] text-accent">{day}</h3>
                <span className="text-[10px] font-bold opacity-20 mt-2 uppercase tracking-widest">
                  {daySessions.length} active
                </span>
              </div>

              {/* Sessions Track */}
              <div className="flex-1 bg-white/1 border border-glass-border rounded-[2.5rem] p-4 flex flex-wrap gap-4 items-center min-h-30 backdrop-blur-sm shadow-glass-inner">
                {daySessions.map(session => (
                  <div key={session.id} className="relative group/card animate-in zoom-in-95 duration-500">
                    <div className="relative p-6 bg-white/4 border border-glass-border rounded-4xl flex items-center gap-8 hover:border-accent/40 transition-all shadow-xl backdrop-blur-lg">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-3 text-(--text-h) text-xl font-black tracking-tighter">
                          <Clock size={16} className="text-accent" />
                          {session.startTime} <ArrowRight size={14} className="opacity-20" /> {session.endTime}
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <div className="px-3 py-1 bg-accent/10 rounded-full flex items-center gap-2 border border-accent/10">
                            <Users size={12} className="text-accent" />
                            <span className="text-[9px] font-black text-accent uppercase tracking-widest">
                              {session.maxPatients} Patients Max
                            </span>
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={() => removeSession(session.id)}
                        className="p-3 bg-white/5 hover:bg-red-500/10 text-red-500/30 hover:text-red-500 rounded-xl transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}

                {daySessions.length === 0 && (
                  <div className="ml-8 text-[10px] font-black uppercase tracking-[0.5em] opacity-10 italic">
                    No scheduled sessions
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* SYSTEM FOOTER */}
      <footer className="mt-20 pt-8 border-t border-white/5 flex justify-between items-center opacity-30 italic">
        <p className="text-[9px] font-bold tracking-[0.3em]">SECURE ACCESS • MEDIFLOW HMS</p>
        <p className="text-[9px] font-bold tracking-[0.3em]">VERSION 2.4.0</p>
      </footer>

      {/* CREATE SESSION MODAL */}
      {isCreateModalOpen && (
        <CreateSessionModal onClose={() => setIsCreateModalOpen(false)} />
      )}
    </div>
  );
};

/* --- SUB-COMPONENT: CREATE SESSION MODAL --- */

const CreateSessionModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-2000 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl animate-in fade-in duration-500">
      
      {/* Background Glow Deco */}
      <div className="absolute w-96 h-96 bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-lg bg-[#020617]/80 border border-glass-border rounded-[3rem] shadow-2xl overflow-hidden backdrop-blur-3xl animate-in zoom-in-95 duration-300">
        
        {/* Modal Header */}
        <div className="p-8 border-b border-glass-border flex justify-between items-center bg-white/1">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-accent/10 rounded-xl text-accent border border-accent/20">
              <Zap size={20} />
            </div>
            <div>
              <h3 className="text-xl font-black text-(--text-h) tracking-tighter uppercase leading-none">Create Session</h3>
              <p className="text-[9px] font-bold opacity-30 uppercase tracking-[0.3em] mt-2">Configure availability for selected personnel</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl text-(--text) transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Modal Form */}
        <div className="p-10 space-y-8">
          
          <div className="space-y-3 group">
            <label className="text-[10px] font-black uppercase opacity-40 tracking-widest flex items-center gap-2 group-focus-within:text-accent transition-colors">
              <CalendarDays size={14} /> Select Weekday
            </label>
            <select className="w-full p-5 bg-white/3 border-b-2 border-glass-border rounded-t-2xl outline-none focus:border-accent transition-all font-bold text-(--text-h) appearance-none cursor-pointer">
              <option className="bg-primary">Monday</option>
              <option className="bg-primary">Tuesday</option>
              <option className="bg-primary">Wednesday</option>
              <option className="bg-primary">Thursday</option>
              <option className="bg-primary">Friday</option>
              <option className="bg-primary">Saturday</option>
              <option className="bg-primary">Sunday</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3 group">
              <label className="text-[10px] font-black uppercase opacity-40 tracking-widest flex items-center gap-2 group-focus-within:text-accent transition-colors">
                <Clock size={14} /> Start Time
              </label>
              <input type="time" className="w-full p-5 bg-white/3 border-b-2 border-glass-border rounded-t-2xl outline-none focus:border-accent font-bold text-(--text-h)" />
            </div>
            <div className="space-y-3 group">
              <label className="text-[10px] font-black uppercase opacity-40 tracking-widest flex items-center gap-2 group-focus-within:text-accent transition-colors">
                <Clock size={14} /> End Time
              </label>
              <input type="time" className="w-full p-5 bg-white/3 border-b-2 border-glass-border rounded-t-2xl outline-none focus:border-accent font-bold text-(--text-h)" />
            </div>
          </div>

          <div className="space-y-3 group">
            <label className="text-[10px] font-black uppercase opacity-40 tracking-widest flex items-center gap-2 group-focus-within:text-accent transition-colors">
              <Users size={14} /> Max Patient Capacity
            </label>
            <input 
              type="number" 
              placeholder="e.g. 15"
              className="w-full p-5 bg-white/3 border-b-2 border-glass-border rounded-t-2xl outline-none focus:border-accent font-bold text-(--text-h) placeholder:text-white/10" 
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4 pt-4">
            <button 
              className="group relative w-full py-6 bg-accent text-white font-black rounded-2xl shadow-neon-purple hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 overflow-hidden"
              onClick={onClose}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <CheckCircle2 size={18} className="relative" /> 
              <span className="relative uppercase tracking-[0.2em] text-[11px]">Save Session Settings</span>
            </button>
            <button 
              onClick={onClose}
              className="w-full py-6 border border-glass-border text-accent text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-white/5 transition-all"
            >
              Discard Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};