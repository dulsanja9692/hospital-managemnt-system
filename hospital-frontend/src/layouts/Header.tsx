import { Bell, Search, User, ChevronDown, Moon } from 'lucide-react';

export const Header = ({ userName }: { userName: string }) => {
  return (
    <header className="flex items-center justify-between mb-8 animate-soft-load text-left">
      
      {/* 1. Global Search Bar */}
      <div className="relative w-96 group">
        <Search 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text) group-focus-within:text-(--accent) transition-colors" 
          size={18} 
        />
        <input 
          type="text" 
          placeholder="Search records, doctors, or bills..." 
          className="w-full pl-12 pr-4 py-3 bg-(--code-bg) border border-(--border) rounded-2xl outline-none focus:border-(--accent) transition-all text-sm font-medium"
        />
      </div>

      {/* 2. Utility Actions */}
      <div className="flex items-center gap-4">
        
        {/* Theme Toggle */}
        <button className="p-3 bg-(--code-bg) border border-(--border) rounded-xl text-(--text) hover:text-(--accent) hover:border-(--accent-border) transition-all active:scale-90">
          <Moon size={20} />
        </button>
        
        {/* Notifications */}
        <button className="p-3 bg-(--code-bg) border border-(--border) rounded-xl text-(--text) hover:text-(--accent) hover:border-(--accent-border) relative transition-all active:scale-90">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-(--code-bg)" />
        </button>

        {/* Vertical Divider */}
        <div className="h-10 w-px bg-(--border) mx-2 opacity-50" />

        {/* 3. User Profile Dropdown */}
        <button className="flex items-center gap-3 p-1.5 pr-4 bg-(--code-bg) border border-(--border) rounded-2xl hover:border-(--accent-border) transition-all group active:scale-95">
          <div className="w-9 h-9 bg-(--accent-bg) border border-(--accent-border) text-(--accent) rounded-xl flex items-center justify-center font-black shadow-sm group-hover:bg-(--accent) group-hover:text-white transition-all">
            {/* FIXED: Using the User icon here to resolve the 'unused' error */}
            <User size={18} />
          </div>
          
          <div className="text-left hidden sm:block">
            <p className="text-xs font-black text-(--text-h) leading-tight group-hover:text-(--accent) transition-colors">
              {userName}
            </p>
            <p className="text-[10px] font-bold text-(--text) opacity-60 uppercase tracking-tighter">
              Receptionist
            </p>
          </div>
          
          <ChevronDown size={14} className="text-(--text) ml-1 group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>
    </header>
  );
};