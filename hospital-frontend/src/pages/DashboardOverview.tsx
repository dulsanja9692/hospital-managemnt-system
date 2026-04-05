import { 
  TrendingUp, Users, CalendarCheck, 
  Activity, Clock, ArrowUpRight 
} from 'lucide-react';
import { 
  Bar, BarChart, CartesianGrid, XAxis, 
  ResponsiveContainer, Tooltip, Area, AreaChart 
} from "recharts";

// Shadcn UI Imports
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock Data for Appointments Per Day
const appointmentData = [
  { day: "Mon", count: 12 },
  { day: "Tue", count: 18 },
  { day: "Wed", count: 15 },
  { day: "Thu", count: 25 },
  { day: "Fri", count: 22 },
  { day: "Sat", count: 10 },
  { day: "Sun", count: 5 },
];

export const DashboardOverview = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-left p-2">
      
      {/* 1. KEY PERFORMANCE METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Patients", value: "1,284", icon: Users, trend: "+12%", color: "text-blue-500" },
          { label: "Today's Sessions", value: "24", icon: CalendarCheck, trend: "Stable", color: "text-primary" },
          { label: "System Load", value: "68%", icon: Activity, trend: "+4%", color: "text-green-500" },
          { label: "Avg. Wait Time", value: "14m", icon: Clock, trend: "-2m", color: "text-amber-500" },
        ].map((stat, i) => (
          <Card key={i} className="border-border/40 bg-card/60 backdrop-blur-md rounded-4xl shadow-sm hover:shadow-primary/5 transition-all">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-2xl bg-muted/50 ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
                <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-primary/10 text-primary">
                  {stat.trend} <ArrowUpRight size={10} className="ml-1" />
                </Badge>
              </div>
              <div className="mt-4">
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em]">{stat.label}</p>
                <h3 className="text-3xl font-black text-foreground tracking-tighter mt-1">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 2. MAIN ANALYTICS HUD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Appointments Volume Chart */}
        <Card className="lg:col-span-2 border-border/40 bg-card/40 backdrop-blur-3xl rounded-[3rem] shadow-2xl overflow-hidden">
          <CardHeader className="p-8 pb-0">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-primary" size={20} />
              <div>
                <CardTitle className="text-xl font-black uppercase tracking-tighter italic">Patient Traffic</CardTitle>
                <CardDescription className="text-[9px] font-bold uppercase tracking-[0.3em]">Weekly Appointment Volume Analysis</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 h-87.5">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={appointmentData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 'bold', fill: 'hsl(var(--muted-foreground))' }} 
                  dy={10}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '16px', border: '1px solid hsl(var(--border))', fontWeight: 'bold', fontSize: '12px' }}
                  cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorCount)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Live Distribution Bar Chart */}
        <Card className="border-border/40 bg-card/40 backdrop-blur-3xl rounded-[3rem] shadow-2xl">
          <CardHeader className="p-8 pb-0 text-left">
            <CardTitle className="text-xl font-black uppercase tracking-tighter italic">Daily Load</CardTitle>
            <CardDescription className="text-[9px] font-bold uppercase tracking-[0.3em]">Peak Activity Per Cycle</CardDescription>
          </CardHeader>
          <CardContent className="p-8 h-87.5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={appointmentData}>
                <Bar 
                  dataKey="count" 
                  fill="hsl(var(--primary))" 
                  radius={[10, 10, 10, 10]} 
                  opacity={0.8}
                  className="hover:opacity-100 transition-opacity"
                />
                <Tooltip cursor={{fill: 'transparent'}} content={() => null} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* FOOTER UPLINK INFO */}
      <div className="pt-8 border-t border-border/20 flex justify-between items-center opacity-30 italic">
        <p className="text-[8px] font-black tracking-[0.4em] uppercase">Mediflow Core Intelligence • ITBIN-2211-0249</p>
        <Badge variant="outline" className="text-[8px] font-black tracking-widest border-primary/20">LIVE_DATA_FEED</Badge>
      </div>
    </div>
  );
};