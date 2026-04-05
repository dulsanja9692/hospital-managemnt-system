import { useNavigate } from 'react-router-dom';
import { Activity, Calendar, ShieldCheck, UserCircle, ArrowRight, Zap, Database } from 'lucide-react';

// Shadcn UI Imports
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";

export const PublicDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-background overflow-hidden flex flex-col items-center justify-center p-6 transition-colors duration-500 font-sans">
      
      {/* 1. FUTURISTIC TOP LOADING BAR (Medical Blue) */}
      <div className="absolute top-0 left-0 h-1.5 w-full bg-primary/20 z-50 overflow-hidden">
        <div className="h-full bg-primary w-1/3 animate-loading-bar shadow-[0_0_20px_hsl(var(--primary))]" />
      </div>

      {/* 2. BACKGROUND GLOW EFFECTS */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* 3. MAIN CONTENT */}
      <div className="max-w-6xl w-full text-center space-y-16 z-10">
        
        {/* HERO SECTION */}
        <div className="space-y-8">
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full group-hover:bg-primary/40 transition-all" />
              <div className="relative p-8 bg-card border-2 border-primary/20 rounded-[2.5rem] shadow-2xl transition-transform group-hover:scale-105 duration-500">
                <Activity className="text-primary animate-pulse" size={56} />
                <Badge className="absolute -top-2 -right-2 bg-green-500 hover:bg-green-600 border-4 border-background px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-green-500/20">
                  LIVE SYSTEM
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-7xl md:text-9xl font-black text-foreground tracking-tighter leading-tight">
              MediFlow <span className="text-primary">+</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
              Revolutionizing <span className="text-primary font-black uppercase tracking-tighter italic">Patient Registry</span> with 
              <span className="text-foreground font-black"> Real-time</span> Analytics and 
              <span className="text-foreground font-black"> Secure</span> Protocol.
            </p>
          </div>
        </div>

        {/* FEATURE GRID: Using Shadcn Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {[
            { icon: Calendar, title: "AI Channeling", desc: "Predictive Scheduling Engine", status: "Active", variant: "default" },
            { icon: ShieldCheck, title: "Secure Tier-4", desc: "Military Grade Encryption", status: "Protected", variant: "outline" },
            { icon: UserCircle, title: "Global Experts", desc: "Verified Specialist Network", status: "Online", variant: "secondary" }
          ].map((item, idx) => (
            <Card key={idx} className="group relative overflow-hidden bg-card/40 backdrop-blur-2xl border-border/40 rounded-[3rem] shadow-2xl hover:border-primary/50 transition-all duration-500">
              <CardContent className="p-10 space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <item.icon size={32} className="transition-transform group-hover:scale-110" />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tighter text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground font-medium leading-tight">{item.desc}</p>
                </div>
                
                <Badge variant="outline" className="rounded-full px-4 py-1 border-primary/10 bg-primary/5 text-[9px] font-black uppercase tracking-[0.2em] text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse" />
                  {item.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            className="h-20 px-12 rounded-3xl bg-primary shadow-2xl shadow-primary/40 text-lg font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all group"
          >
            Schedule Consultation
            <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={24} />
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => navigate('/login')}
            className="h-20 px-12 rounded-3xl border-2 border-border bg-card/50 backdrop-blur-md text-lg font-black uppercase tracking-widest hover:bg-muted hover:border-primary/50 active:scale-95 transition-all"
          >
            Staff Login
          </Button>
        </div>

        {/* 4. SYSTEM STATUS STRIP */}
        <div className="pt-12 flex flex-wrap justify-center gap-10 opacity-60">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-[10px] font-black tracking-[0.2em]">
              <Database className="mr-2 h-3 w-3 text-green-500" />
              DB_UPLINK: ONLINE
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-[10px] font-black tracking-[0.2em]">
              <Zap className="mr-2 h-3 w-3 text-amber-500" />
              LATENCY: 14MS
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-[10px] font-black tracking-[0.2em]">
              <ShieldCheck className="mr-2 h-3 w-3 text-red-500" />
              SSL: SECURE
            </Badge>
          </div>
        </div>

      </div>
    </div>
  );
};