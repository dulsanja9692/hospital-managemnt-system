import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CalendarSearch } from 'lucide-react';
import { Card } from "@/components/ui/card";

const data = [
 { day: 'Mon', appointments: 24 },
 { day: 'Tue', appointments: 38 },
 { day: 'Wed', appointments: 31 },
 { day: 'Thu', appointments: 52 },
 { day: 'Fri', appointments: 45 },
 { day: 'Sat', appointments: 18 },
 { day: 'Sun', appointments: 9 },
];

const COLORS = ['#3b82f6', '#3b82f6', '#3b82f6', '#6366f1', '#3b82f6', '#3b82f6', '#3b82f6'];

export const AppointmentBarChart = () => {
 return (
 <Card className=" border border-border bg-card  p-6 h-full">
 <div className="flex items-center gap-3 mb-6 text-left">
 <div className="p-2.5 bg-violet-500/10  text-violet-500">
 <CalendarSearch size={18} />
 </div>
 <div>
 <h3 className="text-sm font-poppins  text-foreground ">Weekly Appointments</h3>
 <p className="text-[10px] font-sans text-muted-foreground uppercase  mt-0.5">This week's schedule load</p>
 </div>
 </div>
 <div className="h-[200px] w-full">
 <ResponsiveContainer width="100%" height="100%">
 <BarChart data={data} barSize={20}>
 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.1)" />
 <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }} />
 <YAxis hide />
 <Tooltip
 cursor={{ fill: 'rgba(99,102,241,0.05)', radius: 8 }}
 contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', fontSize: '11px' }}
 />
 <Bar dataKey="appointments" radius={[6, 6, 0, 0]}>
 {data.map((_, index) => (
 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} fillOpacity={index === 3 ? 1 : 0.6} />
 ))}
 </Bar>
 </BarChart>
 </ResponsiveContainer>
 </div>
 </Card>
 );
};
