import { X, Calendar, User, Stethoscope, Save } from 'lucide-react';
import { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entry: unknown) => void;
}

export const AddMeetingModal = ({ isOpen, onClose, onSave }: ModalProps) => {
  const [newEntry, setNewEntry] = useState({
    title: '',
    doctor: '',
    dept: 'OPD',
    status: 'Completed',
    date: new Date().toISOString().split('T')[0] // Default to today
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-(--code-bg) w-full max-w-lg rounded-[2.5rem] border border-(--border) shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-8 border-b border-(--border) flex justify-between items-center bg-(--bg)">
          <div className="text-left">
            <h3 className="text-2xl font-black text-(--text-h) tracking-tight">New Medical Entry</h3>
            <p className="text-xs font-bold text-(--text) opacity-50 uppercase tracking-widest mt-1">Append to Patient Timeline</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-(--code-bg) rounded-xl text-(--text) transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8 space-y-6 text-left">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-(--text) opacity-50 ml-1">Consultation Title</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-(--accent)" size={18} />
              <input 
                type="text" 
                placeholder="e.g. Monthly Checkup"
                className="w-full pl-12 pr-4 py-4 bg-(--bg) border border-(--border) rounded-2xl outline-none focus:border-(--accent) font-bold"
                value={newEntry.title}
                onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-(--text) opacity-50 ml-1">Doctor Name</label>
              <div className="relative">
                <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text)" size={18} />
                <input 
                  type="text" 
                  placeholder="Dr. Silva"
                  className="w-full pl-12 pr-4 py-4 bg-(--bg) border border-(--border) rounded-2xl outline-none focus:border-(--accent) font-bold"
                  value={newEntry.doctor}
                  onChange={(e) => setNewEntry({...newEntry, doctor: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-(--text) opacity-50 ml-1">Department</label>
              <select 
                className="w-full px-4 py-4 bg-(--bg) border border-(--border) rounded-2xl outline-none focus:border-(--accent) font-bold appearance-none cursor-pointer"
                value={newEntry.dept}
                onChange={(e) => setNewEntry({...newEntry, dept: e.target.value})}
              >
                <option value="OPD">OPD</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Laboratory">Laboratory</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-8 bg-(--bg) border-t border-(--border) flex gap-4">
          <button 
            onClick={() => onSave(newEntry)}
            className="flex-1 py-4 bg-(--accent) text-white font-black rounded-2xl shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Save size={20} /> Add to Timeline
          </button>
          <button 
            onClick={onClose}
            className="px-8 py-4 border-2 border-(--border) text-(--text-h) font-black rounded-2xl hover:bg-(--code-bg) transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};