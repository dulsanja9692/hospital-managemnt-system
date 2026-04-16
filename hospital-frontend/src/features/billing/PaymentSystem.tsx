import { useState } from 'react';
import { CreditCard, Banknote, ShieldCheck, Receipt, Printer, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// --- CUSTOM HOOKS & UTILS ---
import { generateFinancialReceipt } from '@/lib/billingGenerator';
import { useTerminalAlert } from '@/hooks/useTerminalAlert';

interface BillItem {
  name: string;
  price: number;
}

interface Patient {
  id: string;
  name: string;
}

interface PaymentSystemProps {
  patient: Patient;
  billItems: BillItem[];
}

export const PaymentSystem = ({ patient, billItems }: PaymentSystemProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  
  // 1. New State for Protocol Selection
  const [paymentProtocol, setPaymentProtocol] = useState<'card' | 'cash'>('card');
  
  const { showAlert } = useTerminalAlert();

  const totalAmount = billItems.reduce((acc: number, item: BillItem) => acc + item.price, 0);

  const handlePayment = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentDone(true);
      
      // Dynamic notification based on selected protocol
      showAlert(`TRANSACTION_AUTHORIZED via ${paymentProtocol.toUpperCase()}: LKR ${(totalAmount * 1.02).toLocaleString()}`, 'success');
    }, 2000);
  };

  const handlePrintReceipt = () => {
    if (paymentDone) {
      generateFinancialReceipt(patient, billItems);
      showAlert("FINANCIAL_NARRATIVE_COMPILED", "info");
    } else {
      showAlert("ERROR: AUTHORIZATION_REQUIRED", "error");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-700 font-sans antialiased">
      
      {/* 1. FINANCIAL GATEWAY CONTROL */}
      <Card className="rounded-[3rem] border-white/20 bg-card/40 backdrop-blur-3xl p-10 shadow-2xl border">
        <div className="space-y-8 text-left">
          <div className="flex items-center gap-4 border-b border-primary/10 pb-6">
            <div className="p-3 bg-primary/10 rounded-xl text-primary animate-pulse">
              <CreditCard size={20} />
            </div>
            <div>
              <h3 className="text-xl font-poppins font-black text-foreground tracking-tighter uppercase leading-none">Financial Gateway</h3>
              <p className="text-[9px] font-sans font-bold text-muted-foreground uppercase tracking-[0.4em] mt-2">Secure Transaction Node</p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Select Protocol</label>
            <div className="grid grid-cols-2 gap-4">
              
              {/* 2. Dynamic Credit Card Button */}
              <button 
                onClick={() => setPaymentProtocol('card')}
                disabled={paymentDone || isProcessing}
                className={`flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 ${
                  paymentProtocol === 'card' 
                  ? 'border-primary bg-primary/5 text-primary shadow-lg shadow-primary/20' 
                  : 'border-white/10 text-muted-foreground opacity-40 hover:opacity-100 hover:border-primary/40'
                }`}
              >
                <CreditCard size={18} /> 
                <span className="text-[10px] font-poppins font-black uppercase tracking-widest leading-none">Credit Card</span>
              </button>

              {/* 3. Dynamic Cash Sync Button */}
              <button 
                onClick={() => setPaymentProtocol('cash')}
                disabled={paymentDone || isProcessing}
                className={`flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 ${
                  paymentProtocol === 'cash' 
                  ? 'border-primary bg-primary/5 text-primary shadow-lg shadow-primary/20' 
                  : 'border-white/10 text-muted-foreground opacity-40 hover:opacity-100 hover:border-primary/40'
                }`}
              >
                <Banknote size={18} /> 
                <span className="text-[10px] font-poppins font-black uppercase tracking-widest leading-none">Cash Sync</span>
              </button>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="space-y-4 pt-4">
            <div className="p-5 bg-white/5 border border-white/10 rounded-3xl space-y-4">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <span>Clinical Subtotal</span>
                <span className="font-mono">LKR {totalAmount.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-primary">
                <span>Node Service Tax (2%)</span>
                <span className="font-mono">LKR {(totalAmount * 0.02).toLocaleString()}.00</span>
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                <div className="text-left">
                  <span className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em]">Final Payload</span>
                  <h4 className="text-2xl font-poppins font-black text-foreground tracking-tighter mt-1 leading-none">
                    LKR {(totalAmount * 1.02).toLocaleString()}
                  </h4>
                </div>
                <Badge variant="outline" className="text-[8px] font-black tracking-widest border-primary/20 text-primary">
                  {paymentProtocol === 'card' ? 'NETWORK / CARD' : 'NODE / CASH'}
                </Badge>
              </div>
            </div>
          </div>

          <Button 
            disabled={isProcessing || paymentDone}
            onClick={handlePayment}
            className="w-full h-16 bg-primary text-white font-poppins font-black uppercase tracking-widest text-[11px] rounded-2xl gap-3 shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all"
          >
            {isProcessing ? (
              <><Loader2 size={18} className="animate-spin" /> Authorizing...</>
            ) : paymentDone ? (
              <><ShieldCheck size={18} /> Protocol Authorized</>
            ) : (
              <><ShieldCheck size={18} /> Confirm {paymentProtocol === 'card' ? 'Transaction' : 'Cash Entry'}</>
            )}
          </Button>
        </div>
      </Card>

      {/* 2. RECEIPT OF CARE VIEW */}
      <Card className={`rounded-[3rem] border-white/20 bg-white/5 backdrop-blur-3xl p-10 border transition-all duration-1000 ${paymentDone ? 'opacity-100 translate-y-0 scale-100' : 'opacity-20 translate-y-8 scale-95 pointer-events-none'}`}>
         {/* ... (Receipt UI remains same) ... */}
         <div className="space-y-6 text-left relative h-full flex flex-col">
            <div className="flex justify-between items-start">
               <Receipt size={40} className="text-primary/40 rotate-12" />
               <Badge className="bg-primary/10 text-primary border-primary/20 font-poppins font-black text-[8px] tracking-[0.3em] uppercase px-3 py-1.5">TXN_ID: #9920</Badge>
            </div>
            
            <div className="pt-6 space-y-2">
               <h4 className="text-3xl font-poppins font-black text-foreground uppercase tracking-tighter leading-none">Receipt of Care</h4>
               <p className="text-[10px] font-sans font-bold text-muted-foreground uppercase tracking-[0.3em] mt-2">Registry ID: {patient.id} • {patient.name}</p>
            </div>

            <div className="flex-1 py-10 space-y-4 border-y border-white/10 my-6 overflow-y-auto custom-scrollbar">
               {billItems.map((item, i) => (
                 <div key={i} className="flex justify-between items-center group">
                   <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">{item.name}</span>
                   <span className="text-xs font-bold font-mono bg-white/5 px-2 py-1 rounded">LKR {item.price.toLocaleString()}</span>
                 </div>
               ))}
            </div>

            <Button 
              onClick={handlePrintReceipt}
              className="w-full h-14 bg-white/5 border border-white/10 text-foreground font-poppins font-black uppercase tracking-widest text-[10px] rounded-2xl gap-3 hover:bg-white/10 transition-all active:scale-95"
            >
              <Printer size={16} /> Print Receipt
            </Button>
         </div>
      </Card>
    </div>
  );
};