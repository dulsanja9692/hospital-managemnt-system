export const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="mt-auto pt-4 pb-2 border-t border-(--border) opacity-40">
      <div className="flex flex-row justify-between items-center px-2 text-[9px] font-bold uppercase tracking-[0.2em] text-(--text)">
        {/* Left Side: Basic Copyright */}
        <p>© {year} MediFlow HMS</p>
        
        {/* Right Side: Version only (Cleaner) */}
        <div className="flex items-center gap-4">
          <span className="hover:text-(--accent) cursor-help transition-colors">Support</span>
          <span className="font-mono opacity-50">v2.4.0</span>
        </div>
      </div>
    </footer>
  );
};