import { useState, useEffect } from 'react';
import { 
 X, User, Stethoscope, Clock, Calendar, 
 Edit2, Save, Zap, AlertCircle
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Appointment {
 id: string;
 patient: string;
 doctor: string;
 time: string;
 date: string;
 status: string;
}

interface Props {
 appointment: Appointment | null;
 isOpen: boolean;
 onClose: () => void;
 onUpdate: (updated: Appointment) => void;
}

export const ViewAppointmentModal = ({ appointment, isOpen, onClose, onUpdate }: Props) => {
 const [isEditing, setIsEditing] = useState(false);
 const [formData, setFormData] = useState<Appointment | null>(appointment);

 useEffect(() => {
 setFormData(appointment);
 }, [appointment]);

 if (!appointment || !formData) return null;

 const handleSave = () => {
 onUpdate(formData);
 setIsEditing(false);
 };

 return (
 <Dialog open={isOpen} onOpenChange={onClose}>
 {/* CRITICAL FIX: [&>button]:hidden 
 This removes the default Shadcn absolute-positioned close button 
 */}
 <DialogContent className="sm:max-w-xl  p-0 overflow-hidden border-border bg-card  font-sans [&>button]:hidden">
 
 {/* 1. HEADER AREA */}
 <DialogHeader className="h-24 bg-linear-to-r from-primary/20 to-transparent flex flex-row items-center justify-between px-8 border-b border-border/20 space-y-0">
 <div className="flex items-center gap-4 text-left">
 <div className="p-3 bg-primary text-white  shrink-0">
 <Calendar size={20} />
 </div>
 <div>
 <DialogTitle className="text-lg  uppercase  text-foreground leading-none">
 {isEditing ? "Edit Engagement" : "Session Details"}
 </DialogTitle>
 <p className="text-[9px]  text-muted-foreground uppercase  mt-1">REF: {appointment.id}</p>
 </div>
 </div>
 
 <div className="flex gap-2">
 {!isEditing && (
 <Button 
 variant="ghost" 
 size="icon" 
 onClick={() => setIsEditing(true)}
 className=" hover:bg-primary/10 text-primary transition-colors"
 >
 <Edit2 size={18} />
 </Button>
 )}
 {/* Keeping only this custom close button */}
 <Button 
 variant="ghost" 
 size="icon" 
 onClick={onClose} 
 className=" hover:bg-red-500/10 text-muted-foreground group transition-colors"
 >
 <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
 </Button>
 </div>
 </DialogHeader>

 {/* 2. CONTENT AREA */}
 <div className="p-10 space-y-8 text-left">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="space-y-2">
 <label className="text-[10px]  uppercase text-muted-foreground  ml-1 flex items-center gap-2">
 <User size={12} /> Patient Name
 </label>
 <div className="p-4 bg-muted border border-border   text-foreground">
 {appointment.patient}
 </div>
 </div>

 <div className="space-y-2">
 <label className="text-[10px]  uppercase text-muted-foreground  ml-1 flex items-center gap-2">
 <Stethoscope size={12} /> Assign Specialist
 </label>
 {isEditing ? (
 <Select onValueChange={(val: string) => setFormData({...formData, doctor: val})} defaultValue={appointment.doctor}>
 <SelectTrigger className="h-12  border-primary/20  focus:ring-primary/20">
 <SelectValue />
 </SelectTrigger>
 <SelectContent position="popper" className="z-100  ">
 <SelectItem value="Dr. Saman Perera">Dr. Saman Perera</SelectItem>
 <SelectItem value="Dr. Anna Silva">Dr. Anna Silva</SelectItem>
 </SelectContent>
 </Select>
 ) : (
 <div className="p-4 bg-muted border border-border   text-foreground">
 {appointment.doctor}
 </div>
 )}
 </div>
 </div>

 <div className="grid grid-cols-2 gap-6">
 <div className="space-y-2 text-left">
 <label className="text-[10px]  uppercase text-muted-foreground  ml-1 flex items-center gap-2">
 <Clock size={12} /> Scheduled Time
 </label>
 {isEditing ? (
 <Input 
 type="time" 
 defaultValue={appointment.time} 
 onChange={(e) => setFormData({...formData, time: e.target.value})}
 className="h-12  border-primary/20  focus:ring-primary/20"
 />
 ) : (
 <div className="p-4 bg-primary/5 border border-primary/10   text-primary flex items-center gap-2">
 <Zap size={14} className="animate-pulse" /> {appointment.time}
 </div>
 )}
 </div>

 <div className="space-y-2 text-left">
 <label className="text-[10px]  uppercase text-muted-foreground  ml-1 flex items-center gap-2">
 <AlertCircle size={12} /> Current Status
 </label>
 {isEditing ? (
 <Select onValueChange={(val: string) => setFormData({...formData, status: val})} defaultValue={appointment.status}>
 <SelectTrigger className="h-12  border-primary/20  focus:ring-primary/20">
 <SelectValue />
 </SelectTrigger>
 <SelectContent position="popper" className="z-100  ">
 <SelectItem value="Scheduled">Scheduled</SelectItem>
 <SelectItem value="In Progress">In Progress</SelectItem>
 <SelectItem value="Completed">Completed</SelectItem>
 </SelectContent>
 </Select>
 ) : (
 <Badge variant="outline" className="h-12 w-full justify-center  text-[10px]  uppercase  bg-primary/10 text-primary border-primary/20">
 {appointment.status}
 </Badge>
 )}
 </div>
 </div>

 {/* 3. ACTIONS */}
 {isEditing && (
 <div className="pt-6 border-t border-border flex gap-4 animate-in slide-in-from-bottom-2">
 <Button 
 onClick={handleSave}
 className="flex-1 h-14 bg-primary text-white    hover:scale-[1.02] active:scale-95 transition-all gap-2 uppercase text-[10px] "
 >
 <Save size={18} /> Updated
 </Button>
 <Button 
 variant="ghost" 
 onClick={() => setIsEditing(false)}
 className="px-8 h-14   hover:bg-muted text-[10px]  active:scale-95 transition-all"
 >
 Discard
 </Button>
 </div>
 )}
 </div>
 </DialogContent>
 </Dialog>
 );
};