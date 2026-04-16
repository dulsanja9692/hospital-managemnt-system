import { useState } from 'react';
import { X, User, Save, Edit2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const ProfileDetailsModal = ({ isOpen, onClose, user }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || "System Administrator",
    phone: user?.phone || "+94 77 123 4567",
    address: user?.address || "No 12, Horizon Road, Malabe",
    email: user?.email || "admin@mediflow.com"
  });

  const handleSave = () => {
    setIsEditing(false);
    // Add logic here to sync with backend
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl rounded-[3rem] p-0 overflow-hidden border-border/40 bg-card/90 backdrop-blur-3xl shadow-2xl font-sans [&>button]:hidden">
        <div className="h-32 bg-linear-to-r from-primary to-purple-600/40 p-8 flex justify-between items-start">
          <div className="p-4 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20">
            <User className="text-white" size={32} />
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/10 rounded-xl">
            <X size={24} />
          </Button>
        </div>

        <div className="p-10 -mt-12 space-y-8">
          <div className="flex justify-between items-end">
            <div>
               <DialogTitle className="text-3xl font-poppins font-black uppercase tracking-tighter">Personnel Profile</DialogTitle>
               <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Node ID: {user?.id || 'ITBIN-2211-0249'}</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(!isEditing)}
              className="rounded-2xl border-primary/20 text-primary font-black uppercase text-[10px] tracking-widest px-4 h-10 hover:bg-primary/5"
            >
              {isEditing ? "Discard" : <><Edit2 size={14} className="mr-2" /> Modify</>}
            </Button>
          </div>

          <div className="grid gap-6 text-left">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-muted-foreground tracking-[0.3em] ml-2">Legal Identity</label>
              {isEditing ? (
                <Input value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="h-14 rounded-2xl bg-white/5 border-primary/20 font-bold" />
              ) : (
                <div className="p-5 bg-muted/30 border border-border rounded-[2rem] font-bold text-foreground">{profile.name}</div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-muted-foreground tracking-[0.3em] ml-2">Secure Line</label>
              {isEditing ? (
                <Input value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} className="h-14 rounded-2xl bg-white/5 border-primary/20 font-bold" />
              ) : (
                <div className="p-5 bg-muted/30 border border-border rounded-[2rem] font-bold text-foreground">{profile.phone}</div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-muted-foreground tracking-[0.3em] ml-2">Neural Link (Email)</label>
              {isEditing ? (
                <Input value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} className="h-14 rounded-2xl bg-white/5 border-primary/20 font-bold" />
              ) : (
                <div className="p-5 bg-muted/30 border border-border rounded-[2rem] font-bold text-foreground">{profile.email}</div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-muted-foreground tracking-[0.3em] ml-2">Node Location</label>
              {isEditing ? (
                <Input value={profile.address} onChange={(e) => setProfile({...profile, address: e.target.value})} className="h-14 rounded-2xl bg-white/5 border-primary/20 font-bold" />
              ) : (
                <div className="p-5 bg-muted/30 border border-border rounded-[2rem] font-bold text-foreground">{profile.address}</div>
              )}
            </div>
          </div>

          {isEditing && (
            <Button onClick={handleSave} className="w-full h-16 bg-primary text-white font-black rounded-3xl gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all uppercase tracking-widest">
              <Save size={20} /> Commit Changes
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};