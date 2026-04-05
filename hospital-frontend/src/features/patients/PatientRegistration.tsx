import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { 
  ArrowLeft, ShieldCheck, MapPin, Phone, Zap, User, 
  Loader2, CheckCircle2, Droplets, Scale, Ruler, Thermometer, Activity 
} from 'lucide-react';

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Updated
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const PatientRegistration = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'idle' | 'saving' | 'success'>('idle');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');
    
    // Simulate secure medical data uplink
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        navigate('/dashboard/patients');
      }, 1000);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto p-2 transition-all duration-500 pb-10 font-sans">
      
      {/* 1. FUTURISTIC HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
        <div className="flex items-center gap-6 text-left">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative p-5 bg-primary rounded-4xl shadow-xl shadow-primary/30 group-hover:scale-105 transition-transform">
              <User className="text-white" size={32} />
            </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter uppercase leading-none">
              New <span className="text-primary">Registration</span>
            </h2>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.4em] mt-3 text-left">
              Initializing Secure Patient Registry Entry | Staff ID: ITBIN-2211-0249
            </p>
          </div>
        </div>
        
        <Button 
          variant="outline"
          onClick={() => navigate('/dashboard/patients')}
          className="h-12 px-8 border-2 border-primary text-primary font-black uppercase tracking-widest text-[10px] hover:bg-primary hover:text-white rounded-2xl transition-all group"
        >
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Return to Registry
        </Button>
      </div>

      {/* 2. REGISTRATION FORM */}
      <form onSubmit={handleRegister} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* SECTION A: IDENTITY MANAGEMENT */}
          <div className="bg-card/40 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-border/40 shadow-2xl space-y-6">
            <div className="flex items-center gap-3 text-primary border-b border-primary/10 pb-4">
              <ShieldCheck size={20} />
              <span className="font-black text-[11px] uppercase tracking-[0.3em]">Identity Protocol</span>
            </div>
            
            <div className="space-y-3 text-left">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Legal Name</Label>
              <Input required placeholder="SAMAN KUMARA" className="h-14 rounded-2xl bg-white/50 dark:bg-slate-900/50 border-border/40 font-bold uppercase tracking-tight" />
            </div>

            <div className="space-y-3 text-left">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Identity Number (NIC)</Label>
              <Input required placeholder="19XXXXXXXXXX" className="h-14 rounded-2xl bg-white/50 dark:bg-slate-900/50 border-border/40 font-mono text-xs font-bold" />
            </div>
          </div>

          {/* SECTION B: CLINICAL VITALS */}
          <div className="bg-card/40 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-border/40 shadow-2xl space-y-6">
            <div className="flex items-center gap-3 text-primary border-b border-primary/10 pb-4">
              <Activity size={20} />
              <span className="font-black text-[11px] uppercase tracking-[0.3em]">Vitals Profile</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="space-y-3 text-left">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Blood Group</Label>
                <Select>
                  <SelectTrigger className="h-14 rounded-2xl font-bold bg-white/50 border-border/40">
                    <Droplets className="mr-2 h-4 w-4 text-red-500" />
                    <SelectValue placeholder="Group" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl font-bold">
                    {['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'].map(group => (
                      <SelectItem key={group} value={group}>{group}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3 text-left">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Weight (kg)</Label>
                <div className="relative">
                  <Scale className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 z-10" size={16} />
                  <Input className="h-14 pl-11 rounded-2xl bg-white/50 border-border/40 font-bold" placeholder="72kg" />
                </div>
              </div>

              <div className="space-y-3 text-left">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Height (cm)</Label>
                <div className="relative">
                  <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 text-primary z-10" size={16} />
                  <Input className="h-14 pl-11 rounded-2xl bg-white/50 border-border/40 font-bold" placeholder="175cm" />
                </div>
              </div>

              <div className="space-y-3 text-left">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Core Temp</Label>
                <div className="relative">
                  <Thermometer className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500 z-10" size={16} />
                  <Input className="h-14 pl-11 rounded-2xl bg-white/50 border-border/40 font-bold" placeholder="36.8°C" />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION C: CONTACT PROTOCOL */}
          <div className="bg-card/40 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-border/40 shadow-2xl space-y-6">
            <div className="flex items-center gap-3 text-primary border-b border-primary/10 pb-4">
              <Phone size={20} />
              <span className="font-black text-[11px] uppercase tracking-[0.3em]">Contact Protocol</span>
            </div>
            
            <div className="space-y-3 text-left">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Mobile Interface</Label>
              <Input required type="tel" placeholder="07XXXXXXXX" className="h-14 rounded-2xl bg-white/50 border-border/40 font-bold" />
            </div>

            <div className="space-y-3 text-left">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Emergency Relation</Label>
              <Input required placeholder="Guardian / Relative" className="h-14 rounded-2xl bg-white/50 border-border/40 font-bold" />
            </div>
          </div>
        </div>

        {/* FULL WIDTH: ADDRESS LOGISTICS */}
        <div className="bg-card/40 backdrop-blur-3xl p-8 rounded-[3rem] border border-border/40 shadow-2xl space-y-6 text-left">
          <div className="flex items-center gap-3 text-primary border-b border-primary/10 pb-4">
            <MapPin size={20} />
            <span className="font-black text-[11px] uppercase tracking-[0.3em]">Residential Logistics</span>
          </div>
          <div className="space-y-3">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Permanent Residence Address</Label>
            <Textarea 
              rows={3} 
              className="rounded-3xl border-border/40 bg-white/50 dark:bg-slate-900/50 font-bold text-foreground focus-visible:ring-primary/20 resize-none p-5" 
              placeholder="ENTER FULL RESIDENCE ADDRESS DATA..."
            />
          </div>
        </div>

        {/* FINAL ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-6 pt-4 pb-12">
          <Button 
            type="submit" 
            disabled={status !== 'idle'}
            className={`flex-1 h-20 rounded-3xl text-[12px] font-black uppercase tracking-[0.3em] shadow-xl transition-all duration-500 hover:scale-[1.02] active:scale-95 ${
                status === 'success' ? 'bg-green-600 hover:bg-green-600 shadow-green-900/20' : 'bg-primary shadow-primary/20'
            }`}
          >
             {status === 'saving' ? (
               <span className="flex items-center gap-3">
                 <Loader2 size={24} className="animate-spin" /> UPLINKING TO REGISTRY...
               </span>
             ) : status === 'success' ? (
               <span className="flex items-center gap-3">
                 <CheckCircle2 size={24} /> REGISTRATION COMPLETE
               </span>
             ) : (
               <span className="flex items-center gap-3">
                 <Zap size={20} /> COMMIT REGISTRATION
               </span>
             )}
          </Button>
          
          <Button 
            type="button" 
            variant="outline"
            onClick={() => navigate('/dashboard/patients')}
            className="px-16 h-20 border-2 border-border font-black text-[12px] uppercase tracking-[0.3em] rounded-3xl hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 active:scale-95 transition-all"
          >
            Discard Entry
          </Button>
        </div>
      </form>
    </div>
  );
};