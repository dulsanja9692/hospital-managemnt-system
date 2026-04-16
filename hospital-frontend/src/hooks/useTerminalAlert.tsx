import { toast } from "sonner"; 
import { AlertCircle, CheckCircle2, Info } from "lucide-react";

export const useTerminalAlert = () => {
  const showAlert = (message: string, type: 'error' | 'success' | 'info') => {
    toast(message, {
      // Logic to pick the right icon based on type
      icon: type === 'error' ? (
        <AlertCircle className="text-red-500" size={16} />
      ) : type === 'success' ? (
        <CheckCircle2 className="text-green-500" size={16} />
      ) : (
        <Info className="text-blue-500" size={16} />
      ),
      // Your custom terminal styling
      className: "rounded-2xl border border-white/10 bg-card/80 backdrop-blur-3xl font-poppins font-black uppercase tracking-widest text-[10px] shadow-2xl p-4",
    });
  };

  return { showAlert };
};