import { useState, useEffect } from 'react';
import api from '@/lib/api'; 
import { 
  CheckCircle2, Clock, Link as LinkIcon, 
  Briefcase, Zap, Loader2, History} from 'lucide-react';

// Shadcn UI Imports
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

interface ProtocolTask {
  _id: string;
  label: string;
  completed: boolean;
}

interface AuditLog {
  timestamp: string;
  message: string;
  action_code: string;
  user_name: string;
}

export const TaskOrchestrator = () => {
  const [tasks, setTasks] = useState<ProtocolTask[]>([]);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  // FETCH: Dynamic Care Protocol & Audit History
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [workflowRes, logsRes] = await Promise.all([
          api.get('/workflows/registry-348'),
          api.get('/audit-logs/registry-348')
        ]);
        setTasks(workflowRes.data.tasks || []);
        setLogs(logsRes.data || []);
      } catch (err) {
        console.error("🚨 System Sync Failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // SYNC: Update Clinical Progress
  const toggleTask = async (taskId: string) => {
    setSyncing(true);
    try {
      const task = tasks.find(t => t._id === taskId);
      if (!task) return;
      
      const newStatus = !task.completed;
      
      // Optimistic UI Update
      setTasks(prev => prev.map(t => t._id === taskId ? { ...t, completed: newStatus } : t));

      await api.patch(`/workflows/registry-348/tasks/${taskId}`, { completed: newStatus });
      
      // Refresh logs to show the new action
      const logsRes = await api.get('/audit-logs/registry-348');
      setLogs(logsRes.data);
    } catch (err) {
      console.error("🚨 Uplink Interrupted", err);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-2 grid grid-cols-1 lg:grid-cols-12 gap-8 font-sans antialiased animate-in fade-in duration-700">
      
      {/* LEFT COLUMN: CLINICAL EXECUTION */}
      <div className="lg:col-span-8 space-y-10 text-left">
        
        <div className="flex justify-between items-end">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-poppins font-black text-primary uppercase tracking-widest opacity-60">
              <Briefcase size={12} /> Registry-348 <span className="opacity-30">/</span> <LinkIcon size={12} /> Care-Protocol-355
            </div>
            <h1 className="text-3xl font-poppins font-black text-foreground tracking-tighter uppercase leading-tight">
              Clinical <span className="text-primary">Workflow</span> Integration
            </h1>
          </div>

          {syncing && (
            <div className="flex items-center gap-2 text-[10px] font-sans font-bold text-primary animate-pulse mb-2">
              <Loader2 size={12} className="animate-spin" /> SYNCHRONIZING WITH REGISTRY...
            </div>
          )}
        </div>

        {/* Dynamic Checklist */}
        <Card className="rounded-[3rem] border-border/40 bg-card/40 backdrop-blur-3xl shadow-2xl overflow-hidden">
          <CardContent className="p-10 space-y-6">
            {loading ? (
              <div className="py-12 flex flex-col items-center opacity-20">
                <Loader2 size={40} className="animate-spin mb-4" />
                <p className="font-poppins font-black uppercase tracking-widest text-xs">Authenticating Node...</p>
              </div>
            ) : (
              tasks.map((task) => (
                <div 
                  key={task._id} 
                  onClick={() => toggleTask(task._id)}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                    task.completed ? 'bg-green-500 border-green-500 shadow-lg shadow-green-500/20' : 'border-primary/20 group-hover:border-primary'
                  }`}>
                    {task.completed ? <CheckCircle2 size={14} className="text-white" /> : <div className="w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100" />}
                  </div>
                  <span className={`text-sm font-sans font-medium transition-all duration-300 ${
                    task.completed ? 'text-muted-foreground/40 line-through' : 'text-muted-foreground group-hover:text-foreground'
                  }`}>
                    {task.label}
                  </span>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Activity & Audit Section */}
        <div className="space-y-6 pt-6">
          <Tabs defaultValue="comments" className="w-full">
            <div className="flex items-center justify-between border-b border-border/40 pb-2">
              <TabsList className="bg-transparent h-auto p-0 gap-8">
                <TabsTrigger value="comments" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-0 pb-2 text-[10px] font-poppins font-black uppercase tracking-widest">
                  Care Discussion
                </TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-0 pb-2 text-[10px] font-poppins font-black uppercase tracking-widest">
                  Clinical Audit Logs
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="comments" className="pt-6 space-y-6">
              <div className="flex gap-4 items-start">
                <Avatar className="w-10 h-10 border-2 border-background shadow-lg">
                  <AvatarFallback className="bg-primary/10 text-primary font-black text-xs">SN</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <div className="relative group">
                    <textarea 
                      placeholder="Enter clinical update..." 
                      className="w-full min-h-24 p-5 bg-card/60 border border-border/40 rounded-3xl outline-none focus:ring-4 focus:ring-primary/5 transition-all font-sans text-sm resize-none"
                    />
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <Badge variant="outline" className="bg-background/80 hover:bg-primary/5 cursor-pointer text-[9px] font-bold">✨ Looks good!</Badge>
                      <Badge variant="outline" className="bg-background/80 hover:bg-primary/5 cursor-pointer text-[9px] font-bold">🤝 Need help?</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="pt-6 space-y-8 relative pl-8 before:absolute before:left-2.75 before:top-2 before:bottom-2 before:w-0.5 before:bg-primary/10">
              {logs.length > 0 ? logs.map((log, i) => (
                <div key={i} className="relative flex flex-col items-start gap-1">
                  <div className="absolute -left-6.75 top-1.5 w-4 h-4 rounded-full border-4 border-card bg-primary shadow-lg z-10" />
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-sans font-black text-primary uppercase tracking-widest">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <Badge variant="outline" className="text-[8px] font-poppins font-black uppercase border-primary/20 text-muted-foreground/60">{log.action_code}</Badge>
                  </div>
                  <p className="text-sm font-sans font-medium text-foreground/80">{log.message}</p>
                  <p className="text-[9px] font-sans font-bold text-muted-foreground/40 uppercase tracking-widest">Personnel: {log.user_name}</p>
                </div>
              )) : (
                <div className="py-10 flex flex-col items-center opacity-20">
                  <History size={32} className="mb-2" />
                  <p className="text-[10px] font-poppins font-black uppercase tracking-widest">No audit trails detected</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* RIGHT COLUMN: SYSTEM METADATA */}
      <div className="lg:col-span-4 space-y-6 font-sans">
        <div className="flex gap-3 mb-8">
          <Button className="flex-1 h-14 bg-green-500 hover:bg-green-600 text-white font-poppins font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-green-900/20 gap-2">
            <CheckCircle2 size={18} />Verified
          </Button>
          <Button variant="outline" className="w-14 h-14 rounded-2xl border-border/40 bg-card/40">
            <Zap size={20} className="text-primary" />
          </Button>
        </div>

        <Accordion type="single" collapsible defaultValue="details" className="space-y-4">
          <AccordionItem value="details" className="border-none bg-card/30 backdrop-blur-xl rounded-[2.5rem] px-8 overflow-hidden shadow-sm">
            <AccordionTrigger className="hover:no-underline py-6">
              <div className="flex items-center gap-3 text-foreground/60">
                <Clock size={16} />
                <span className="font-poppins font-black text-[10px] uppercase tracking-widest text-left">Protocol Details</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-8 space-y-6">
              <div className="grid grid-cols-2 gap-y-6">
                <div>
                  <label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest block mb-2">Case Lead</label>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6"><AvatarFallback className="text-[8px] bg-primary/20">U</AvatarFallback></Avatar>
                    <span className="text-xs font-bold text-primary cursor-pointer hover:underline">Claim Case</span>
                  </div>
                </div>
                <div>
                  <label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest block mb-2">Milestone</label>
                  <span className="text-xs font-bold text-foreground">Phase 01: Core Setup</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="pt-6 px-4 space-y-2 opacity-30">
          <div className="flex justify-between text-[9px] font-bold uppercase">
            <span>Entry: April 07, 2026</span>
            <span>Sync: Real-time</span>
          </div>
          <Separator className="bg-foreground/20" />
          <p className="text-[8px] font-black text-center tracking-[0.4em] uppercase">Security Node: ITBIN-2211-0249</p>
        </div>
      </div>
    </div>
  );
};