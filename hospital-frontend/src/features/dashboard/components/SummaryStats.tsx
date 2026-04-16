import { Users, UserCheck, CalendarClock, ShieldCheck, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card } from "@/components/ui/card";

const stats = [
  { 
    label: 'Total Registry', 
    value: '1,284', 
    trend: '+14%', 
    trendUp: true, 
    icon: <Users size={20} />, 
    color: 'text-blue-500', 
    bg: 'bg-blue-500/10' 
  },
  { 
    label: 'Specialists Active', 
    value: '42', 
    trend: 'Stable', 
    trendUp: true, 
    icon: <UserCheck size={20} />, 
    color: 'text-emerald-500', 
    bg: 'bg-emerald-500/10' 
  },
  { 
    label: 'Pending Visits', 
    value: '18', 
    trend: '-4%', 
    trendUp: false, 
    icon: <CalendarClock size={20} />, 
    color: 'text-amber-500', 
    bg: 'bg-amber-500/10' 
  },
  { 
    label: 'Node Stability', 
    value: '99.9%', 
    trend: 'SECURE', 
    trendUp: true, 
    icon: <ShieldCheck size={20} />, 
    color: 'text-primary', 
    bg: 'bg-primary/10' 
  },
];

export const SummaryStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <Card key={i} className="rounded-[2.5rem] border-white/10 bg-card/40 backdrop-blur-3xl p-6 hover:border-primary/30 transition-all group relative overflow-hidden shadow-2xl">
          <div className="flex justify-between items-start">
            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <div className={`flex items-center gap-1 text-[10px] font-poppins font-black uppercase tracking-tighter ${stat.trendUp ? 'text-green-500' : 'text-red-500'}`}>
              {stat.trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              {stat.trend}
            </div>
          </div>

          <div className="mt-6 text-left">
            <h4 className="text-[10px] font-sans font-black text-muted-foreground uppercase tracking-[0.3em]">
              {stat.label}
            </h4>
            <p className="text-3xl font-poppins font-black text-foreground mt-1 tracking-tighter">
              {stat.value}
            </p>
          </div>

          {/* Decorative background pulse */}
          <div className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-[40px] opacity-10 ${stat.bg}`} />
        </Card>
      ))}
    </div>
  );
};