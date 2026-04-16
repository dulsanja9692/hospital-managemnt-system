import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Activity } from "lucide-react";

export interface Patient {
  id: string;
  name: string;
  nic: string;
  phone: string;
  status: 'Active' | 'Pending' | 'Emergency';
}

export const PatientTable = ({ patients }: { patients: Patient[] }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-4xl border border-border/40 bg-card/60 backdrop-blur-md overflow-hidden font-sans">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="hover:bg-transparent border-border/40">
            <TableHead className="w-25 font-poppins font-black uppercase text-[10px] tracking-widest px-6 text-left">Record ID</TableHead>
            <TableHead className="font-poppins font-black uppercase text-[10px] tracking-widest text-left">Patient Identity</TableHead>
            <TableHead className="font-poppins font-black uppercase text-[10px] tracking-widest hidden md:table-cell text-left">NIC Reference</TableHead>
            <TableHead className="font-poppins font-black uppercase text-[10px] tracking-widest text-left">Care Status</TableHead>
            <TableHead className="text-right px-6"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id} className="group cursor-pointer border-border/20 hover:bg-primary/5 transition-colors" onClick={() => navigate(`/dashboard/patients/${patient.id}`)}>
              <TableCell className="font-mono text-xs font-bold text-primary px-6 text-left">{patient.id}</TableCell>
              <TableCell className="font-bold text-xs tracking-tight text-left">{patient.name}</TableCell>
              <TableCell className="text-muted-foreground text-xs hidden md:table-cell text-left">{patient.nic}</TableCell>
              <TableCell className="text-left">
                <Badge variant="outline" className={`uppercase text-[9px] font-poppins font-black tracking-tighter px-3 py-1 rounded-full border ${patient.status === 'Emergency' ? 'bg-red-500/10 text-red-600 border-red-500/20 animate-pulse' : patient.status === 'Active' ? 'bg-green-500/10 text-green-600 border-green-500/20' : 'bg-amber-500/10 text-amber-600 border-amber-500/20'}`}>
                  <Activity size={10} className="mr-1" /> {patient.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right px-6">
                <Button variant="ghost" size="icon" className="rounded-full group-hover:bg-primary group-hover:text-white transition-all">
                  <ChevronRight size={18} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};