import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";

export const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="w-full mt-auto py-10 transition-all duration-500 font-sans">
      {/* Subtle Divider using shadcn separator */}
      <Separator className="mb-8 opacity-20 bg-primary/20" />

      <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-2">
        
        {/* Left Side: Professional Branding */}
        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-20"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary/40"></span>
          </div>
          <p className="font-sans">
            © {year} <span className="text-primary/80 font-poppins">MediFlow</span> 
            <span className="ml-2 px-2 py-0.5 border border-border rounded-md bg-muted/30 font-poppins">HMS Registry</span>
          </p>
        </div>
        
        {/* Right Side: System Telemetry & Versioning */}
        <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">
          <button className="hover:text-primary hover:tracking-[0.3em] transition-all duration-300 cursor-help font-sans">
            Network Protocol Support
          </button>
          
          {/* Using Poppins for the Badge to match Sidebar style */}
          <Badge 
            variant="outline" 
            className="rounded-full px-4 py-1.5 border-primary/10 bg-primary/5 hover:bg-primary/10 transition-colors flex items-center gap-2 group font-poppins"
          >
            {/* Live System Pulse */}
            <div className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
            </div>
            
            <span className="font-mono text-[9px] tracking-normal opacity-80 group-hover:opacity-100">
              v2.4.0-STABLE
            </span>
          </Badge>
        </div>
      </div>
    </footer>
  );
};