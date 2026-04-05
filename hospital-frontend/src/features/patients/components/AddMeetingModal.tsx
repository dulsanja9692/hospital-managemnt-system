import { Calendar, Stethoscope, Save, ClipboardList } from 'lucide-react';
import { useState } from 'react';

// Shadcn UI Imports
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

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
    date: new Date().toISOString().split('T')[0] 
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-[3rem] p-0 overflow-hidden border-white/40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-2xl">
        
        {/* HEADER */}
        <DialogHeader className="p-8 border-b border-primary/10 bg-white/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
              <ClipboardList size={22} />
            </div>
            <div className="text-left">
              <DialogTitle className="text-2xl font-black text-foreground tracking-tight uppercase">New Medical Entry</DialogTitle>
              <DialogDescription className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mt-0.5">
                Append to Patient Timeline
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* FORM BODY */}
        <div className="p-8 space-y-6 text-left">
          
          {/* Consultation Title */}
          <div className="space-y-3">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Consultation Title</Label>
            <div className="relative group">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary z-10" size={18} />
              <Input 
                placeholder="e.g. Monthly Diagnostic Checkup"
                className="h-14 pl-12 rounded-2xl bg-background/50 border-border focus-visible:ring-primary/10"
                value={newEntry.title}
                onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Doctor Name */}
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Attending Specialist</Label>
              <div className="relative group">
                <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60 z-10" size={18} />
                <Input 
                  placeholder="Dr. Silva"
                  className="h-14 pl-12 rounded-2xl bg-background/50 border-border"
                  value={newEntry.doctor}
                  onChange={(e) => setNewEntry({...newEntry, doctor: e.target.value})}
                />
              </div>
            </div>

            {/* Department Selection */}
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Unit</Label>
              <Select 
                value={newEntry.dept} 
                onValueChange={(val) => setNewEntry({...newEntry, dept: val})}
              >
                <SelectTrigger className="h-14 rounded-2xl bg-background/50 border-border font-bold">
                  <SelectValue placeholder="Select Dept" />
                </SelectTrigger>
                <SelectContent className="rounded-xl font-bold">
                  <SelectItem value="OPD">OPD (General)</SelectItem>
                  <SelectItem value="Cardiology">Cardiology</SelectItem>
                  <SelectItem value="Laboratory">Laboratory</SelectItem>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="p-8 bg-white/50 dark:bg-slate-900/50 border-t border-primary/10 flex gap-4">
          <Button 
            className="flex-1 h-14 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all gap-2"
            onClick={() => onSave(newEntry)}
          >
            <Save size={20} /> Add to Timeline
          </Button>
          <Button 
            variant="outline"
            className="px-8 h-14 font-black rounded-2xl hover:bg-red-500/5 hover:text-red-500 hover:border-red-500/20 active:scale-95 transition-all"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};