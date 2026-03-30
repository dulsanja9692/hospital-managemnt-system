import { useNavigate } from 'react-router-dom';
import { Activity, Calendar, ShieldCheck, UserCircle } from 'lucide-react';

export const PublicDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-(--bg) overflow-hidden flex flex-col items-center justify-center p-6">
      
      {/* 1. Animated Progress Bar at the Top */}
      <div className="absolute top-0 left-0 h-1 bg-(--accent) animate-progress-load z-50 shadow-[0_0_10px_var(--accent)]" />

      {/* 2. Main Content Wrapper with Blur Entry */}
      <div className="max-w-4xl w-full text-center space-y-12 animate-soft-load">
        
        {/* Hero Section */}
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="p-5 bg-(--accent-bg) rounded-full shadow-(--shadow) animate-bounce">
              <Activity className="text-(--accent)" size={56} />
            </div>
          </div>
          <h1 className="text-7xl font-black text-(--text-h) tracking-tighter">
            MediFlow <span className="text-(--accent)">+</span>
          </h1>
          <p className="text-xl text-(--text) max-w-2xl mx-auto leading-relaxed">
            Experience the future of healthcare management. Quick channeling, 
            secure records, and professional staff support.
          </p>
        </div>

        {/* Feature Grid with fadeInUp delay feel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            { icon: Calendar, title: "Channeling", desc: "Book appointments instantly" },
            { icon: ShieldCheck, title: "Secure", desc: "Privacy protected data" },
            { icon: UserCircle, title: "Specialists", desc: "Top doctors available" }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="p-6 bg-(--code-bg) border border-(--border) rounded-2xl shadow-(--shadow) hover:scale-105 transition-all duration-300 cursor-default"
            >
              <item.icon className="mx-auto text-(--accent) mb-3" size={32} />
              <h3 className="font-bold text-(--text-h)">{item.title}</h3>
              <p className="text-sm text-(--text)">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
          <button className="px-12 py-4 bg-(--accent) text-white font-bold rounded-full shadow-(--shadow) hover:brightness-110 active:scale-95 transition-all">
            Make an Appointment
          </button>
          <button 
            onClick={() => navigate('/login')}
            className="px-12 py-4 border-2 border-(--border) text-(--text-h) font-bold rounded-full hover:bg-(--code-bg) active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            Staff Portal
          </button>
        </div>

      </div>
    </div>
  );
};