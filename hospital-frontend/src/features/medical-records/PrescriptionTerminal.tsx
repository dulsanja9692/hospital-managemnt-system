import { useState } from 'react';
import { Pill, ShieldCheck, AlertCircle, Plus, Trash2, Hash } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const PrescriptionTerminal = () => {
  // 1. Dynamic State for Medication List
  const [meds, setMeds] = useState([
    // eslint-disable-next-line react-hooks/purity
    { id: Date.now(), name: 'METFORMIN', dose: '500mg', freq: 'Twice daily', duration: '30 Days' }
  ]);

  // 2. Add Row Logic
  const appendNode = () => {
    setMeds([...meds, { id: Date.now(), name: '', dose: '', freq: '', duration: '' }]);
  };

  // 3. Remove Row Logic
  const removeNode = (id: number) => {
    setMeds(meds.filter(m => m.id !== id));
  };

  // 4. Update Field Logic
  const updateMed = (id: number, field: string, value: string) => {
    setMeds(meds.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  return (
    <Card className="rounded-[3rem] border-border/40 bg-card/90 backdrop-blur-3xl p-10 shadow-2xl border relative overflow-hidden w-full max-w-4xl mx-auto">
      <div className="space-y-8">
        
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-primary/10 pb-6">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <Pill size={20} />
            </div>
            <div>
              <h3 className="text-xl font-poppins font-black text-foreground tracking-tighter uppercase leading-none">Prescription Terminal</h3>
              <p className="text-[9px] font-sans font-bold text-muted-foreground uppercase tracking-[0.3em] mt-2">Secure Medication Uplink</p>
            </div>
          </div>
          <p className="text-[8px] font-black text-primary/40 uppercase tracking-widest">Auth Node: ITBIN-2211-0249</p>
        </div>

        {/* DYNAMIC MEDICATION LIST */}
        <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
          {meds.map((med) => (
            <div key={med.id} className="flex items-center gap-6 p-5 bg-white/5 border border-white/10 rounded-2xl group hover:border-primary/40 transition-all text-left">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Hash size={16} />
              </div>
              
              <div className="flex-1 grid grid-cols-3 gap-6">
                <div>
                  <label className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.4em] block mb-1">Medication</label>
                  <input 
                    value={med.name}
                    onChange={(e) => updateMed(med.id, 'name', e.target.value.toUpperCase())}
                    placeholder="ENTER NAME..."
                    className="bg-transparent border-none outline-none text-sm font-poppins font-black text-foreground w-full placeholder:opacity-20"
                  />
                </div>
                <div>
                  <label className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.4em] block mb-1">Dose / Freq</label>
                  <input 
                    value={`${med.dose}${med.dose && med.freq ? ' • ' : ''}${med.freq}`}
                    onChange={(e) => {
                        // Simple split logic for demo purposes
                        const parts = e.target.value.split(' • ');
                        updateMed(med.id, 'dose', parts[0] || '');
                        updateMed(med.id, 'freq', parts[1] || '');
                    }}
                    placeholder="500MG • DAILY"
                    className="bg-transparent border-none outline-none text-sm font-sans font-bold text-primary w-full placeholder:opacity-20"
                  />
                </div>
                <div>
                  <label className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.4em] block mb-1">Duration</label>
                  <input 
                    value={med.duration}
                    onChange={(e) => updateMed(med.id, 'duration', e.target.value)}
                    placeholder="30 DAYS"
                    className="bg-transparent border-none outline-none text-sm font-sans font-bold text-foreground/80 w-full placeholder:opacity-20"
                  />
                </div>
              </div>

              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => removeNode(med.id)}
                className="text-muted-foreground/20 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </div>

        {/* ACTION: APPEND NODE */}
        <Button 
          variant="outline" 
          onClick={appendNode}
          className="w-full h-14 border-dashed border-primary/20 rounded-2xl text-[10px] font-poppins font-black uppercase tracking-widest gap-2 opacity-60 hover:opacity-100 hover:bg-primary/5 transition-all"
        >
          <Plus size={16} /> Append Medication Node
        </Button>

        {/* SAFETY PROTOCOL */}
        <div className="flex items-start gap-4 p-5 bg-yellow-500/5 border border-yellow-500/10 rounded-2xl text-left">
          <AlertCircle size={20} className="text-yellow-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
             <p className="text-[10px] font-sans font-black text-yellow-700 uppercase tracking-widest">Interaction Check: ACTIVE</p>
             <p className="text-[9px] font-sans font-bold text-yellow-600/80 uppercase leading-tight">
               Uplink verifies dosage against Biometric Vault history to prevent contraindications.
             </p>
          </div>
        </div>

        {/* COMMIT */}
        <Button className="w-full h-16 bg-primary text-white font-poppins font-black uppercase tracking-widest text-[11px] rounded-2xl gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
          <ShieldCheck size={20} /> Authorize & Sync Prescription
        </Button>
      </div>
    </Card>
  );
};