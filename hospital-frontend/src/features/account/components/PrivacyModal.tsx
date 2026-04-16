import { ShieldCheck, Lock, Fingerprint, EyeOff } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const PrivacyModal = ({ isOpen, onClose }: any) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-[3.5rem] p-10 bg-slate-950 text-white border-white/10 font-sans [&>button]:hidden">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="p-6 bg-primary/20 rounded-full text-primary animate-pulse">
            <ShieldCheck size={48} />
          </div>
          <DialogTitle className="text-3xl font-poppins font-black uppercase tracking-tighter">Security Firewall</DialogTitle>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-relaxed">Authorized access nodes are protected under end-to-end clinical encryption protocols.</p>
        </div>

        <div className="mt-10 space-y-4">
          <Button variant="outline" className="w-full h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 gap-3 justify-start px-6 font-black uppercase text-[10px] tracking-widest">
            <Fingerprint size={18} className="text-primary" /> Multi-Factor Auth: Enabled
          </Button>
          <Button variant="outline" className="w-full h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 gap-3 justify-start px-6 font-black uppercase text-[10px] tracking-widest">
            <Lock size={18} className="text-primary" /> Session Timeout: 30 Minutes
          </Button>
          <Button variant="outline" className="w-full h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 gap-3 justify-start px-6 font-black uppercase text-[10px] tracking-widest">
            <EyeOff size={18} className="text-primary" /> Hide Confidential PHI Logs
          </Button>
        </div>

        <Button onClick={onClose} className="w-full mt-8 h-14 bg-white text-black font-black rounded-2xl uppercase tracking-widest text-[10px] hover:bg-slate-200">
          Uplink Secure
        </Button>
      </DialogContent>
    </Dialog>
  );
};