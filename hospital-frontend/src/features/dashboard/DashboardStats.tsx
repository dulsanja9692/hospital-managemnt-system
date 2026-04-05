import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Users, Activity, Clock, AlertTriangle } from "lucide-react";

export const DashboardStats = () => {
  const stats = [
    { label: "Active Inpatients", value: "124", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Avg Heart Rate", value: "72 bpm", icon: Activity, color: "text-red-500", bg: "bg-red-500/10" },
    { label: "Pending Reports", value: "18", icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Emergency Alerts", value: "02", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-600/10" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.label} className="rounded-[2.5rem] border-primary/5 bg-card/40 backdrop-blur-3xl shadow-xl hover:scale-[1.02] transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              {stat.label}
            </CardTitle>
            <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={18} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black tracking-tighter text-foreground">
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};