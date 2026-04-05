import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, Thermometer, Droplets, Activity } from "lucide-react";

export const VitalsMonitor = () => {
  const vitals = [
    { label: "Heart Rate", value: 72, unit: "BPM", icon: Heart, color: "text-red-500", progress: 72 },
    { label: "Temperature", value: 36.8, unit: "°C", icon: Thermometer, color: "text-orange-500", progress: 92 },
    { label: "Oxygen", value: 98, unit: "%", icon: Droplets, color: "text-blue-500", progress: 98 },
    { label: "Blood Pressure", value: "120/80", unit: "mmHg", icon: Activity, color: "text-green-500", progress: 80 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in zoom-in-95 duration-500">
      {vitals.map((vital) => (
        <Card key={vital.label} className="border-border/40 bg-card/40 backdrop-blur-md rounded-4xl overflow-hidden">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-left">
              {vital.label}
            </CardTitle>
            <vital.icon size={16} className={vital.color} />
          </CardHeader>
          <CardContent className="text-left">
            <div className="text-2xl font-black tracking-tighter uppercase mb-2 text-foreground">
              {vital.value} <span className="text-[10px] text-muted-foreground ml-1">{vital.unit}</span>
            </div>
            <Progress value={vital.progress} className="h-1.5 bg-muted" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};