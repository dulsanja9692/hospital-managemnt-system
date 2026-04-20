import { 
 Stethoscope, Beaker, Activity, ChevronRight, 
 FileText, Paperclip 
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TimelineEvent {
 id: string; 
 date: string;
 title: string;
 provider: string;
 notes: string;
 type: 'Clinical' | 'Lab' | 'Emergency';
 hasReport?: boolean; 
}

const events: TimelineEvent[] = [
 {
 id: 'EVT-001',
 date: '24 APR 2026',
 title: 'Cardiology Consultation',
 provider: 'Dr. Saman Perera',
 notes: 'Patient reported chest tightness. ECG shows normal rhythm. Scheduled follow-up in 2 weeks.',
 type: 'Clinical',
 hasReport: true
 },
 {
 id: 'EVT-002',
 date: '12 MAR 2026',
 title: 'Metabolic Screening',
 provider: 'Central Lab Node 01',
 notes: 'Full blood chemistry panel completed. Glucose levels within stable parameters.',
 type: 'Lab',
 hasReport: true
 },
 {
 id: 'EVT-003',
 date: '05 JAN 2026',
 title: 'Identity Verification',
 provider: 'Admin Terminal',
 notes: 'Initial registry onboarding. Biometric data synchronized with national health vault.',
 type: 'Emergency',
 hasReport: false
 }
];

export const CareTimeline = ({ onUplinkRequest }: { onUplinkRequest?: (id: string) => void }) => {
 return (
 <div className="space-y-10 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-0.5 before:bg-primary/10">
 {events.map((event, idx) => (
 <div key={idx} className="relative pl-14 group transition-all">
 
 {/* Timeline Icon Node */}
 <div className="absolute left-0 top-0 w-10 h-10  bg-card border border-border flex items-center justify-center text-primary group-hover:border-primary  transition-all z-10">
 {event.type === 'Clinical' && <Stethoscope size={18} />}
 {event.type === 'Lab' && <Beaker size={18} />}
 {event.type === 'Emergency' && <Activity size={18} />}
 </div>

 {/* Event Content Container */}
 <div className="text-left space-y-2 font-sans antialiased">
 <div className="flex items-center gap-3">
 <span className="text-[10px] font-poppins  text-primary uppercase ">
 {event.date}
 </span>
 <Badge variant="outline" className="text-[8px] font-poppins  uppercase border-primary/20 bg-primary/5">
 {event.type}
 </Badge>
 </div>

 <h4 className="text-lg font-poppins  text-foreground uppercase  leading-none">
 {event.title}
 </h4>

 {/* Content Bubble */}
 <div className="p-5 bg-card  border border-border  group-hover:border-primary/20 transition-all">
 <p className="text-sm  text-muted-foreground leading-relaxed">
 "{event.notes}"
 </p>
 
 <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/20">
 <div className="flex items-center gap-3">
 <span className="text-[9px]  text-muted-foreground uppercase ">
 Case Lead: {event.provider}
 </span>
 
 {/* SECURE DOCUMENT TAG */}
 {event.hasReport && (
 <Badge variant="outline" className="h-6 gap-2 text-[8px] font-poppins  uppercase text-primary bg-primary/5 hover:bg-primary/10 cursor-pointer transition-all">
 <FileText size={11} /> View Report.pdf
 </Badge>
 )}
 </div>

 <div className="flex items-center gap-2">
 <Button 
 variant="ghost" 
 size="icon" 
 className="h-8 w-8 text-primary/40 hover:text-primary transition-all hover:bg-primary/5"
 onClick={() => onUplinkRequest?.(event.id)}
 >
 <Paperclip size={14} />
 </Button>
 <ChevronRight size={14} className="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
 </div>
 </div>
 </div>
 </div>
 </div>
 ))}
 </div>
 );
};