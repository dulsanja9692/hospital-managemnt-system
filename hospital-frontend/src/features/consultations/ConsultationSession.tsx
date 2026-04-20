import { useState } from 'react';
import { 
 FileText, Pill, ClipboardList, Save, 
 User, Activity, History, Zap 
} from 'lucide-react';

// Shadcn UI Imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Now being used!
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ConsultationSession = () => {
 const [prescription, setPrescription] = useState([{ drug: '', dosage: '', duration: '' }]);

 const addDrug = () => setPrescription([...prescription, { drug: '', dosage: '', duration: '' }]);

 return (
 <div className="max-w-7xl mx-auto p-2 space-y-8 animate-in fade-in duration-700 text-left pb-20 font-sans">
 
 {/* 1. CLINICAL HUD HEADER */}
 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
 <div className="flex items-center gap-5">
 <div className="p-4 bg-primary  text-white ">
 <ClipboardList size={28} />
 </div>
 <div>
 <h2 className="text-2xl  text-foreground  uppercase leading-none">
 Clinical <span className="text-primary">Consultation</span>
 </h2>
 <p className="text-[10px]  text-muted-foreground uppercase  mt-2">
 Session Active • Electronic Health Record (EHR)
 </p>
 </div>
 </div>
 <Badge variant="outline" className="px-6 py-2  border-primary/20 bg-primary/5 text-primary  uppercase  text-[10px]">
 Live Session Syncing
 </Badge>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
 
 {/* LEFT: PATIENT CONTEXT (HUD) */}
 <div className="space-y-6">
 <Card className="border-border bg-card   overflow-hidden">
 <CardHeader className="bg-primary/5 p-6 border-b border-border/20 text-left">
 <div className="flex items-center gap-3">
 <div className="w-12 h-12 bg-background  flex items-center justify-center text-primary ">
 <User size={24} />
 </div>
 <div>
 <CardTitle className="text-lg  uppercase ">Saman Kumara</CardTitle>
 <p className="text-[9px]  text-muted-foreground uppercase ">REF: P-1001 • Male • 42y</p>
 </div>
 </div>
 </CardHeader>
 <CardContent className="p-6 space-y-4">
 <div className="grid grid-cols-2 gap-3">
 <div className="p-3 bg-card  border border-border text-left">
 <Label className="text-[8px]  uppercase text-muted-foreground  mb-1 block">Weight</Label>
 <p className="text-sm  text-foreground">72 KG</p>
 </div>
 <div className="p-3 bg-card  border border-border text-left">
 <Label className="text-[8px]  uppercase text-muted-foreground  mb-1 block">Temp</Label>
 <p className="text-sm  text-foreground">36.8 °C</p>
 </div>
 </div>
 <div className="p-4 bg-red-500/5  border border-red-500/10 text-left">
 <Label className="text-[8px]  uppercase text-red-500  flex items-center gap-2 mb-1">
 <Activity size={10} /> Critical Alerts
 </Label>
 <p className="text-[10px]  text-foreground mt-1">N/A - No Allergies Detected</p>
 </div>
 </CardContent>
 </Card>

 <Card className="border-border bg-card   ">
 <CardHeader className="p-6 pb-0 flex flex-row items-center gap-3 space-y-0 text-left">
 <History size={16} className="text-primary" />
 <CardTitle className="text-sm  uppercase ">Past History</CardTitle>
 </CardHeader>
 <CardContent className="p-6 text-left">
 <ScrollArea className="h-40 pr-4">
 <div className="space-y-4 opacity-40">
 <div className="border-l-2 border-primary/20 pl-4">
 <p className="text-[10px]  ">MAR 12, 2026</p>
 <p className="text-[11px] ">Routine Checkup - Normal</p>
 </div>
 </div>
 </ScrollArea>
 </CardContent>
 </Card>
 </div>

 {/* RIGHT: MEDICAL RECORD FORM */}
 <div className="lg:col-span-2 space-y-8 text-left">
 <Card className="border-border bg-card   ">
 <CardContent className="p-10 space-y-8">
 
 {/* Add Notes Section */}
 <div className="space-y-4">
 <div className="flex items-center gap-3 text-primary border-b border-primary/10 pb-4">
 <FileText size={20} />
 <Label className=" text-[11px] uppercase  cursor-default">Clinical Notes & Observations</Label>
 </div>
 <Textarea 
 placeholder="ENTER CLINICAL OBSERVATIONS, DIAGNOSIS, AND SYMPTOMS..."
 className="min-h-50  bg-card border-border p-6  text-foreground placeholder:text-muted-foreground/20 focus-visible:ring-primary/20"
 />
 </div>

 {/* Add Prescription Section */}
 <div className="space-y-4">
 <div className="flex items-center justify-between text-primary border-b border-primary/10 pb-4">
 <div className="flex items-center gap-3">
 <Pill size={20} />
 <Label className=" text-[11px] uppercase  cursor-default">Medication Protocol</Label>
 </div>
 <Button variant="ghost" onClick={addDrug} className="h-8 px-4  text-[9px]  uppercase  bg-primary/10 hover:bg-primary hover:text-white transition-all">
 + Add Medication
 </Button>
 </div>
 
 <div className="space-y-4">
 {prescription.map((_, i) => (
 <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in slide-in-from-right-2 duration-500">
 <div className="space-y-2">
 <Label className="text-[9px]  uppercase  text-muted-foreground ml-1">Drug</Label>
 <Input placeholder="DRUG NAME" className="h-12  bg-card " />
 </div>
 <div className="space-y-2">
 <Label className="text-[9px]  uppercase  text-muted-foreground ml-1">Dosage</Label>
 <Input placeholder="1-0-1" className="h-12  bg-card " />
 </div>
 <div className="space-y-2">
 <Label className="text-[9px]  uppercase  text-muted-foreground ml-1">Duration</Label>
 <Input placeholder="Days" className="h-12  bg-card " />
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* Final Submit Actions */}
 <div className="pt-8 border-t border-border/20 flex flex-col sm:flex-row gap-4">
 <Button className="flex-1 h-16 bg-primary text-white    hover:scale-[1.02] active:scale-95 transition-all gap-3 uppercase  text-[11px]">
 <Save size={20} /> Updated
 </Button>
 <Button variant="outline" className="h-16 px-10 border-border   text-[11px] uppercase  hover:bg-red-500/10 hover:text-red-500 transition-all">
 Cancel Session
 </Button>
 </div>

 <div className="flex justify-center items-center gap-2 opacity-20">
 <Zap size={12} className="text-primary" />
 <span className="text-[8px]  uppercase ">I029 • Biometric Encrypted Record</span>
 </div>
 </CardContent>
 </Card>
 </div>
 </div>
 </div>
 );
};