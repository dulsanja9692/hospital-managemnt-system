import { Plus, Clock, Stethoscope, Loader2, ClipboardList } from 'lucide-react';
import { useState } from 'react';

export const TimelineAppend = ({ onAdd }: { onAdd: (entry: any) => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate a secure medical record uplink
    setTimeout(() => {
      setIsSubmitting(false);
      onAdd({ status: 'success' });
    }, 1200);
  };

  return (
    <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/20 shadow-2xl shadow-blue-900/5 text-left transition-all duration-500">
      
      {/* 1. COMPONENT HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-black text-foreground tracking-tight flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl text-primary">
            <Clock size={24} />
          </div>
          Append Medical Event
        </h3>
        <span className="text-[10px] font-black bg-primary/10 text-primary px-4 py-1.5 rounded-full uppercase tracking-widest border border-primary/10">
          Digital Timeline Entry
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT COLUMN: Entry Details */}
        <div className="space-y-6">
          <div className="group">
            <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest ml-1 group-focus-within:text-primary transition-colors">
              Reason for Consultation
            </label>
            <input 
              type="text" 
              placeholder="e.g., Post-Op Follow-up" 
              className="w-full mt-2 p-4 bg-background/50 border border-border rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary font-bold text-foreground transition-all placeholder:text-muted-foreground/30"
            />
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1 group">
              <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest ml-1 group-focus-within:text-primary transition-colors">
                Attending Specialist
              </label>
              <div className="relative mt-2">
                <Stethoscope size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Dr. Silva" 
                  className="w-full pl-12 pr-4 py-4 bg-background/50 border border-border rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary font-bold text-foreground transition-all" 
                />
              </div>
            </div>
            <div className="w-1/3">
              <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest ml-1">Unit / Dept</label>
              <select className="w-full mt-2 p-4 bg-background/50 border border-border rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary font-bold appearance-none cursor-pointer text-foreground transition-all">
                <option>OPD</option>
                <option>LAB</option>
                <option>ICU</option>
                <option>ENT</option>
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Clinical Observations */}
        <div className="flex flex-col group">
          <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest ml-1 group-focus-within:text-primary transition-colors">
            Clinical Observations & Prescription Updates
          </label>
          <textarea 
            rows={5} 
            placeholder="Initialize diagnostic data stream..." 
            className="flex-1 mt-2 p-5 bg-background/50 border border-border rounded-3xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary resize-none transition-all text-foreground font-medium placeholder:text-muted-foreground/30"
          ></textarea>
        </div>
      </div>

      {/* 2. ACTION BUTTON */}
      <button 
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full mt-8 py-5 bg-primary text-white font-black rounded-[1.5rem] shadow-xl shadow-primary/30 hover:bg-blue-600 hover:shadow-primary/50 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={24} />
            <span>Syncing Timeline...</span>
          </>
        ) : (
          <>
            <Plus size={24} className="group-hover:rotate-90 transition-transform" />
            <span className="tracking-tight">ADD TO PATIENT TIMELINE</span>
          </>
        )}
      </button>

      {/* Decorative Branding */}
      <div className="mt-6 flex justify-center items-center gap-2 opacity-20">
        <ClipboardList size={12} />
        <span className="text-[8px] font-bold uppercase tracking-[0.4em]">Secure Data Uplink Stream</span>
      </div>
    </div>
  );
};