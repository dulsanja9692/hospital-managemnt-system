import { UserPlus, AlertTriangle, Zap } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const specialists = [
 { name: 'Dr. Saman Perera', dept: 'Cardiology', load: 85, status: 'Overload' },
 { name: 'Dr. Nirmani Silva', dept: 'Neurology', load: 40, status: 'Optimal' },
 { name: 'Dr. Aruna Bandara', dept: 'General', load: 15, status: 'Available' },
];

export const LoadBalancer = () => {
 return (
 <Card className=" border-border bg-card  p-8 border relative overflow-hidden h-full">
 <div className="space-y-6">
 <div className="flex items-center gap-4 text-left">
 <div className="p-3 bg-primary/10  text-primary"><Zap size={20} /></div>
 <div>
 <h3 className="text-xl font-poppins  text-foreground  uppercase leading-none">Load Balancer</h3>
 <p className="text-[9px] font-sans  text-muted-foreground uppercase  mt-2">Specialist Queue Metrics</p>
 </div>
 </div>

 <div className="space-y-8 pt-4">
 {specialists.map((doc, i) => (
 <div key={i} className="space-y-3 group cursor-pointer text-left">
 <div className="flex justify-between items-end">
 <div className="flex items-center gap-3">
 <Avatar className="w-8 h-8 border border-primary/20">
 <AvatarFallback className="text-[10px]  bg-primary/5">{doc.name[4]}</AvatarFallback>
 </Avatar>
 <div>
 <p className="text-xs font-poppins  text-foreground uppercase  leading-none">{doc.name}</p>
 <p className="text-[8px] font-sans  text-muted-foreground uppercase  mt-1">{doc.dept}</p>
 </div>
 </div>
 <Badge variant="outline" className={`text-[8px]  uppercase  ${doc.load > 80 ? 'border-red-500/50 text-red-500 animate-pulse' : 'border-primary/50 text-primary'}`}>{doc.status}</Badge>
 </div>
 <div className="relative">
 <Progress value={doc.load} className="h-1 bg-primary/5" />
 {doc.load > 80 && <AlertTriangle size={10} className="absolute -right-1 -top-4 text-red-500 animate-bounce" />}
 </div>
 </div>
 ))}
 </div>

 <button className="w-full mt-4 py-4 border border-dashed border-primary/20  flex items-center justify-center gap-2 hover:bg-primary/5 transition-all group">
 <UserPlus size={14} className="text-primary/40 group-hover:text-primary transition-colors" />
 <span className="text-[9px] font-poppins  text-muted-foreground group-hover:text-primary uppercase ">Optimize Node Deployments</span>
 </button>
 </div>
 </Card>
 );
};