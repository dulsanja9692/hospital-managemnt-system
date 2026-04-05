import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UserPlus, ArrowLeft, ShieldCheck, Briefcase, Loader2, Zap } from 'lucide-react';

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

export const DoctorRegistration = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate secure medical staff onboarding uplink
    setTimeout(() => {
      setIsSaving(false);
      navigate('/dashboard/doctors');
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 p-2 font-sans">
      
      {/* 1. FUTURISTIC HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div className="flex items-center gap-6 text-left">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative p-5 bg-primary rounded-4xl shadow-xl shadow-primary/30 group-hover:scale-105 transition-transform">
              <UserPlus className="text-white" size={32} />
            </div>
          </div>
          <div>
            <h2 className="text-5xl font-black text-foreground tracking-tighter uppercase leading-none italic">
              Staff <span className="text-primary">Registration</span>
            </h2>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.4em] mt-3 text-left">
              Onboarding New Medical Personnel | System Access Tier 2
            </p>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard/doctors')}
          className="flex items-center gap-2 text-primary/60 font-black uppercase tracking-widest text-[10px] hover:text-primary transition-all group bg-transparent h-auto p-0"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
          Back to Directory
        </Button>
      </div>

      {/* 2. REGISTRATION TERMINAL */}
      <Card className="rounded-[3.5rem] border-border/40 bg-card/40 backdrop-blur-3xl shadow-2xl overflow-hidden">
        <CardContent className="p-0">
          <form onSubmit={handleRegister}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-12">
              
              {/* Personal Details Column */}
              <div className="space-y-8 flex flex-col items-start">
                <div className="flex items-center gap-3 text-primary border-b border-primary/10 pb-4 w-full">
                  <ShieldCheck size={20} />
                  <span className="font-black text-[11px] uppercase tracking-[0.3em]">Personal Identity</span>
                </div>
                
                <div className="w-full space-y-3 text-left">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Professional Name</Label>
                  <Input 
                    required 
                    placeholder="DR. NAME HERE" 
                    className="h-14 rounded-2xl bg-white/50 dark:bg-slate-900/50 border-border/40 font-bold uppercase focus-visible:ring-primary/20"
                  />
                </div>

                <div className="w-full space-y-3 text-left">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Contact Interface (Mobile)</Label>
                  <Input 
                    type="tel" 
                    required 
                    placeholder="07XXXXXXXX" 
                    className="h-14 rounded-2xl bg-white/50 dark:bg-slate-900/50 border-border/40 font-bold focus-visible:ring-primary/20"
                  />
                </div>
              </div>

              {/* Professional Details Column */}
              <div className="space-y-8 flex flex-col items-start">
                <div className="flex items-center gap-3 text-primary border-b border-primary/10 pb-4 w-full">
                  <Briefcase size={20} />
                  <span className="font-black text-[11px] uppercase tracking-[0.3em]">Professional Protocol</span>
                </div>

                <div className="w-full space-y-3 text-left">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Specialty / Department</Label>
                  <Select defaultValue="OPD">
                    <SelectTrigger className="h-14 rounded-2xl bg-white/50 dark:bg-slate-900/50 border-border/40 font-bold">
                      <SelectValue placeholder="Select Dept" />
                    </SelectTrigger>
                    <SelectContent className="font-bold uppercase text-xs">
                      <SelectItem value="Cardiology">Cardiology</SelectItem>
                      <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="OPD">OPD (General)</SelectItem>
                      <SelectItem value="Neurology">Neurology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-full space-y-3 text-left">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">SLMC License Authority Number</Label>
                  <Input 
                    required 
                    placeholder="SLMC-XXXXX" 
                    className="h-14 rounded-2xl bg-white/50 dark:bg-slate-900/50 border-border/40 font-mono text-xs font-bold focus-visible:ring-primary/20"
                  />
                </div>
              </div>
            </div>

            {/* ACTION FOOTER */}
            <div className="p-10 bg-primary/2 border-t border-border/40 flex flex-col sm:flex-row gap-6">
              <Button 
                type="submit" 
                disabled={isSaving}
                className="flex-1 h-16 bg-primary text-white text-[12px] font-black uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all gap-3"
              >
                {isSaving ? (
                  <><Loader2 size={20} className="animate-spin" /> Uplinking Record...</>
                ) : (
                  <><Zap size={18} /> Commit Staff Record</>
                )}
              </Button>
              
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate('/dashboard/doctors')}
                className="px-16 h-16 border-2 border-border font-black text-[12px] uppercase tracking-[0.3em] rounded-2xl hover:bg-red-500/5 hover:text-red-500 hover:border-red-500/20 active:scale-95 transition-all"
              >
                Cancel Entry
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};