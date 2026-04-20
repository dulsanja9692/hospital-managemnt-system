import { Clock, Users, Calendar, CheckCircle2, Zap } from 'lucide-react';

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
import { Label } from "@/components/ui/label";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";

interface CreateSessionModalProps {
 isOpen: boolean; 
 onClose: () => void;
}

export const CreateSessionModal = ({ isOpen, onClose }: CreateSessionModalProps) => {
 return (
 <Dialog open={isOpen} onOpenChange={onClose}>
 <DialogContent className="sm:max-w-lg  p-0 overflow-hidden border-border bg-card  font-sans antialiased">
 
 {/* GLOWING BACKGROUND DECORATION */}
 <div className="absolute w-64 h-64 bg-primary/10 blur-[100px]  -top-10 -left-10 pointer-events-none" />

 {/* HEADER AREA */}
 <DialogHeader className="p-8 border-b border-border bg-primary/2 relative z-10">
 <div className="flex items-center gap-4 text-left">
 <div className="p-3 bg-primary/10  text-primary border border-primary/20">
 <Zap size={20} />
 </div>
 <div>
 {/* Heading: Poppins Black */}
 <DialogTitle className="text-xl font-poppins  text-foreground  uppercase leading-none">
 Schedule <span className="text-primary">Session</span>
 </DialogTitle>
 <DialogDescription className="text-[9px] font-sans  text-muted-foreground uppercase  mt-2">
 Planning your dedicated care hours
 </DialogDescription>
 </div>
 </div>
 </DialogHeader>

 {/* FORM BODY */}
 <div className="p-10 space-y-8 relative z-10 text-left">
 
 {/* DAY SELECTION */}
 <div className="space-y-3 relative">
 <Label className="text-[10px] font-poppins  uppercase text-muted-foreground  flex items-center gap-2 ml-1">
 <Calendar size={14} className="text-primary" /> Preferred Weekday
 </Label>
 <Select defaultValue="Monday">
 <SelectTrigger className="h-14  bg-card border-border focus:ring-primary/20 font-sans  relative z-10">
 <SelectValue placeholder="Select Day" />
 </SelectTrigger>
 <SelectContent 
 position="popper" 
 sideOffset={5}
 className=" font-sans  uppercase text-xs z-100 bg-popover border-border "
 >
 {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
 <SelectItem key={day} value={day} className="cursor-pointer">
 {day}
 </SelectItem>
 ))}
 </SelectContent>
 </Select>
 </div>

 {/* TIME RANGE */}
 <div className="grid grid-cols-2 gap-6">
 <div className="space-y-3">
 <Label className="text-[10px] font-poppins  uppercase text-muted-foreground  flex items-center gap-2 ml-1">
 <Clock size={14} className="text-primary" /> Start Time
 </Label>
 <Input 
 type="time" 
 className="h-14  bg-card border-border font-sans  focus-visible:ring-primary/20 scheme-dark" 
 />
 </div>
 <div className="space-y-3">
 <Label className="text-[10px] font-poppins  uppercase text-muted-foreground  flex items-center gap-2 ml-1">
 <Clock size={14} className="text-primary" /> End Time
 </Label>
 <Input 
 type="time" 
 className="h-14  bg-card border-border font-sans  focus-visible:ring-primary/20 scheme-dark" 
 />
 </div>
 </div>

 {/* PATIENT LIMIT */}
 <div className="space-y-3">
 <Label className="text-[10px] font-poppins  uppercase text-muted-foreground  flex items-center gap-2 ml-1">
 <Users size={14} className="text-primary" /> Max Consultations
 </Label>
 <Input 
 type="number" 
 placeholder="e.g. 15"
 className="h-14  bg-card border-border font-sans  placeholder:text-muted-foreground/30 focus-visible:ring-primary/20" 
 />
 </div>

 {/* ACTION BUTTONS */}
 <div className="flex flex-col gap-4 pt-4 pb-2">
 <Button 
 className="h-16 bg-primary text-white font-poppins    hover:scale-[1.02] active:scale-95 transition-all gap-3 uppercase  text-[11px]"
 onClick={onClose}
 >
 <CheckCircle2 size={18} /> Confirm Session Plan
 </Button>
 <Button 
 variant="ghost"
 onClick={onClose}
 className="h-14 font-poppins  uppercase  text-[10px] text-muted-foreground hover:text-red-500 transition-colors"
 >
 Discard 
 </Button>
 </div>
 </div>

 {/* DECORATIVE ACCENT */}
 <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 blur-3xl  pointer-events-none" />
 </DialogContent>
 </Dialog>
 );
};