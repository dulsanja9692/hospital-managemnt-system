import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
 X, ShieldCheck, Phone, MapPin,
 ClipboardList, Stethoscope, Loader2, Zap,
 Droplets, Scale, Ruler, Thermometer, Activity
} from 'lucide-react';

// Shadcn UI Imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export const EditPatientProfile = () => {
 const { id } = useParams();
 const navigate = useNavigate();
 const [isSaving, setIsSaving] = useState(false);

 const [formData, setFormData] = useState({
 name: 'Saman Kumara',
 nic: '198522334410',
 phone: '0712345678',
 emergency: 'Mrs. Kumara (Wife)',
 address: 'No. 45, Galle Road, Colombo 03',
 bloodGroup: 'A+',
 weight: '72kg',
 height: '175cm',
 temp: '36.8°C',
 status: 'Active'
 });

 const [newLog, setNewLog] = useState({
 title: '',
 doctor: '',
 department: 'OPD',
 notes: ''
 });

 const handleUpdate = (e: React.FormEvent) => {
 e.preventDefault();
 setIsSaving(true);
 
 setTimeout(() => {
 setIsSaving(false);
 navigate(`/dashboard/patients/${id}`);
 }, 1500);
 };

 return (
 <div className="max-w-7xl mx-auto p-2 space-y-10 text-left transition-all duration-500 pb-20 font-sans antialiased">
 
 {/* 1. HEADER SECTION */}
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-5">
 <div className="relative group">
 <div className="absolute inset-0 bg-primary blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
 <div className="relative p-5 bg-primary   transition-transform group-hover:scale-105">
 <Zap className="text-white" size={32} />
 </div>
 </div>
 <div>
 <h2 className="text-2xl font-poppins  text-foreground  uppercase leading-none">
 Clinical <span className="text-primary">Update</span>
 </h2>
 <p className="text-[10px] font-sans  text-muted-foreground uppercase  mt-2">
 Authorized Patient Record • ID: {id}
 </p>
 </div>
 </div>
 </div>

 <form onSubmit={handleUpdate} className="space-y-8">
 
 {/* ROW 1: IDENTITY & VITALS */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
 
 {/* Identity Card */}
 <Card className=" border-border bg-card  overflow-hidden">
 <CardHeader className="p-8 pb-4">
 <div className="flex items-center gap-3 text-primary">
 <ShieldCheck size={20} />
 <CardTitle className="font-poppins  text-[11px] uppercase ">Identity Verification</CardTitle>
 </div>
 <Separator className="bg-primary/10 mt-4" />
 </CardHeader>
 <CardContent className="px-8 space-y-6 pt-0">
 <div className="space-y-2">
 <Label className="text-[10px] font-poppins  uppercase  text-muted-foreground ml-1">Legal Full Name</Label>
 <Input 
 value={formData.name} 
 onChange={(e) => setFormData({...formData, name: e.target.value})} 
 className="h-14  bg-card border-border font-sans "
 />
 </div>
 <div className="space-y-2">
 <Label className="text-[10px] font-poppins  uppercase  text-muted-foreground ml-1">Identity Reference (NIC) — Locked</Label>
 <Input 
 value={formData.nic} 
 readOnly 
 className="h-14  bg-muted border-border/20 opacity-70 cursor-not-allowed font-mono text-xs "
 />
 </div>
 </CardContent>
 </Card>

 {/* Medical Vitals Card */}
 <Card className=" border-border bg-card  overflow-hidden">
 <CardHeader className="p-8 pb-4">
 <div className="flex items-center gap-3 text-primary">
 <Activity size={20} />
 <CardTitle className="font-poppins  text-[11px] uppercase ">Current Vitals</CardTitle>
 </div>
 <Separator className="bg-primary/10 mt-4" />
 </CardHeader>
 <CardContent className="grid grid-cols-2 gap-6 p-8 pt-0">
 <div className="space-y-2">
 <Label className="text-[10px] font-poppins  uppercase  text-muted-foreground ml-1">Blood Group</Label>
 <div className="relative group">
 <Droplets className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 z-10" size={16} />
 <Select 
 value={formData.bloodGroup} 
 onValueChange={(val: string) => setFormData({...formData, bloodGroup: val})}
 >
 <SelectTrigger className="h-14 pl-12  bg-card border-border font-sans ">
 <SelectValue placeholder="Select" />
 </SelectTrigger>
 <SelectContent className="font-sans ">
 {['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'].map(g => (
 <SelectItem key={g} value={g}>{g}</SelectItem>
 ))}
 </SelectContent>
 </Select>
 </div>
 </div>
 <div className="space-y-2">
 <Label className="text-[10px] font-poppins  uppercase  text-muted-foreground ml-1">Weight Index</Label>
 <div className="relative">
 <Scale className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 z-10" size={16} />
 <Input 
 value={formData.weight} 
 onChange={(e) => setFormData({...formData, weight: e.target.value})}
 className="h-14 pl-12  bg-card border-border font-sans " 
 />
 </div>
 </div>
 <div className="space-y-2">
 <Label className="text-[10px] font-poppins  uppercase  text-muted-foreground ml-1">Height Index</Label>
 <div className="relative">
 <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 text-primary z-10" size={16} />
 <Input 
 value={formData.height} 
 onChange={(e) => setFormData({...formData, height: e.target.value})}
 className="h-14 pl-12  bg-card border-border font-sans " 
 />
 </div>
 </div>
 <div className="space-y-2">
 <Label className="text-[10px] font-poppins  uppercase  text-muted-foreground ml-1">Body Temp</Label>
 <div className="relative">
 <Thermometer className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500 z-10" size={16} />
 <Input 
 value={formData.temp} 
 onChange={(e) => setFormData({...formData, temp: e.target.value})}
 className="h-14 pl-12  bg-card border-border font-sans " 
 />
 </div>
 </div>
 </CardContent>
 </Card>
 </div>

 {/* ROW 2: CONTACT & ADDRESS */}
 <Card className=" border-border bg-card  grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden">
 <div className="p-8 space-y-6">
 <div className="flex items-center gap-3 text-primary">
 <Phone size={20} />
 <span className="font-poppins  text-[11px] uppercase ">Patient Reach</span>
 </div>
 <Input 
 type="tel" 
 value={formData.phone} 
 onChange={(e) => setFormData({...formData, phone: e.target.value})}
 className="h-14  bg-card border-border font-sans " 
 placeholder="PRIMARY MOBILE NUMBER"
 />
 <Input 
 value={formData.emergency} 
 onChange={(e) => setFormData({...formData, emergency: e.target.value})}
 className="h-14  bg-card border-border font-sans " 
 placeholder="EMERGENCY CONTACT & RELATION"
 />
 </div>
 <div className="p-8 space-y-6 bg-primary/2 border-l border-border/20">
 <div className="flex items-center gap-3 text-primary">
 <MapPin size={20} />
 <span className="font-poppins  text-[11px] uppercase ">Permanent Residence</span>
 </div>
 <Textarea 
 rows={3} 
 value={formData.address} 
 onChange={(e) => setFormData({...formData, address: e.target.value})}
 className=" bg-card border-border resize-none font-sans  h-30 p-5" 
 placeholder="FULL RESIDENTIAL ADDRESS"
 />
 </div>
 </Card>

 {/* BLOCK 3: APPEND CLINICAL HISTORY */}
 <Card className=" border-border bg-card  overflow-hidden">
 <CardHeader className="p-10 pb-6">
 <div className="flex items-center gap-3 text-primary">
 <ClipboardList size={22} />
 <CardTitle className="font-poppins  text-[11px] uppercase ">New Clinical Observation</CardTitle>
 </div>
 <Separator className="bg-primary/10 mt-4" />
 </CardHeader>
 <CardContent className="p-10 pt-0 space-y-8">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 <div className="space-y-2">
 <Label className="text-[11px] font-poppins  uppercase  text-muted-foreground ml-1">Visit Title</Label>
 <Input 
 placeholder="e.g. Wellness Screening" 
 value={newLog.title} 
 onChange={(e) => setNewLog({...newLog, title: e.target.value})} 
 className="h-14  bg-card border-border font-sans " 
 />
 </div>
 <div className="space-y-2">
 <Label className="text-[11px] font-poppins  uppercase  text-muted-foreground ml-1">Specialist in Charge</Label>
 <div className="relative group">
 <Stethoscope size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary z-10" />
 <Input 
 placeholder="Doctor's Name..." 
 value={newLog.doctor} 
 onChange={(e) => setNewLog({...newLog, doctor: e.target.value})} 
 className="h-14 pl-12  bg-card border-border font-sans " 
 />
 </div>
 </div>
 <div className="space-y-2">
 <Label className="text-[11px] font-poppins  uppercase  text-muted-foreground ml-1">Care Unit</Label>
 <Select value={newLog.department} onValueChange={(val: string) => setNewLog({...newLog, department: val})}>
 <SelectTrigger className="h-14  bg-card border-border font-sans ">
 <SelectValue placeholder="Select Dept" />
 </SelectTrigger>
 <SelectContent className="font-sans ">
 <SelectItem value="OPD">Outpatient Care (OPD)</SelectItem>
 <SelectItem value="Cardiology">Heart & Vascular</SelectItem>
 <SelectItem value="Laboratory">Diagnostic Unit</SelectItem>
 <SelectItem value="Emergency">Urgent Care</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>
 
 <div className="space-y-2">
 <Label className="text-[11px] font-poppins  uppercase  text-muted-foreground ml-1">Physician's Notes & Findings</Label>
 <Textarea 
 rows={3} 
 placeholder="Document patient progress and treatment plan..." 
 value={newLog.notes} 
 onChange={(e) => setNewLog({...newLog, notes: e.target.value})} 
 className=" bg-card border-border resize-none font-sans  p-5"
 />
 </div>
 </CardContent>
 </Card>

 {/* ACTION BUTTONS */}
 <div className="flex flex-col sm:flex-row gap-6 pt-4">
 <Button 
 type="submit" 
 disabled={isSaving}
 className="flex-1 h-16 bg-primary text-white font-poppins  uppercase    hover:scale-[1.02] active:scale-95 transition-all gap-3"
 >
 {isSaving ? (
 <><Loader2 size={24} className="animate-spin" /> Updating Record...</>
 ) : (
 <><Zap size={20} /> Done </>
 )}
 </Button>
 
 <Button 
 type="button" 
 variant="outline"
 onClick={() => navigate(`/dashboard/patients/${id}`)} 
 className="px-16 h-16 border-2 border-border font-poppins  uppercase   hover:bg-red-500/5 hover:text-red-500 hover:border-red-500/20 active:scale-95 transition-all gap-3"
 >
 <X size={20} /> Discard
 </Button>
 </div>
 </form>
 </div>
 );
};