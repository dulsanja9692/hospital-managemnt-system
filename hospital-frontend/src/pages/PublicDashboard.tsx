import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, type Variants } from 'framer-motion'; 
import { 
  Heart, Sparkles, Globe, 
  ShieldCheck, ArrowRight 
} from 'lucide-react';

// Shadcn UI Imports
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export const PublicDashboard = () => {
  const navigate = useNavigate();

  // 1. PERSISTENT STATE MANAGEMENT
  // We check sessionStorage to see if the user has already seen the intro.
  const [phase, setPhase] = useState<'blur' | 'icon' | 'dashboard'>(() => {
    return sessionStorage.getItem('hasSeenIntro') ? 'dashboard' : 'blur';
  });

  useEffect(() => {
    // If they've already seen it, don't run the timers
    if (sessionStorage.getItem('hasSeenIntro')) return;

    const blurTimeout = setTimeout(() => setPhase('icon'), 800);
    const iconTimeout = setTimeout(() => {
      setPhase('dashboard');
      // Mark as seen so it doesn't repeat on this session
      sessionStorage.setItem('hasSeenIntro', 'true');
    }, 2200);

    return () => {
      clearTimeout(blurTimeout);
      clearTimeout(iconTimeout);
    };
  }, []);

  // --- ANIMATION VARIANTS ---
  const blurOverlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, filter: "blur(40px)", transition: { duration: 0.6 } },
    exit: { opacity: 0, filter: "blur(0px)", transition: { duration: 0.8 } }
  };

  const centralIconVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: "-50%", x: "-50%" },
    visible: { 
      opacity: 1, scale: 1, y: "-50%", x: "-50%",
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    },
    exit: { opacity: 0, scale: 1.5, transition: { duration: 0.5 } }
  };

  const dashboardContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.1 } 
    }
  };

  const elementPopInVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="relative min-h-screen bg-background overflow-hidden flex flex-col items-center justify-center p-6 font-sans antialiased">
      
      {/* 🧬 INTRO SEQUENCE LAYER (Only exists if phase is not dashboard) */}
      <AnimatePresence mode="wait">
        {phase === 'blur' && (
          <motion.div 
            key="blur"
            variants={blurOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-background/90 z-50 pointer-events-none" 
          />
        )}

        {phase === 'icon' && (
          <motion.div 
            key="icon"
            variants={centralIconVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-1/2 left-1/2 z-60 flex flex-col items-center gap-6"
          >
            <div className="relative p-10 bg-card border border-primary/20 rounded-[3rem] shadow-2xl backdrop-blur-2xl">
              <Heart className="text-primary animate-pulse" size={64} />
              <p className="mt-4 text-[9px] font-black uppercase tracking-[0.4em] text-primary/70 font-sans">
                Authenticating...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🚀 PUBLIC DASHBOARD CONTENT */}
      {/* Glow Bar (Only animates once) */}
      <div className="absolute top-0 left-0 h-1 w-full bg-primary/10 z-50 overflow-hidden">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ repeat: phase === 'dashboard' ? 0 : Infinity, duration: 2.5 }} 
          className="h-full bg-primary w-1/2" 
        />
      </div>

      <AnimatePresence>
        {phase === 'dashboard' && (
          <motion.div 
            variants={dashboardContainerVariants}
            initial={sessionStorage.getItem('hasSeenIntro') ? "visible" : "hidden"}
            animate="visible"
            className="max-w-6xl w-full text-center space-y-16 z-10" 
          >
            {/* HERO SECTION */}
            <motion.div variants={elementPopInVariants} className="space-y-10">
              <div className="flex justify-center">
                <div className="p-6 bg-card/80 border border-primary/20 rounded-[2.5rem] shadow-2xl">
                  <Heart className="text-primary" size={48} />
                </div>
              </div>

              <div className="space-y-6">
                <h1 className="text-3xl md:text-3xl font-poppins font-black text-foreground tracking-tighter">
                  MediFlow<span className="text-primary">+</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                  Tech-driven <span className="text-foreground font-bold">Compassionate Care</span>.
                </p>
              </div>
            </motion.div>

            {/* FEATURE GRID */}
            <motion.div variants={elementPopInVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Sparkles, title: "Smart Care", desc: "AI-driven scheduling" },
                { icon: Globe, title: "Universal Access", desc: "Global medical history" },
                { icon: ShieldCheck, title: "Total Privacy", desc: "Military grade encryption" }
              ].map((item, idx) => (
                <Card key={idx} className="bg-card/30 backdrop-blur-xl border-border/20 rounded-[3rem] shadow-xl">
                  <CardContent className="p-10 space-y-5 flex flex-col items-center">
                    <item.icon size={30} className="text-primary" />
                    <h3 className="text-lg font-poppins font-black uppercase text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-snug">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            {/* ACTION BUTTONS */}
            <motion.div variants={elementPopInVariants} className="flex gap-6 justify-center">
              <Button className="h-20 px-12 rounded-3xl bg-primary text-base font-poppins font-black uppercase tracking-widest group">
                Find Doctor <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
              <Button variant="outline" onClick={() => navigate('/login')} className="h-20 px-12 rounded-3xl text-base font-poppins font-black uppercase tracking-widest">
                Staff Portal
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="absolute bottom-6 text-[8px] font-black text-muted-foreground/10 uppercase tracking-[0.5em] font-sans">
        ITBIN-2211-0249 // MediFlow OS
      </p>
    </div>
  );
};