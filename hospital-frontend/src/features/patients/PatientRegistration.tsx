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
import { Textarea } from "@/components/ui/textarea";
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
 
 // Simulate secure healthcare record synchronization
 setTimeout(() => {
 setStatus('success');
 setTimeout(() => {
 navigate('/dashboard/patients');
 }, 1000);
 }, 1500);
 };

 return (
 <div className="max-w-7xl mx-auto p-2 transition-all duration-500 pb-10 font-sans antialiased">
 
 {/* 1. WELCOME & CONTEXT HEADER */}
 <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
 <div className="flex items-center gap-6 text-left">
 <div className="relative group">
 <div className="absolute inset-0 bg-primary blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
 <div className="relative p-5 bg-primary   group-hover:scale-105 transition-transform duration-500">
 <User className="text-white" size={32} />
 </div>
 </div>
 <div>
 <h2 className="text-2xl md:text-2xl font-poppins  text-foreground  uppercase leading-none">
 Care <span className="text-primary">Onboarding</span>
 </h2>
 <p className="text-[10px] font-sans  text-muted-foreground uppercase  mt-3 text-left">
 Establishing New Patient Identity | Registry Node: ITBIN-2211-0249
 </p>
 </div>
 </div>
 
 <Button 
 variant="outline"
 onClick={() => navigate('/dashboard/patients')}
 className="h-12 px-8 border-2 border-primary text-primary font-poppins  uppercase  text-[10px] hover:bg-primary hover:text-white  transition-all group"
 >
 <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
 Cancel Registration
 </Button>
 </div>

 {/* 2. ONBOARDING FORM */}
 <form onSubmit={handleRegister} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
 
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
 
 {/* SECTION A: PATIENT IDENTITY */}
 <div className="bg-card  p-8  border border-border space-y-6">
 <div className="flex items-center gap-3 text-primary border-b border-primary/10 pb-4">
 <ShieldCheck size={20} />
 <span className="font-poppins  text-[11px] uppercase ">Patient Identity</span>
 </div>
 
 <div className="space-y-3 text-left">
 <Label className="text-[10px] font-poppins  uppercase  text-muted-foreground ml-1">Full Legal Name</Label>
 <Input required placeholder="JOHN DOE" className="h-14  bg-card border-border font-sans  uppercase " />
 </div>

 <div className="space-y-3 text-left">
 <Label className="text-[10px] font-poppins  uppercase  text-muted-foreground ml-1">National ID (NIC)</Label>
 <Input required placeholder="19XXXXXXXXXX" className="h-14  bg-card border-border font-mono text-xs " />
 </div>
 </div>

 {/* SECTION B: HEALTH SNAPSHOT */}
 <div className="bg-card  p-8  border border-border space-y-6">
 <div className="flex items-center gap-3 text-primary border-b border-primary/10 pb-4">
 <Activity size={20} />
 <span className="font-poppins  text-[11px] uppercase ">Initial Vitals</span>
 </div>
 
 <div className="grid grid-cols-2 gap-4 w-full">
 <div className="space-y-3 text-left">
 <Label className="text-[10px] font-poppins  uppercase  text-muted-foreground ml-1">Blood Group</Label>
 <Select>
 <SelectTrigger className="h-14  font-sans  bg-card border-border">
 <Droplets className="mr-2 h-4 w-4 text-red-500" />
 <SelectValue placeholder="Group" />
 </SelectTrigger>
 <SelectContent className=" font-sans ">
 {['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'].map(group => (
 <SelectItem key={group} value={group}>{group}</SelectItem>
 ))}
 </SelectContent>
 </Select>
 </div>

 <div className="space-y-3 text-left">
 <Label className="text-[10px] font-poppins  uppercase  text-muted-foreground ml-1">Weight (kg)</Label>
 <div className="relative">
 <Scale className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 z-10" size={16} />
 <Input className="h-14 pl-11  bg-card border-border font-sans " placeholder="72" />
 </div>
 </div>

 <div className="space-y-3 text-left">
 <Label className="text-[10px] font-poppins  uppercase  text-muted-foreground ml-1">Height (cm)</Label>
 <div className="relative">
 <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 text-primary z-10" size={16} />
 <Input className="h-14 pl-11  bg-card border-border font-sans " placeholder="175" />
 </div>
 </div>

 <div className="space-y-3 text-left">
 <Label className="text-[10px] font-poppins  uppercase  text-muted-foreground ml-1">Temperature</Label>
 <div className="relative">
 <Thermometer className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500 z-10" size={16} />
 <Input className="h-14 pl-11  bg-card border-border font-sans " placeholder="36.8" />
 </div>
 </div>
 </div>
 </div>

 {/* SECTION C: CARE CONTACTS */}
 <div className="bg-card  p-8  border border-border space-y-6">
 <div className="flex items-center gap-3 text-primary border-b border-primary/10 pb-4">
 <Phone size={20} />
 <span className="font-poppins  text-[11px] uppercase ">Communication</span>
 </div>
 
 <div className="space-y-3 text-left">
 <Label className="text-[10px] font-poppins  uppercase  text-muted-foreground ml-1">Contact Number</Label>
 <Input required type="tel" placeholder="07XXXXXXXX" className="h-14  bg-card border-border font-sans " />
 </div>

 <div className="space-y-3 text-left">
 <Label className="text-[10px] font-poppins  uppercase  text-muted-foreground ml-1">Emergency Contact</Label>
 <Input required placeholder="Next of Kin" className="h-14  bg-card border-border font-sans " />
 </div>
 </div>
 </div>

 {/* FULL WIDTH: RESIDENTIAL DATA */}
 <div className="bg-card  p-8  border border-border space-y-6 text-left">
 <div className="flex items-center gap-3 text-primary border-b border-primary/10 pb-4">
 <MapPin size={20} />
 <span className="font-poppins  text-[11px] uppercase ">Residential Information</span>
 </div>
 <div className="space-y-3">
 <Label className="text-[10px] font-poppins  uppercase  text-muted-foreground ml-1">Permanent Home Address</Label>
 <Textarea 
 rows={3} 
 className=" border-border bg-card font-sans  text-foreground focus-visible:ring-primary/20 resize-none p-5" 
 placeholder="Please enter the full residential address..."
 />
 </div>
 </div>

 {/* FINAL ACTIONS */}
 <div className="flex flex-col sm:flex-row gap-6 pt-4 pb-12">
 <Button 
 type="submit" 
 disabled={status !== 'idle'}
 className={`flex-1 h-20  text-[12px] font-poppins  uppercase  transition-all duration-500 hover:scale-[1.02] active:scale-95 ${
 status === 'success' ? 'bg-green-600 hover:bg-green-600 ' : 'bg-primary '
 }`}
 >
 {status === 'saving' ? (
 <span className="flex items-center gap-3">
 <Loader2 size={24} className="animate-spin" /> Finalizing Records...
 </span>
 ) : status === 'success' ? (
 <span className="flex items-center gap-3">
 <CheckCircle2 size={24} /> Welcome Aboard
 </span>
 ) : (
 <span className="flex items-center gap-3">
 <Zap size={20} /> Confirm Registration
 </span>
 )}
 </Button>
 
 <Button 
 type="button" 
 variant="outline"
 onClick={() => navigate('/dashboard/patients')}
 className="px-16 h-20 border-2 border-border font-poppins  text-[12px] uppercase   hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 active:scale-95 transition-all"
 >
 Discard
 </Button>
 </div>
 </form>
 </div>
 );
};