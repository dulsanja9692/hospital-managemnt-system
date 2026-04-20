import { useState } from 'react';
import { ChevronDown, LogOut, Settings, Shield, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuSeparator,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProfileDetailsModal } from '../features/account/components/ProfileDetailsModal';
import { SystemSettingsModal } from '../features/account/components/SystemSettingsModal';
import { PrivacyModal } from '../features/account/components/PrivacyModal';

// Role → colour mapping (shared with Header or moved here)
const roleStyles: Record<string, { bg: string; text: string; badge: string }> = {
 'Super Admin': { bg: 'bg-violet-600', text: 'text-white', badge: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300' },
 'Hospital Admin': { bg: 'bg-blue-600', text: 'text-white', badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' },
 'Doctor': { bg: 'bg-emerald-600', text: 'text-white', badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' },
 'Receptionist': { bg: 'bg-amber-500', text: 'text-white', badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' },
 'Accountant': { bg: 'bg-sky-600', text: 'text-white', badge: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300' },
};

const getInitials = (name: string) =>
 name
 .split(' ')
 .filter(Boolean)
 .map((n) => n[0])
 .slice(0, 2)
 .join('')
 .toUpperCase();

export const UserDropdown = ({ userName, userRole }: { userName: string; userRole: string }) => {
 const [showProfile, setShowProfile] = useState(false);
 const [showSettings, setShowSettings] = useState(false);
 const [showPrivacy, setShowPrivacy] = useState(false);

 const style = roleStyles[userRole] ?? {
 bg: 'bg-primary',
 text: 'text-white',
 badge: 'bg-primary/10 text-primary',
 };

 const initials = getInitials(userName || 'User');

 // Mock user object for the modals
 const user = {
 name: userName,
 role: userRole,
 phone: "+94 77 123 4567",
 address: "No 12, Horizon Road, Malabe",
 email: "admin@mediflow.com",
 id: "ITBIN-2211-0249"
 };

 return (
 <>
 <DropdownMenu>
 <DropdownMenuTrigger asChild>
 <Button
 variant="ghost"
 className="flex items-center gap-3 h-12 pl-1.5 pr-4 bg-card border border-border  hover:border-primary/50 hover:bg-primary/5 transition-all group focus-visible:ring-0"
 >
 <div
 className={`w-9 h-9 ${style.bg} ${style.text}  flex items-center justify-center text-xs  transition-transform group-hover:scale-105 shrink-0`}
 >
 {initials}
 </div>

 <div className="text-left hidden sm:block">
 <p className="text-xs  leading-tight text-foreground">
 {userName}
 </p>
 <span
 className={`inline-block mt-0.5 px-2 py-0.5  text-[10px]  ${style.badge}`}
 >
 {userRole}
 </span>
 </div>

 <ChevronDown size={14} className="text-muted-foreground transition-transform group-data-[state=open]:rotate-180 shrink-0" />
 </Button>
 </DropdownMenuTrigger>

 <DropdownMenuContent align="end" className="w-60 mt-2  border-border bg-card  p-2 ">
 <div className="flex items-center gap-3 px-3 py-3 border-b border-border mb-1">
 <div className={`w-10 h-10 ${style.bg} ${style.text}  flex items-center justify-center text-sm  shrink-0`}>
 {initials}
 </div>
 <div>
 <p className="text-sm  text-foreground leading-tight">{userName}</p>
 <span className={`inline-block mt-0.5 px-2 py-0.5  text-[10px]  ${style.badge}`}>
 {userRole}
 </span>
 </div>
 </div>

 <DropdownMenuItem 
 onClick={() => setShowProfile(true)}
 className=" py-2.5 focus:bg-primary/10 focus:text-primary cursor-pointer transition-colors"
 >
 <User className="mr-2 h-4 w-4" /> Profile Details
 </DropdownMenuItem>
 <DropdownMenuItem 
 onClick={() => setShowSettings(true)}
 className=" py-2.5 focus:bg-primary/10 focus:text-primary cursor-pointer transition-colors"
 >
 <Settings className="mr-2 h-4 w-4" /> System Settings
 </DropdownMenuItem>
 <DropdownMenuItem 
 onClick={() => setShowPrivacy(true)}
 className=" py-2.5 focus:bg-primary/10 focus:text-primary cursor-pointer transition-colors"
 >
 <Shield className="mr-2 h-4 w-4" /> Privacy Protocol
 </DropdownMenuItem>
 <DropdownMenuSeparator className="bg-border/40 mx-2" />
 <DropdownMenuItem
 onClick={() => { localStorage.clear(); window.location.reload(); }}
 className=" py-2.5 text-red-500 focus:bg-red-500/10 focus:text-red-600 cursor-pointer transition-colors "
 >
 <LogOut className="mr-2 h-4 w-4" /> Log out
 </DropdownMenuItem>
 </DropdownMenuContent>
 </DropdownMenu>

 <ProfileDetailsModal 
 isOpen={showProfile} 
 onClose={() => setShowProfile(false)} 
 user={user} 
 />

 <SystemSettingsModal 
 isOpen={showSettings} 
 onClose={() => setShowSettings(false)} 
 />

 <PrivacyModal 
 isOpen={showPrivacy} 
 onClose={() => setShowPrivacy(false)} 
 />
 </>
 );
};