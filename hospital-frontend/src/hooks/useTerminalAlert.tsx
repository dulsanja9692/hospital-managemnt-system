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
 className: " border border-white/10 bg-card  font-poppins  uppercase  text-[10px] p-4",
 });
 };

 return { showAlert };
};