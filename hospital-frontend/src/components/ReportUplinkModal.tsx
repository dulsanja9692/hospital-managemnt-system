import { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, Loader2, ShieldAlert } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const ReportUplinkModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isEncrypting, setIsEncrypting] = useState(false);

  const handleUplink = () => {
    setIsEncrypting(true);
    // Simulate encryption and Railway uplink
    setTimeout(() => {
      setIsEncrypting(false);
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-[3rem] p-0 overflow-hidden border-border/40 bg-card/90 backdrop-blur-3xl shadow-2xl font-sans">
        
        <DialogHeader className="p-8 border-b border-border/40 bg-primary/2">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 bg-primary/10 rounded-xl text-primary border border-primary/20">
              <UploadCloud size={20} />
            </div>
            <div>
              <DialogTitle className="text-2xl font-poppins font-black text-foreground tracking-tighter uppercase leading-none">Report Uplink</DialogTitle>
              <p className="text-[9px] font-sans font-bold text-muted-foreground uppercase tracking-[0.3em] mt-2">Secure Clinical File Transfer</p>
            </div>
          </div>
        </DialogHeader>

        <div className="p-10 space-y-8">
          <div 
            className="group relative border-2 border-dashed border-border/40 rounded-[2.5rem] p-12 flex flex-col items-center justify-center hover:border-primary/40 transition-all cursor-pointer bg-primary/2"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              setFile(e.dataTransfer.files[0]);
            }}
          >
            <div className="p-4 bg-background rounded-2xl shadow-sm mb-4 group-hover:scale-110 transition-transform">
              <FileText size={32} className="text-primary/40" />
            </div>
            <p className="text-[10px] font-poppins font-black uppercase tracking-widest text-muted-foreground">
              {file ? file.name : "Select Clinical PDF"}
            </p>
            <input 
              type="file" 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          <div className="flex items-center gap-3 p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-2xl">
            <ShieldAlert size={16} className="text-yellow-600 shrink-0" />
            <p className="text-[9px] font-sans font-bold text-yellow-700 uppercase leading-tight">
              Files are automatically encrypted and synchronized with the Patient Registry Node.
            </p>
          </div>

          <Button 
            disabled={!file || isEncrypting}
            onClick={handleUplink}
            className="w-full h-16 bg-primary text-white font-poppins font-black uppercase tracking-widest text-[11px] rounded-2xl gap-3 shadow-xl shadow-primary/20 transition-all hover:scale-[1.02]"
          >
            {isEncrypting ? (
              <><Loader2 size={18} className="animate-spin" /> Encrypting Payload...</>
            ) : (
              <><CheckCircle2 size={18} /> Confirm & Commit Uplink</>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};