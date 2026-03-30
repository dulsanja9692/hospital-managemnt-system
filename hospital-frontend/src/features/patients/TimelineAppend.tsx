import { Plus, Clock, Stethoscope, MapPin } from 'lucide-react';

export const TimelineAppend = ({ onAdd }: { onAdd: (entry: any) => void }) => {
  return (
    <div className="bg-(--code-bg) p-8 rounded-[2.5rem] border border-(--border) shadow-(--shadow) text-left">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-black text-(--text-h) flex items-center gap-3">
          <Clock className="text-(--accent)" size={24} />
          Append Medical Event
        </h3>
        <span className="text-[10px] font-black bg-(--accent-bg) text-(--accent) px-3 py-1 rounded-full uppercase tracking-widest">
          New Entry
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Entry Details */}
        <div className="space-y-4">
          <div className="group">
            <label className="text-[10px] font-black uppercase opacity-40 ml-1">Reason for Visit</label>
            <input 
              type="text" 
              placeholder="e.g., Post-Op Follow-up" 
              className="w-full mt-1 p-4 bg-(--bg) border border-(--border) rounded-2xl outline-none focus:border-(--accent) font-bold transition-all"
            />
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-[10px] font-black uppercase opacity-40 ml-1">Doctor</label>
              <div className="relative mt-1">
                <Stethoscope size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text) opacity-40" />
                <input type="text" placeholder="Dr. Smith" className="w-full pl-11 pr-4 py-4 bg-(--bg) border border-(--border) rounded-2xl outline-none focus:border-(--accent) font-bold" />
              </div>
            </div>
            <div className="w-1/3">
              <label className="text-[10px] font-black uppercase opacity-40 ml-1">Dept</label>
              <select className="w-full mt-1 p-4 bg-(--bg) border border-(--border) rounded-2xl outline-none focus:border-(--accent) font-bold appearance-none cursor-pointer">
                <option>OPD</option>
                <option>LAB</option>
                <option>ICU</option>
              </select>
            </div>
          </div>
        </div>

        {/* Clinical Notes */}
        <div className="flex flex-col">
          <label className="text-[10px] font-black uppercase opacity-40 ml-1">Clinical Notes & Observations</label>
          <textarea 
            rows={4} 
            placeholder="Type diagnosis or prescription details here..." 
            className="flex-1 mt-1 p-4 bg-(--bg) border border-(--border) rounded-2xl outline-none focus:border-(--accent) resize-none transition-all"
          ></textarea>
        </div>
      </div>

      <button 
        className="w-full mt-8 py-5 bg-(--accent) text-white font-black rounded-2xl shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 group"
      >
        <Plus size={24} className="group-hover:rotate-90 transition-transform" />
        Add to Patient Timeline
      </button>
    </div>
  );
};