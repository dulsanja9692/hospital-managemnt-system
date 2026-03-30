import { X, UserRound, Briefcase, Phone, Save, Edit2, Hash, CalendarClock, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Doctor {
  id: string;
  name: string;
  dept: string;
  status: string;
  license?: string;
  phone?: string;
}

interface ModalProps {
  doctor: Doctor;
  onClose: () => void;
  onUpdate: (updatedDoc: Doctor) => void;
  onDelete?: (id: string) => void;
}

export const DoctorProfileModal = ({ doctor, onClose, onUpdate, onDelete }: ModalProps) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Doctor>(doctor);

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const toggleStatus = () => {
    if (!isEditing) return;
    setFormData({
      ...formData,
      status: formData.status === 'On Duty' ? 'Off Duty' : 'On Duty'
    });
  };

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300 text-left">
      <div className="bg-(--code-bg) w-full max-w-2xl max-h-[90vh] rounded-[3.5rem] border border-glass-border shadow-2xl overflow-y-auto relative my-auto animate-in zoom-in-95 duration-300 no-scrollbar">
        
        {/* PURPLE HEADER BAR - Buttons are now inside this flex container */}
        <div className="sticky top-0 h-32 bg-linear-to-r from-accent to-purple-900 opacity-30 w-full z-0 flex items-start justify-end p-8">
          <div className="flex gap-3 relative z-50">
            {!isEditing && (
              <>
                {/* Schedule Button */}
                <button 
                  type="button"
                  onClick={() => navigate('/dashboard/doctors/schedule')} 
                  className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white hover:bg-white/20 transition-all active:scale-90 flex items-center gap-2 group shadow-xl"
                  title="Manage Schedule"
                >
                  <CalendarClock size={20} />
                  <span className="text-[10px] font-black uppercase tracking-widest hidden group-hover:inline-block">Schedule</span>
                </button>

                {/* Edit Button */}
                <button 
                  type="button" 
                  onClick={() => setIsEditing(true)} 
                  className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white hover:bg-white/20 transition-all active:scale-90 shadow-xl"
                  title="Edit Profile"
                >
                  <Edit2 size={20} />
                </button>
              </>
            )}
            
            {/* Close Button */}
            <button 
              type="button" 
              onClick={onClose} 
              className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white hover:bg-red-500/40 transition-all active:scale-90 shadow-xl"
              title="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Area - Pulling identity up to overlap the header */}
        <div className="relative p-10 pt-0 -mt-14">
          
          {/* Profile Identity */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 mb-12">
            <div className="w-28 h-28 bg-(--bg) rounded-4xl border-4 border-(--code-bg) shadow-2xl flex items-center justify-center text-accent shrink-0 overflow-hidden relative z-10">
               <UserRound size={48} />
            </div>
            
            <div className="text-center sm:text-left flex-1 pb-2">
              <button 
                type="button"
                onClick={toggleStatus}
                disabled={!isEditing}
                className={`mb-3 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 mx-auto sm:mx-0 border ${
                  formData.status === 'On Duty' 
                    ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                    : 'bg-red-500/10 text-red-500 border-red-500/20'
                } ${isEditing ? 'cursor-pointer hover:brightness-125' : 'cursor-default'}`}
              >
                {formData.status === 'On Duty' ? <CheckCircle2 size={12}/> : <XCircle size={12}/>}
                {formData.status}
              </button>

              {isEditing ? (
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="block text-2xl font-black text-(--text-h) bg-white/3 border border-glass-border rounded-xl px-4 py-2 outline-none focus:border-accent w-full"
                />
              ) : (
                <h2 className="text-4xl font-black text-(--text-h) tracking-tight leading-none uppercase italic">{formData.name}</h2>
              )}
            </div>
          </div>

          {/* Data Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3 text-left">
              <label className="text-[10px] font-black uppercase opacity-40 flex items-center gap-2 ml-1 tracking-widest">
                <Hash size={14} /> License No
              </label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={formData.license || ''} 
                  onChange={(e) => setFormData({...formData, license: e.target.value})}
                  className="w-full p-5 bg-white/3 border-b-2 border-glass-border rounded-t-2xl outline-none focus:border-accent font-bold"
                />
              ) : (
                <div className="p-5 bg-white/3 border border-glass-border rounded-2xl text-lg font-bold text-accent shadow-glass-inner">
                  {formData.license || 'N/A'}
                </div>
              )}
            </div>

            <div className="space-y-3 text-left">
              <label className="text-[10px] font-black uppercase opacity-40 flex items-center gap-2 ml-1 tracking-widest">
                <Briefcase size={14} /> Specialty
              </label>
              <div className="p-5 bg-white/3 border border-glass-border rounded-2xl text-lg font-black text-(--text-h) uppercase tracking-tighter opacity-70">
                {formData.dept}
              </div>
            </div>

            <div className="space-y-3 text-left">
              <label className="text-[10px] font-black uppercase opacity-40 flex items-center gap-2 ml-1 tracking-widest">
                <Phone size={14} /> Contact
              </label>
              {isEditing ? (
                <input 
                  type="tel" 
                  value={formData.phone || ''} 
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full p-5 bg-white/3 border-b-2 border-glass-border rounded-t-2xl outline-none focus:border-accent font-bold"
                />
              ) : (
                <div className="p-5 bg-white/3 border border-glass-border rounded-2xl text-lg font-bold text-(--text-h)">
                  {formData.phone || 'N/A'}
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions for Editing */}
          {isEditing && (
            <div className="mt-12 pt-8 border-t border-glass-border flex flex-col sm:flex-row gap-4 animate-in slide-in-from-bottom-4">
              <button 
                type="button"
                onClick={() => onDelete && onDelete(formData.id)}
                className="px-6 py-5 border-2 border-red-500/20 text-red-500 font-black rounded-2xl hover:bg-red-500/10 transition-all flex items-center justify-center gap-3 group"
              >
                <Trash2 size={20} className="group-hover:animate-bounce" />
                Remove Personnel
              </button>

              <div className="flex-1 flex gap-4">
                <button 
                  type="button" 
                  onClick={handleSave} 
                  className="flex-1 py-5 bg-accent text-white font-black rounded-2xl shadow-neon-purple hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                >
                  <Save size={20} /> Update Record
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)} 
                  className="px-10 py-5 border border-glass-border text-(--text-h) font-black rounded-2xl hover:bg-white/5 active:scale-95 transition-all uppercase tracking-widest text-xs"
                >
                  Discard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};