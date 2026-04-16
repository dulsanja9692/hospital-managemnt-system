import { useState } from 'react';
import { 
  Bell, 
  Activity, ShieldAlert, Clock 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Mock notification stream
const initialNotifications = [
  { 
    id: 1, 
    type: 'CRITICAL', 
    message: 'Patient P-1001: Heart rate exceeding threshold (145 BPM)', 
    time: '2m ago', 
    priority: 'high',
    icon: ShieldAlert 
  },
  { 
    id: 2, 
    type: 'SCHEDULE', 
    message: 'Surgery Prep: Dr. Saman assigned to Theatre 04', 
    time: '15m ago', 
    priority: 'medium',
    icon: Clock 
  },
  { 
    id: 3, 
    type: 'SYSTEM', 
    message: 'Financial Node Synchronization Successful', 
    time: '1h ago', 
    priority: 'low',
    icon: Activity 
  },
];

export const NotificationBell = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.length;

  const clearLogs = () => setNotifications([]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative hover:bg-primary/10 rounded-2xl transition-all group w-12 h-12 border border-transparent hover:border-primary/20"
        >
          <Bell size={22} className="text-muted-foreground group-hover:text-primary transition-colors" />
          
          {unreadCount > 0 && (
            <span className="absolute top-2.5 right-2.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary border-2 border-background"></span>
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent 
        align="end" 
        className="w-96 p-0 bg-card/90 backdrop-blur-3xl border-white/20 rounded-[2.5rem] shadow-2xl overflow-hidden outline-none animate-in fade-in zoom-in-95 duration-300"
      >
        {/* HEADER */}
        <div className="p-6 border-b border-white/10 bg-primary/5">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-[11px] font-poppins font-black uppercase tracking-[0.3em] text-primary">Signal Center</h4>
              <p className="text-[8px] font-sans font-bold text-muted-foreground uppercase tracking-widest mt-1">Live Telemetry Feed</p>
            </div>
            <Badge className="bg-primary text-white font-poppins font-black text-[9px] px-3 py-1 rounded-full">
              {unreadCount} ACTIVE
            </Badge>
          </div>
        </div>

        {/* NOTIFICATION LIST */}
        <div className="max-h-95 overflow-y-auto custom-scrollbar">
          {notifications.length > 0 ? (
            notifications.map((note) => (
              <div 
                key={note.id} 
                className="p-5 border-b border-white/5 hover:bg-white/5 transition-all cursor-pointer group relative overflow-hidden"
              >
                {/* Priority Indicator Strip */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                  note.priority === 'high' ? 'bg-red-500' : 
                  note.priority === 'medium' ? 'bg-amber-500' : 'bg-primary'
                }`} />

                <div className="flex gap-4">
                  <div className={`mt-1 p-2 rounded-xl shrink-0 ${
                    note.priority === 'high' ? 'bg-red-500/10 text-red-500' : 
                    note.priority === 'medium' ? 'bg-amber-500/10 text-amber-500' : 'bg-primary/10 text-primary'
                  }`}>
                    <note.icon size={16} />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className={`text-[9px] font-poppins font-black uppercase tracking-widest ${
                        note.priority === 'high' ? 'text-red-500' : 'text-muted-foreground'
                      }`}>
                        {note.type}
                      </span>
                      <span className="text-[8px] font-black text-muted-foreground/40 uppercase tracking-widest">
                        {note.time}
                      </span>
                    </div>
                    <p className="text-[12px] font-sans font-semibold text-foreground/90 leading-tight group-hover:text-foreground transition-colors">
                      {note.message}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center space-y-3 opacity-20">
              <Activity size={32} className="mx-auto" />
              <p className="text-[10px] font-poppins font-black uppercase tracking-widest">Neural Link Quiet</p>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-4 bg-white/5">
          <Button 
            variant="ghost" 
            onClick={clearLogs}
            disabled={notifications.length === 0}
            className="w-full h-11 text-[9px] font-poppins font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-red-500 hover:bg-red-500/5 rounded-2xl transition-all"
          >
            Purge Terminal Logs
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};