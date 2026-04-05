import { useState } from 'react'; // Now being used!
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar, User, Stethoscope, Zap, CheckCircle2 } from 'lucide-react';

export const AddAppointmentModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  // 1. ADDED STATE: Captures your selections
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    sessionId: ''
  });

  const handleConfirm = () => {
    console.log("Appointment Data Uplinked:", formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-[3rem] p-0 overflow-hidden border-border/40 bg-card/90 backdrop-blur-3xl shadow-2xl text-left font-sans">
        
        {/* HEADER AREA */}
        <DialogHeader className="p-8 border-b border-border/40 bg-primary/2">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl text-primary border border-primary/20">
              <Zap size={20} />
            </div>
            <div>
              <DialogTitle className="text-xl font-black text-foreground tracking-tighter uppercase leading-none">Schedule Session</DialogTitle>
              <DialogDescription className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.3em] mt-2">
                Initialize new clinical engagement
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="p-10 space-y-8">
          {/* PATIENT SELECTION */}
          <div className="space-y-3 relative z-50">
            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2 ml-1">
              <User size={14} className="text-primary" /> Select Patient
            </Label>
            <Select onValueChange={(val) => setFormData({...formData, patientId: val})}>
              <SelectTrigger className="h-14 rounded-2xl bg-white/5 border-border font-bold">
                <SelectValue placeholder="Search Patient Database..." />
              </SelectTrigger>
              <SelectContent position="popper" className="z-100 font-bold uppercase text-xs">
                <SelectItem value="p1">Saman Kumara (P-1001)</SelectItem>
                <SelectItem value="p2">Nuwanthi Silva (P-1002)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* DOCTOR SELECTION */}
          <div className="space-y-3 relative z-40">
            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2 ml-1">
              <Stethoscope size={14} className="text-primary" /> Assign Specialist
            </Label>
            <Select onValueChange={(val) => setFormData({...formData, doctorId: val})}>
              <SelectTrigger className="h-14 rounded-2xl bg-white/5 border-border font-bold">
                <SelectValue placeholder="Select Doctor..." />
              </SelectTrigger>
              <SelectContent position="popper" className="z-100 font-bold uppercase text-xs">
                <SelectItem value="d1">Dr. Saman Perera (Cardiology)</SelectItem>
                <SelectItem value="d2">Dr. Anna Silva (Pediatrics)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* SESSION SELECTION */}
          <div className="space-y-3 relative z-30">
            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2 ml-1">
              <Calendar size={14} className="text-primary" /> Available Session
            </Label>
            <Select onValueChange={(val) => setFormData({...formData, sessionId: val})}>
              <SelectTrigger className="h-14 rounded-2xl bg-white/5 border-border font-bold">
                <SelectValue placeholder="Choose Timeslot..." />
              </SelectTrigger>
              <SelectContent position="popper" className="z-100 font-bold uppercase text-xs">
                <SelectItem value="s1">Monday: 09:00 AM - 12:00 PM</SelectItem>
                <SelectItem value="s2">Wednesday: 02:00 PM - 05:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleConfirm}
            className="w-full h-16 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all gap-3 uppercase tracking-widest text-[11px]"
          >
            <CheckCircle2 size={18} /> Confirm Appointment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};