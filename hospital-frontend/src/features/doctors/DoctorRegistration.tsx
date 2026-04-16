import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { 
  UserPlus, ArrowLeft, ShieldCheck, Briefcase, 
  Loader2, Zap, Plus, Building2, X, Save 
} from 'lucide-react';

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const DoctorRegistration = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  
  // 1. STATE FOR DEPARTMENTS
  const [departments, setDepartments] = useState([
    "Heart & Vascular (Cardiology)",
    "Child Health (Pediatrics)",
    "General Wellness (OPD)",
    "Brain & Nerve (Neurology)"
  ]);
  
  // 2. MODAL & NEW DEPT STATES
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [newDeptName, setNewDeptName] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      navigate('/dashboard/doctors');
    }, 1500);
  };

  const addNewDepartment = () => {
    if (newDeptName.trim() && !departments.includes(newDeptName)) {
      setDepartments([...departments, newDeptName.trim()]);
      setNewDeptName("");
      setIsDeptModalOpen(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 p-2 font-sans antialiased">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 text-left">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative p-5 bg-primary rounded-4xl shadow-xl shadow-primary/30 group-hover:scale-105 transition-transform duration-500">
              <UserPlus className="text-white" size={32} />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-poppins font-black text-foreground tracking-tighter uppercase leading-none italic">
              Staff <span className="text-primary">Registration</span>
            </h2>
            <p className="text-[10px] font-sans font-bold text-muted-foreground uppercase tracking-[0.4em] mt-3">
              Onboarding New Medical Team Members | Registry Tier 2
            </p>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard/doctors')}
          className="flex items-center gap-2 text-primary/60 font-poppins font-black uppercase tracking-widest text-[10px] hover:text-primary transition-all bg-transparent h-auto p-0 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
          Back to Team Directory
        </Button>
      </div>

      {/* --- MAIN REGISTRATION FORM --- */}
      <Card className="rounded-[3.5rem] border-border/40 bg-card/40 backdrop-blur-3xl shadow-2xl overflow-hidden border">
        <CardContent className="p-0">
          <form onSubmit={handleRegister}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-12 text-left">
              
              {/* Personal Identity Column */}
              <div className="space-y-8">
                <div className="flex items-center gap-3 text-primary border-b border-primary/10 pb-4">
                  <ShieldCheck size={20} />
                  <span className="font-poppins font-black text-[11px] uppercase tracking-[0.3em]">Personal Identity</span>
                </div>
                
                <div className="space-y-3">
                  <Label className="text-[10px] font-poppins font-black uppercase tracking-widest text-muted-foreground ml-1">Full Professional Name</Label>
                  <Input required placeholder="E.G. DR. SAMAN PERERA" className="h-14 rounded-2xl bg-white/50 border-border/40 font-sans font-bold uppercase" />
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-poppins font-black uppercase tracking-widest text-muted-foreground ml-1">Secure Contact Number</Label>
                  <Input type="tel" required placeholder="07XXXXXXXX" className="h-14 rounded-2xl bg-white/50 border-border/40 font-sans font-bold" />
                </div>
              </div>

              {/* Professional Status Column */}
              <div className="space-y-8">
                <div className="flex items-center gap-3 text-primary border-b border-primary/10 pb-4">
                  <Briefcase size={20} />
                  <span className="font-poppins font-black text-[11px] uppercase tracking-[0.3em]">Professional Status</span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center pr-1">
                    <Label className="text-[10px] font-poppins font-black uppercase tracking-widest text-muted-foreground ml-1">Assigned Department</Label>
                    <button 
                      type="button"
                      onClick={() => setIsDeptModalOpen(true)}
                      className="text-[9px] font-black uppercase text-primary hover:underline flex items-center gap-1 active:scale-95 transition-all"
                    >
                      <Plus size={10} /> Add New Unit
                    </button>
                  </div>
                  
                  <Select required>
                    <SelectTrigger className="h-14 rounded-2xl bg-white/50 border-border/40 font-sans font-bold uppercase">
                      <SelectValue placeholder="Select Dept" />
                    </SelectTrigger>
                    <SelectContent className="font-sans font-bold uppercase text-xs rounded-2xl border-primary/20 bg-card/95 backdrop-blur-xl">
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-poppins font-black uppercase tracking-widest text-muted-foreground ml-1">Medical License Number</Label>
                  <Input required placeholder="SLMC-XXXXX" className="h-14 rounded-2xl bg-white/50 border-border/40 font-mono text-xs font-bold uppercase" />
                </div>
              </div>
            </div>

            {/* ACTION FOOTER */}
            <div className="p-10 bg-primary/5 border-t border-border/40 flex flex-col sm:flex-row gap-6">
              <Button type="submit" disabled={isSaving} className="flex-1 h-16 bg-primary text-white text-[12px] font-poppins font-black uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-primary/30 hover:scale-[1.02] transition-all gap-3">
                {isSaving ? <><Loader2 size={20} className="animate-spin" /> Finalizing...</> : <><Zap size={18} /> Confirm Registration</>}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/dashboard/doctors')} className="px-16 h-16 border-2 border-border font-poppins font-black text-[12px] uppercase tracking-[0.3em] rounded-2xl hover:bg-red-500/5 hover:text-red-500 transition-all">
                Discard 
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* --- POPUP MODAL: REGISTER NEW UNIT --- */}
      <Dialog open={isDeptModalOpen} onOpenChange={setIsDeptModalOpen}>
        <DialogContent className="sm:max-w-md rounded-[3rem] bg-card/95 backdrop-blur-3xl border-primary/20 p-0 overflow-hidden shadow-2xl [&>button]:hidden animate-in zoom-in-95 duration-300">
          
          {/* Header */}
          <div className="p-10 pb-4 space-y-6">
            <div className="flex justify-between items-start">
               <div className="p-4 bg-primary/10 rounded-2xl text-primary shadow-inner">
                  <Building2 size={24} />
               </div>
               <Button 
                 variant="ghost" 
                 size="icon" 
                 onClick={() => setIsDeptModalOpen(false)} 
                 className="rounded-xl hover:bg-red-500/10 text-muted-foreground group"
               >
                 <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
               </Button>
            </div>
            <div className="text-left">
               <DialogTitle className="text-3xl font-poppins font-black uppercase italic tracking-tighter leading-none">
                  Register New Unit
               </DialogTitle>
               <DialogDescription className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground mt-3">
                  Initialize a new specialist department node.
               </DialogDescription>
            </div>
          </div>

          {/* Input */}
          <div className="px-10 py-4 text-left">
            <Label className="text-[10px] font-poppins font-black uppercase tracking-widest text-muted-foreground ml-1 mb-3 block">
              Department Nomenclature
            </Label>
            <Input 
              value={newDeptName}
              onChange={(e) => setNewDeptName(e.target.value.toUpperCase())}
              placeholder="E.G. NEUROLOGY UNIT"
              className="h-16 rounded-2xl border-primary/20 bg-white/5 font-sans font-black uppercase placeholder:italic px-6 focus-visible:ring-primary/20 transition-all"
            />
          </div>

          {/* Explicit Submit Button Footer */}
          <div className="p-10 pt-4">
            <Button 
              type="button" 
              onClick={addNewDepartment}
              disabled={!newDeptName.trim()}
              className="w-full h-16 bg-primary text-white font-poppins font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl gap-3 shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all group"
            >
              <Save size={18} className="group-hover:animate-pulse" />
              Deploy Unit Protocol
            </Button>
          </div>

          <Zap size={120} className="absolute -bottom-10 -right-10 text-primary opacity-[0.03] pointer-events-none -rotate-12" />
        </DialogContent>
      </Dialog>
    </div>
  );
};