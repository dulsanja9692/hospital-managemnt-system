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
 <DialogContent className="sm:max-w-lg  p-0 overflow-hidden border-white/40 bg-card  font-sans">
 
 <DialogHeader className="p-8 border-b border-primary/10 bg-card">
 <div className="flex items-center gap-4">
 <div className="p-2.5 bg-primary/10 text-primary ">
 <ClipboardList size={22} />
 </div>
 <div className="text-left">
 <DialogTitle className="text-2xl font-poppins  text-foreground  uppercase">Record New Visit</DialogTitle>
 <DialogDescription className="text-[10px] font-sans  text-muted-foreground uppercase  mt-0.5">
 Updating the Patient's Care Journey
 </DialogDescription>
 </div>
 </div>
 </DialogHeader>

 <div className="p-8 space-y-6 text-left">
 <div className="space-y-3">
 <Label className="text-[10px] font-poppins  uppercase  text-muted-foreground ml-1">Visit Reason</Label>
 <div className="relative group">
 <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary z-10" size={18} />
 <Input 
 placeholder="e.g. Routine Wellness Checkup"
 className="h-14 pl-12  bg-background border-border font-sans "
 value={newEntry.title}
 onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
 />
 </div>
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-3">
 <Label className="text-[10px] font-poppins  uppercase  text-muted-foreground ml-1">Primary Specialist</Label>
 <div className="relative group">
 <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60 z-10" size={18} />
 <Input 
 placeholder="Dr. Silva"
 className="h-14 pl-12  bg-background border-border font-sans "
 value={newEntry.doctor}
 onChange={(e) => setNewEntry({...newEntry, doctor: e.target.value})}
 />
 </div>
 </div>

 <div className="space-y-3">
 <Label className="text-[10px] font-poppins  uppercase  text-muted-foreground ml-1">Medical Unit</Label>
 <Select value={newEntry.dept} onValueChange={(val: string) => setNewEntry({...newEntry, dept: val})}>
 <SelectTrigger className="h-14  bg-background border-border font-sans ">
 <SelectValue placeholder="Select Unit" />
 </SelectTrigger>
 <SelectContent className=" font-sans ">
 <SelectItem value="OPD">General Wellness (OPD)</SelectItem>
 <SelectItem value="Cardiology">Heart & Vascular</SelectItem>
 <SelectItem value="Laboratory">Diagnostic Lab</SelectItem>
 <SelectItem value="Emergency">Urgent Care</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>
 </div>

 <div className="p-8 bg-card border-t border-primary/10 flex gap-4">
 <Button 
 className="flex-1 h-14 bg-primary text-white font-poppins    hover:scale-[1.02] active:scale-95 transition-all gap-2"
 onClick={() => onSave(newEntry)}
 >
 <Save size={20} /> Update Record
 </Button>
 <Button variant="outline" className="px-8 h-14 font-poppins  " onClick={onClose}>
 Cancel
 </Button>
 </div>
 </DialogContent>
 </Dialog>
 );
};