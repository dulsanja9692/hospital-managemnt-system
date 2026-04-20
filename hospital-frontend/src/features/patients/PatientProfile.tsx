import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
 ArrowLeft, Edit3, ShieldCheck, Zap, 
 FileText, Fingerprint, Loader2, Plus, Activity, Pill 
} from 'lucide-react';

// Shadcn UI & Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent } from "@/components/ui/dialog"; // Ensure Dialog is imported

// Feature Components
import { VitalsMonitor } from "./components/VitalsMonitor";
import { AddMeetingModal } from "./components/AddMeetingModal";
import { CareTimeline } from "./components/CareTimeline";
import { ReportUplinkModal } from "@/components/ReportUplinkModal";
import { PrescriptionTerminal } from "../medical-records/PrescriptionTerminal"; // Import the Terminal

// Report Utility
import { generatePatientReport } from '@/lib/reportGenerator';

export const PatientProfile = () => {
 const { id } = useParams();
 const navigate = useNavigate();
 
 // Modal Orchestration State
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [isUplinkOpen, setIsUplinkOpen] = useState(false);
 const [isPrescriptionOpen, setIsPrescriptionOpen] = useState(false); // New state
 const [isGenerating, setIsGenerating] = useState(false);
 const [, setActiveEventId] = useState<string | null>(null);

 // Identity Data
 const patient = {
 id: id || 'P-1001',
 name: 'Saman Kumara',
 nic: '198522334410',
 status: 'Stable',
 lastSync: '2026-04-03 09:45'
 };

 const clinicalEvents = [
 { date: '24 APR 2026', title: 'Cardiology Consultation', provider: 'Dr. Saman Perera', notes: 'Patient reported chest tightness. ECG shows normal rhythm.', type: 'Clinical' },
 { date: '12 MAR 2026', title: 'Metabolic Screening', provider: 'Central Lab Node 01', notes: 'Full blood chemistry panel completed.', type: 'Lab' },
 { date: '05 JAN 2026', title: 'Identity Verification', provider: 'Admin Terminal', notes: 'Initial registry onboarding.', type: 'Emergency' }
 ];

 const handleDownloadReport = async () => {
 setIsGenerating(true);
 try {
 await new Promise(resolve => setTimeout(resolve, 800));
 generatePatientReport(patient, clinicalEvents);
 } finally {
 setIsGenerating(false);
 }
 };

 const handleOpenUplink = (eventId: string) => {
 setActiveEventId(eventId);
 setIsUplinkOpen(true);
 };

 const handleAddEntry = (entry: unknown) => {
 console.log("New Care Entry Secured:", entry);
 setIsModalOpen(false);
 };

 return (
 <div className="max-w-7xl mx-auto p-2 space-y-10 text-left animate-in fade-in duration-700 pb-20 font-sans antialiased">
 
 {/* 1. TOP COMMAND BAR */}
 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
 <Button 
 variant="ghost" 
 onClick={() => navigate('/dashboard/patients')}
 className="flex items-center gap-3 text-primary/60 font-poppins  uppercase  text-[10px] hover:text-primary transition-all group p-0 h-auto bg-transparent"
 >
 <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
 Back to Patient Registry
 </Button>

 <div className="flex gap-4">
 {/* NEW: ISSUE PRESCRIPTION BUTTON */}
 <Button 
 variant="outline"
 onClick={() => setIsPrescriptionOpen(true)}
 className="h-12 px-8 border-primary/20  text-primary font-poppins  uppercase  text-[10px] hover:bg-primary/5 transition-all"
 >
 <Pill size={16} className="mr-2" /> Issue Prescription
 </Button>

 <Button 
 variant="outline"
 onClick={() => navigate(`/dashboard/patients/edit/${id}`)}
 className="h-12 px-8 border-border  text-muted-foreground font-poppins  uppercase  text-[10px] hover:bg-primary/5 transition-all"
 >
 <Edit3 size={16} className="mr-2" /> Modify Profile
 </Button>
 
 <Button 
 onClick={handleDownloadReport}
 disabled={isGenerating}
 className="h-12 px-8 bg-primary text-white font-poppins  uppercase  text-[10px]  hover:scale-105 active:scale-95 transition-all gap-2"
 >
 {isGenerating ? (
 <><Loader2 size={16} className="animate-spin" /> Compiling...</>
 ) : (
 <><FileText size={16} /> Generate Health Report</>
 )}
 </Button>
 </div>
 </div>

 {/* 2. MAIN HUD LAYOUT */}
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
 <Card className="lg:col-span-1  border-border bg-card  overflow-hidden relative group">
 <div className="absolute top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/5 blur-[80px]  pointer-events-none" />
 <CardContent className="p-10 flex flex-col items-center relative z-10">
 <Avatar className="w-44 h-44  border-4 border-background mb-8 overflow-hidden">
 <AvatarFallback className="bg-card text-primary">
 <Fingerprint size={80} className="opacity-40 animate-pulse" />
 </AvatarFallback>
 </Avatar>
 <h2 className="text-2xl font-poppins  text-foreground  text-center uppercase leading-none">{patient.name}</h2>
 <Badge variant="secondary" className="mt-4 px-4 py-1 text-[10px] font-poppins  text-primary  bg-primary/10">PATIENT_REF: {patient.id}</Badge>
 <div className="mt-10 w-full pt-8 border-t border-primary/10 space-y-5 text-xs  uppercase  text-muted-foreground">
 <div className="flex justify-between"><span>Registry NIC</span><span className="text-foreground font-mono">{patient.nic}</span></div>
 <div className="flex justify-between"><span>Signal Status</span><div className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500  animate-pulse" /><span className="text-green-600">Stable</span></div></div>
 </div>
 </CardContent>
 </Card>

 <div className="lg:col-span-2 space-y-8">
 <VitalsMonitor />
 <Card className=" border-border bg-card  p-10 relative overflow-hidden border">
 <CardContent className="p-0 space-y-12">
 <div className="flex items-center justify-between border-b border-primary/10 pb-6">
 <div className="flex items-center gap-4">
 <div className="p-3 bg-primary/10  text-primary"><Zap size={20} /></div>
 <div className="text-left"><h3 className="text-xl font-poppins  text-foreground  uppercase">Patient Narrative</h3></div>
 </div>
 <Button onClick={() => setIsModalOpen(true)} className="h-10  bg-primary text-white font-poppins  uppercase  text-[10px] px-6"><Plus size={16} className="mr-2"/> New Visit Entry</Button>
 </div>
 <CareTimeline onUplinkRequest={handleOpenUplink} />
 </CardContent>
 <Activity size={240} className="absolute -bottom-10 -right-10 text-primary opacity-[0.03] rotate-12 pointer-events-none" />
 </Card>
 </div>
 </div>

 {/* MODAL LAYER ORCHESTRATION */}
 <AddMeetingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAddEntry} />
 <ReportUplinkModal isOpen={isUplinkOpen} onClose={() => setIsUplinkOpen(false)} />
 
 {/* PRESCRIPTION TERMINAL DIALOG */}
 <Dialog open={isPrescriptionOpen} onOpenChange={setIsPrescriptionOpen}>
 <DialogContent className="max-w-4xl p-0 bg-transparent border-none overflow-hidden outline-none">
 <PrescriptionTerminal />
 </DialogContent>
 </Dialog>

 <footer className="mt-12 pt-8 border-t border-primary/5 flex justify-between items-center opacity-40 text-[9px]  uppercase ">
 <div className="flex items-center gap-4"><ShieldCheck size={14} className="text-primary" /><span>Live Secure Identity Vault</span></div>
 <div className="flex items-center gap-2"><Loader2 size={14} className="animate-spin text-primary" /><span>Personnel Node: ITBIN-2211-0249</span></div>
 </footer>
 </div>
 );
};