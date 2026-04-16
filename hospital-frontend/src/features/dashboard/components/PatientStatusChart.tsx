import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ScanFace } from 'lucide-react';
import { Card } from "@/components/ui/card";

const data = [
  { name: 'Active', value: 412, color: '#22c55e' },
  { name: 'Pending', value: 98, color: '#f59e0b' },
  { name: 'Emergency', value: 24, color: '#ef4444' },
  { name: 'Discharged', value: 750, color: '#3b82f6' },
];

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return percent > 0.08 ? (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={10} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null;
};

export const PatientStatusChart = () => {
  return (
    <Card className="rounded-3xl border border-border/40 bg-card/60 backdrop-blur-xl p-6 shadow-lg h-full">
      <div className="flex items-center gap-3 mb-6 text-left">
        <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-500">
          <ScanFace size={18} />
        </div>
        <div>
          <h3 className="text-sm font-poppins font-bold text-foreground tracking-tight">Patient Status</h3>
          <p className="text-[10px] font-sans text-muted-foreground uppercase tracking-widest mt-0.5">Current registry breakdown</p>
        </div>
      </div>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
              labelLine={false}
              label={renderCustomLabel}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', fontSize: '11px' }}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value) => <span style={{ fontSize: '10px', fontWeight: 600, color: 'hsl(var(--muted-foreground))' }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
