import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, ArrowUpRight, Users } from 'lucide-react';

const data = [
  { time: '08:00', patients: 12 }, { time: '10:00', patients: 45 }, { time: '12:00', patients: 30 },
  { time: '14:00', patients: 65 }, { time: '16:00', patients: 50 }, { time: '18:00', patients: 20 }, { time: '20:00', patients: 10 },
];

export const RegistryPulse = () => {
  return (
    <div className="space-y-6 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-left">
          <div className="p-3 bg-primary/10 rounded-xl text-primary animate-pulse"><Activity size={20} /></div>
          <div>
            <h3 className="text-xl font-poppins font-black text-foreground tracking-tighter uppercase leading-none">Registry Pulse</h3>
            <p className="text-[9px] font-sans font-bold text-muted-foreground uppercase tracking-[0.3em] mt-2">Live Throughput Telemetry</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-green-500 font-poppins font-black text-xs"><ArrowUpRight size={14} /> +12%</div>
          <p className="text-[8px] font-sans font-black text-muted-foreground uppercase tracking-widest text-right">vs Last Cycle</p>
        </div>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPulse" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} dy={10} />
            <YAxis hide={true} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px', color: '#fff' }} />
            <Area type="monotone" dataKey="patients" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorPulse)" animationDuration={2000} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary/5">
        <div className="flex items-center gap-3"><Users size={14} className="text-primary/40" /><span className="text-[10px] font-sans font-bold text-muted-foreground uppercase tracking-widest">Active Cases: <span className="text-foreground">182</span></span></div>
        <div className="text-right"><span className="text-[10px] font-sans font-bold text-muted-foreground uppercase tracking-widest">Stability: <span className="text-green-500 font-black">99.9%</span></span></div>
      </div>
    </div>
  );
};