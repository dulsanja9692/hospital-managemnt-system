import { Settings, Moon, RefreshCcw, BellRing, X } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const SystemSettingsModal = ({ isOpen, onClose }: any) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-[3.5rem] p-10 bg-card/90 backdrop-blur-3xl border-border/40 font-sans [&>button]:hidden">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary"><Settings size={24} /></div>
            <DialogTitle className="text-2xl font-poppins font-black uppercase tracking-tighter">Console Config</DialogTitle>
          </div>
          <Button variant="ghost" onClick={onClose} className="rounded-xl"><X /></Button>
        </div>

        <div className="space-y-6">
          {[
            { label: 'Dark Mode Protocol', icon: Moon, desc: 'Optimized for low-light clinical environments' },
            { label: 'Neural Alerts', icon: BellRing, desc: 'Real-time push notifications for patient vitals' },
            { label: 'Auto-Sync Node', icon: RefreshCcw, desc: 'Continuous background database synchronization' }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-6 bg-muted/20 border border-white/5 rounded-3xl group hover:border-primary/20 transition-all">
               <div className="flex gap-4 items-center">
                  <item.icon size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  <div className="text-left">
                    <p className="text-xs font-black uppercase tracking-widest text-foreground">{item.label}</p>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase mt-1">{item.desc}</p>
                  </div>
               </div>
               <Switch />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};