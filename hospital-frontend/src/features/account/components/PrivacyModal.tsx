import { ShieldCheck, Lock, Fingerprint, EyeOff } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const PrivacyModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
 return (
 <Dialog open={isOpen} onOpenChange={onClose}>
 <DialogContent className="sm:max-w-lg  p-10 bg-slate-950 text-white border-border font-sans [&>button]:hidden">
 <div className="flex flex-col items-center text-center space-y-6">
 <div className="p-6 bg-primary/20  text-primary animate-pulse">
 <ShieldCheck size={48} />
 </div>
 <DialogTitle className="text-2xl font-poppins  uppercase ">Security Firewall</DialogTitle>
 <p className="text-xs text-slate-400  uppercase  leading-relaxed">Authorized access nodes are protected under end-to-end clinical encryption protocols.</p>
 </div>

 <div className="mt-10 space-y-4">
 <Button variant="outline" className="w-full h-14  border-border bg-white hover:bg-card gap-3 justify-start px-6  uppercase text-[10px] ">
 <Fingerprint size={18} className="text-primary" /> Multi-Factor Auth: Enabled
 </Button>
 <Button variant="outline" className="w-full h-14  border-border bg-white hover:bg-card gap-3 justify-start px-6  uppercase text-[10px] ">
 <Lock size={18} className="text-primary" /> Session Timeout: 30 Minutes
 </Button>
 <Button variant="outline" className="w-full h-14  border-border bg-white hover:bg-card gap-3 justify-start px-6  uppercase text-[10px] ">
 <EyeOff size={18} className="text-primary" /> Hide Confidential PHI Logs
 </Button>
 </div>

 <Button onClick={onClose} className="w-full mt-8 h-14 bg-card text-black   uppercase  text-[10px] hover:bg-slate-200">
 Uplink Secure
 </Button>
 </DialogContent>
 </Dialog>
 );
};