import { useState } from 'react';
import { X, User, Save, Edit2, Phone, Mail, MapPin, BadgeCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ProfileDetailsModal = ({ isOpen, onClose, user }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name:    user?.name    || 'System Administrator',
    phone:   user?.phone   || '+94 77 123 4567',
    address: user?.address || 'No 12, Horizon Road, Malabe',
    email:   user?.email   || 'admin@mediflow.com',
  });

  const handleSave = () => {
    setIsEditing(false);
    // TODO: sync with backend
  };

  const fields = [
    { key: 'name',    label: 'Legal Identity',     icon: User,       desc: 'Full registered name' },
    { key: 'email',   label: 'Neural Link',         icon: Mail,       desc: 'Primary contact email' },
    { key: 'phone',   label: 'Secure Line',         icon: Phone,      desc: 'Contact number' },
    { key: 'address', label: 'Node Location',       icon: MapPin,     desc: 'Registered address' },
  ] as const;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-10 bg-card border-border font-sans [&>button]:hidden">

        {/* ── Header ─────────────────────────────────── */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 text-primary">
              <User size={24} />
            </div>
            <div>
              <DialogTitle className="text-2xl font-poppins uppercase leading-none">
                Personnel Profile
              </DialogTitle>
              <p className="text-[10px] text-muted-foreground uppercase mt-1">
                Node ID: {user?.user_id?.slice(0, 13) || 'ITBIN-2211-0249'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="h-8 px-3 text-[10px] uppercase gap-1.5 border-primary/20 text-primary hover:bg-primary/5"
            >
              <Edit2 size={13} />
              {isEditing ? 'Discard' : 'Modify'}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X size={20} />
            </Button>
          </div>
        </div>

        {/* ── Role Badge ─────────────────────────────── */}
        <div className="flex items-center gap-3 p-4 bg-muted border border-border mb-6">
          <BadgeCheck size={16} className="text-primary shrink-0" />
          <div>
            <p className="text-[9px] uppercase text-muted-foreground">Access Role</p>
            <p className="text-xs uppercase text-foreground font-semibold mt-0.5">
              {user?.role || 'Super Admin'}
            </p>
          </div>
        </div>

        {/* ── Fields ─────────────────────────────────── */}
        <div className="space-y-3">
          {fields.map(({ key, label, icon: Icon, desc }) => (
            <div key={key} className="border border-border bg-muted hover:border-primary/30 transition-all group">
              <div className="flex items-center gap-4 px-5 pt-4 pb-1">
                <Icon size={15} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                <div>
                  <p className="text-[9px] uppercase text-muted-foreground">{label}</p>
                  <p className="text-[9px] text-muted-foreground/60 uppercase">{desc}</p>
                </div>
              </div>
              <div className="px-5 pb-4 pt-1">
                {isEditing ? (
                  <Input
                    value={profile[key]}
                    onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                    className="h-11 bg-card border-primary/20 text-xs"
                  />
                ) : (
                  <p className="text-sm text-foreground font-medium pl-0.5">{profile[key]}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── Footer ─────────────────────────────────── */}
        {isEditing ? (
          <Button
            onClick={handleSave}
            className="w-full mt-8 h-14 uppercase text-[10px] tracking-widest gap-2"
          >
            <Save size={16} /> Commit Changes
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full mt-8 h-14 uppercase text-[10px] tracking-widest border-border hover:bg-muted"
          >
            Close Profile
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};