import { useState } from 'react';
import { X, User, Save, Edit2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
 <DialogContent className="sm:max-w-xl  p-0 overflow-hidden border-border bg-card  font-sans [&>button]:hidden">
 <div className="h-32 bg-linear-to-r from-primary to-purple-600/40 p-8 flex justify-between items-start">
 <div className="p-4 bg-card   border border-border">
 <User className="text-white" size={32} />
 </div>
 <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-card ">
 <X size={24} />
 </Button>
 </div>

 <div className="p-10 -mt-12 space-y-8">
 <div className="flex justify-between items-end">
 <div>
 <DialogTitle className="text-2xl font-poppins  uppercase ">Personnel Profile</DialogTitle>
 <p className="text-[10px]  text-muted-foreground uppercase  mt-1">Node ID: {user?.id || 'ITBIN-2211-0249'}</p>
 </div>
 <Button 
 variant="outline" 
 onClick={() => setIsEditing(!isEditing)}
 className=" border-primary/20 text-primary  uppercase text-[10px]  px-4 h-10 hover:bg-primary/5"
 >
 {isEditing ? "Discard" : <><Edit2 size={14} className="mr-2" /> Modify</>}
 </Button>
 </div>

 <div className="grid gap-6 text-left">
 <div className="space-y-2">
 <label className="text-[9px]  uppercase text-muted-foreground  ml-2">Legal Identity</label>
 {isEditing ? (
 <Input value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="h-14  bg-card border-primary/20 " />
 ) : (
 <div className="p-5 bg-muted border border-border   text-foreground">{profile.name}</div>
 )}
 </div>

 <div className="space-y-2">
 <label className="text-[9px]  uppercase text-muted-foreground  ml-2">Secure Line</label>
 {isEditing ? (
 <Input value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} className="h-14  bg-card border-primary/20 " />
 ) : (
 <div className="p-5 bg-muted border border-border   text-foreground">{profile.phone}</div>
 )}
 </div>

 <div className="space-y-2">
 <label className="text-[9px]  uppercase text-muted-foreground  ml-2">Neural Link (Email)</label>
 {isEditing ? (
 <Input value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} className="h-14  bg-card border-primary/20 " />
 ) : (
 <div className="p-5 bg-muted border border-border   text-foreground">{profile.email}</div>
 )}
 </div>

 <div className="space-y-2">
 <label className="text-[9px]  uppercase text-muted-foreground  ml-2">Node Location</label>
 {isEditing ? (
 <Input value={profile.address} onChange={(e) => setProfile({...profile, address: e.target.value})} className="h-14  bg-card border-primary/20 " />
 ) : (
 <div className="p-5 bg-muted border border-border   text-foreground">{profile.address}</div>
 )}
 </div>
 </div>

 {isEditing && (
 <Button onClick={handleSave} className="w-full h-16 bg-primary text-white   gap-3  hover:scale-[1.02] transition-all uppercase ">
 <Save size={20} /> Commit Changes
 </Button>
 )}
 </div>
 </DialogContent>
 </Dialog>
 );
};