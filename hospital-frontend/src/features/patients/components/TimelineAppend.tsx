import { Plus, Clock, Stethoscope, Loader2, ClipboardList } from 'lucide-react';
import { useState } from 'react';

export const TimelineAppend = ({ onAdd }: { onAdd: (entry: unknown) => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/20 shadow-2xl text-left transition-all duration-500 font-sans">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-poppins font-black text-foreground tracking-tight flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl text-primary">
            <Clock size={24} />
          </div>
          Clinical Timeline Update
        </h3>
        <span className="text-[10px] font-poppins font-black bg-primary/10 text-primary px-4 py-1.5 rounded-full uppercase tracking-widest border border-primary/10">
          Patient Journey Note
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="group">
            <label className="text-[10px] font-poppins font-black uppercase text-muted-foreground tracking-widest ml-1 group-focus-within:text-primary transition-colors">
              Nature of Consultation
            </label>
            <input type="text" placeholder="e.g., Post-Op Recovery Check" className="w-full mt-2 p-4 bg-background/50 border border-border rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary font-bold text-foreground transition-all" />
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1 group">
              <label className="text-[10px] font-poppins font-black uppercase text-muted-foreground tracking-widest ml-1 group-focus-within:text-primary transition-colors">
                Specialist in Charge
              </label>
              <div className="relative mt-2">
                <Stethoscope size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary" />
                <input type="text" placeholder="Dr. Silva" className="w-full pl-12 pr-4 py-4 bg-background/50 border border-border rounded-2xl outline-none font-bold text-foreground transition-all" />
              </div>
            </div>
            <div className="w-1/3">
              <label className="text-[10px] font-poppins font-black uppercase text-muted-foreground tracking-widest ml-1">Specialty Unit</label>
              <select className="w-full mt-2 p-4 bg-background/50 border border-border rounded-2xl outline-none font-bold cursor-pointer text-foreground transition-all">
                <option>OPD</option>
                <option>Cardiac</option>
                <option>Wellness</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col group">
          <label className="text-[10px] font-poppins font-black uppercase text-muted-foreground tracking-widest ml-1 group-focus-within:text-primary">
            Clinical Observations & Health Insights
          </label>
          <textarea rows={5} placeholder="Documenting patient progress and observations..." className="flex-1 mt-2 p-5 bg-background/50 border border-border rounded-3xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary resize-none transition-all text-foreground font-medium"></textarea>
        </div>
      </div>

      <button 
        onClick={() => { setIsSubmitting(true); setTimeout(() => {setIsSubmitting(false); onAdd({});}, 1200); }} 
        disabled={isSubmitting}
        className="w-full mt-8 py-5 bg-primary text-white font-poppins font-black rounded-3xl shadow-xl shadow-primary/20 hover:scale-[0.99] active:scale-[0.97] transition-all flex items-center justify-center gap-3 group"
      >
        {isSubmitting ? <><Loader2 className="animate-spin" size={24} /> <span>Updating Health Record...</span></> : <><Plus size={24} /> <span className="tracking-tight uppercase">Append to Health Journey</span></>}
      </button>

      <div className="mt-6 flex justify-center items-center gap-2 opacity-20 font-sans">
        <ClipboardList size={12} />
        <span className="text-[8px] font-bold uppercase tracking-[0.4em]">Confidential Medical Archive</span>
      </div>
    </div>
  );
};