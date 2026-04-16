import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, UserRound, Briefcase, Phone, Save, Edit2, 
  Hash, CalendarClock, Trash2, CheckCircle2, XCircle, Zap 
} from 'lucide-react';

// Shadcn UI Imports
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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
    <Dialog open={true} onOpenChange={onClose}>
      {/* FIX 1: Using DialogContent consistently.
        FIX 2: Added [&>button]:hidden to remove the double X.
      */}
      <DialogContent className="sm:max-w-2xl rounded-[3.5rem] p-0 overflow-hidden border-border/40 bg-card/90 backdrop-blur-3xl shadow-2xl font-sans antialiased [&>button]:hidden">
        
        {/* 1. FUTURISTIC HEADER BAR */}
        <div className="relative h-32 bg-linear-to-r from-primary/80 to-purple-900/40 w-full flex items-start justify-end p-6">
          <div className="flex gap-3 relative z-50">
            {!isEditing && (
              <>
                <Button 
                  variant="secondary"
                  size="icon"
                  onClick={() => navigate('/dashboard/doctors/schedule')} 
                  className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 shadow-xl transition-all"
                >
                  <CalendarClock size={20} />
                </Button>

                <Button 
                  variant="secondary"
                  size="icon"
                  onClick={() => setIsEditing(true)} 
                  className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 shadow-xl transition-all"
                >
                  <Edit2 size={20} />
                </Button>
              </>
            )}
            
            <Button 
              variant="secondary"
              size="icon"
              onClick={onClose} 
              className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-red-500/60 shadow-xl transition-all group"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            </Button>
          </div>
        </div>

        {/* 2. PROFILE CONTENT AREA */}
        <div className="relative p-10 pt-0 -mt-14 text-left font-sans">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 mb-12">
            <div className="w-28 h-28 bg-background rounded-4xl border-4 border-card shadow-2xl flex items-center justify-center text-primary shrink-0 overflow-hidden relative z-10">
                <UserRound size={48} className={isEditing ? "animate-pulse" : ""} />
            </div>
            
            <div className="text-center sm:text-left flex-1 pb-2">
              <Badge 
                onClick={toggleStatus}
                variant="outline"
                className={`mb-3 h-8 px-4 rounded-full text-[10px] font-poppins font-black uppercase tracking-widest transition-all gap-2 border shadow-sm ${
                  formData.status === 'On Duty' 
                    ? 'bg-green-500/10 text-green-600 border-green-500/20' 
                    : 'bg-red-500/10 text-red-500 border-red-500/20'
                } ${isEditing ? 'cursor-pointer hover:scale-105 active:scale-95' : 'cursor-default'}`}
              >
                {formData.status === 'On Duty' ? <CheckCircle2 size={12}/> : <XCircle size={12}/>}
                {formData.status}
              </Badge>

              {isEditing ? (
                <Input 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="h-14 text-xl font-poppins font-black bg-white/5 border-primary/40 rounded-2xl px-5 uppercase transition-all"
                />
              ) : (
                <DialogHeader>
                  <DialogTitle className="text-3xl font-poppins font-black text-foreground tracking-tighter uppercase leading-none">
                    {formData.name}
                  </DialogTitle>
                </DialogHeader>
              )}
            </div>
          </div>

          {/* 3. PROFESSIONAL DATA GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-poppins font-black uppercase text-muted-foreground flex items-center gap-2 ml-1 tracking-[0.2em]">
                <Hash size={14} className="text-primary" /> Board Certification
              </label>
              {isEditing ? (
                <Input 
                  value={formData.license || ''} 
                  onChange={(e) => setFormData({...formData, license: e.target.value})}
                  className="h-14 bg-white/5 border-border rounded-2xl font-sans font-bold"
                />
              ) : (
                <div className="p-5 bg-primary/5 border border-primary/10 rounded-2xl text-lg font-poppins font-black text-primary tracking-tight">
                  {formData.license || 'PENDING_VERIFICATION'}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-poppins font-black uppercase text-muted-foreground flex items-center gap-2 ml-1 tracking-[0.2em]">
                <Briefcase size={14} className="text-primary" /> Specialist Unit
              </label>
              <div className="p-5 bg-muted/30 border border-border rounded-2xl text-lg font-poppins font-black text-foreground/70 uppercase tracking-tighter">
                {formData.dept}
              </div>
            </div>

            <div className="space-y-3 md:col-span-2 text-left">
              <label className="text-[10px] font-poppins font-black uppercase text-muted-foreground flex items-center gap-2 ml-1 tracking-[0.2em]">
                <Phone size={14} className="text-primary" /> Emergency Contact
              </label>
              {isEditing ? (
                <Input 
                  type="tel" 
                  value={formData.phone || ''} 
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="h-14 bg-white/5 border-border rounded-2xl font-sans font-bold"
                />
              ) : (
                <div className="p-5 bg-muted/30 border border-border rounded-2xl text-lg font-sans font-bold text-foreground">
                  {formData.phone || 'DATA_OFFLINE'}
                </div>
              )}
            </div>
          </div>

          {/* 4. EDITING ACTIONS */}
          {isEditing && (
            <div className="mt-12 pt-8 border-t border-border/40 space-y-6 animate-in slide-in-from-bottom-4 font-poppins">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="outline"
                  onClick={() => onDelete && onDelete(formData.id)}
                  className="h-14 px-8 border-red-500/20 text-red-500 font-black rounded-2xl hover:bg-red-500/10 gap-3 group transition-all"
                >
                  <Trash2 size={20} className="group-hover:animate-bounce" />
                  Deleted
                </Button>

                <div className="flex-1 flex gap-4">
                  <Button 
                    onClick={handleSave} 
                    className="flex-1 h-14 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all gap-3 uppercase tracking-widest text-[10px]"
                  >
                    <Save size={20} /> Updated
                  </Button>
                  <Button 
                    variant="ghost"
                    onClick={() => {
                      setFormData(doctor);
                      setIsEditing(false);
                    }} 
                    className="px-8 h-14 font-black rounded-2xl hover:bg-muted active:scale-95 transition-all uppercase tracking-widest text-[10px]"
                  >
                    Discard
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-center items-center gap-2 opacity-20 font-sans">
                <Zap size={12} className="text-primary" />
                <span className="text-[8px] font-bold uppercase tracking-[0.4em]">Biometric Authorization Verified</span>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};