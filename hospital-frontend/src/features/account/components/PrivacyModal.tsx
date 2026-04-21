import { useState } from 'react';
import { ShieldCheck, Lock, Fingerprint, EyeOff, X, Edit2, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const PrivacyModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [editingKey, setEditingKey]   = useState<string | null>(null);
  const [mfaEnabled, setMfaEnabled]   = useState(true);
  const [timeout, setTimeout]         = useState('30');
  const [phiHidden, setPhiHidden]     = useState(true);

  const handleSave = () => setEditingKey(null);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-10 bg-card border-border font-sans [&>button]:hidden">

        {/* ── Header ─────────────────────────────────── */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 text-primary">
              <ShieldCheck size={24} />
            </div>
            <div>
              <DialogTitle className="text-2xl font-poppins uppercase leading-none">
                Security Firewall
              </DialogTitle>
              <p className="text-[10px] text-muted-foreground uppercase mt-1">
                Privacy &amp; Data Protection Protocol
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={20} />
          </Button>
        </div>

        {/* ── Description ────────────────────────────── */}
        <p className="text-xs text-muted-foreground uppercase leading-relaxed mb-8 border-l-2 border-primary/40 pl-4">
          Authorized access nodes are protected under end-to-end clinical encryption protocols.
          All patient health data is handled in compliance with HIPAA &amp; ISO 27001 standards.
        </p>

        {/* ── Items ──────────────────────────────────── */}
        <div className="space-y-3">

          {/* Multi-Factor Auth */}
          <div className="border border-border bg-muted hover:border-primary/30 transition-all">
            <div className="flex items-center justify-between p-5 group">
              <div className="flex items-center gap-4">
                <Fingerprint size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                <div>
                  <p className="text-xs uppercase text-foreground">Multi-Factor Auth</p>
                  {editingKey !== 'mfa' && (
                    <p className="text-[10px] text-primary uppercase font-semibold mt-0.5">
                      {mfaEnabled ? 'Enabled' : 'Disabled'}
                    </p>
                  )}
                </div>
              </div>
              {editingKey === 'mfa' ? (
                <Button size="sm" onClick={handleSave} className="h-8 px-3 text-[10px] uppercase gap-1.5">
                  <Check size={13} /> Save
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingKey('mfa')}
                  className="h-8 px-3 text-[10px] uppercase gap-1.5 border-primary/20 text-primary hover:bg-primary/5"
                >
                  <Edit2 size={13} /> Edit
                </Button>
              )}
            </div>
            {editingKey === 'mfa' && (
              <div className="px-5 pb-5 flex items-center gap-3 border-t border-border pt-4">
                <Switch
                  checked={mfaEnabled}
                  onCheckedChange={setMfaEnabled}
                  id="mfa-switch"
                />
                <label htmlFor="mfa-switch" className="text-xs uppercase text-muted-foreground cursor-pointer select-none">
                  {mfaEnabled ? 'Click to disable MFA' : 'Click to enable MFA'}
                </label>
              </div>
            )}
          </div>

          {/* Session Timeout */}
          <div className="border border-border bg-muted hover:border-primary/30 transition-all">
            <div className="flex items-center justify-between p-5 group">
              <div className="flex items-center gap-4">
                <Lock size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                <div>
                  <p className="text-xs uppercase text-foreground">Session Timeout</p>
                  {editingKey !== 'timeout' && (
                    <p className="text-[10px] text-primary uppercase font-semibold mt-0.5">
                      {timeout} Minutes
                    </p>
                  )}
                </div>
              </div>
              {editingKey === 'timeout' ? (
                <Button size="sm" onClick={handleSave} className="h-8 px-3 text-[10px] uppercase gap-1.5">
                  <Check size={13} /> Save
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingKey('timeout')}
                  className="h-8 px-3 text-[10px] uppercase gap-1.5 border-primary/20 text-primary hover:bg-primary/5"
                >
                  <Edit2 size={13} /> Edit
                </Button>
              )}
            </div>
            {editingKey === 'timeout' && (
              <div className="px-5 pb-5 border-t border-border pt-4">
                <Select value={timeout} onValueChange={setTimeout}>
                  <SelectTrigger className="h-11 bg-card border-primary/20 text-xs uppercase">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {['15', '30', '45', '60', '120'].map((t) => (
                      <SelectItem key={t} value={t} className="text-xs uppercase">
                        {t} Minutes
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* PHI Logs */}
          <div className="border border-border bg-muted hover:border-primary/30 transition-all">
            <div className="flex items-center justify-between p-5 group">
              <div className="flex items-center gap-4">
                <EyeOff size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                <div>
                  <p className="text-xs uppercase text-foreground">PHI Logs</p>
                  {editingKey !== 'phi' && (
                    <p className="text-[10px] text-primary uppercase font-semibold mt-0.5">
                      {phiHidden ? 'Hidden — Confidential' : 'Visible'}
                    </p>
                  )}
                </div>
              </div>
              {editingKey === 'phi' ? (
                <Button size="sm" onClick={handleSave} className="h-8 px-3 text-[10px] uppercase gap-1.5">
                  <Check size={13} /> Save
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingKey('phi')}
                  className="h-8 px-3 text-[10px] uppercase gap-1.5 border-primary/20 text-primary hover:bg-primary/5"
                >
                  <Edit2 size={13} /> Edit
                </Button>
              )}
            </div>
            {editingKey === 'phi' && (
              <div className="px-5 pb-5 flex items-center gap-3 border-t border-border pt-4">
                <Switch
                  checked={phiHidden}
                  onCheckedChange={setPhiHidden}
                  id="phi-switch"
                />
                <label htmlFor="phi-switch" className="text-xs uppercase text-muted-foreground cursor-pointer select-none">
                  {phiHidden ? 'PHI logs are hidden' : 'PHI logs are visible'}
                </label>
              </div>
            )}
          </div>

        </div>

        {/* ── Footer ─────────────────────────────────── */}
        <Button
          onClick={onClose}
          className="w-full mt-8 h-14 uppercase text-[10px] tracking-widest"
        >
          Uplink Secure — Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};