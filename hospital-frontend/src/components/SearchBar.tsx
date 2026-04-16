import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar = ({ value, onChange, placeholder = 'Search...', className }: SearchBarProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={cn(
        'flex items-center gap-3 w-full rounded-2xl border transition-all duration-300 bg-background px-4 py-2.5',
        focused
          ? 'border-primary/60 shadow-[0_0_0_3px_hsl(var(--primary)/0.12)]'
          : 'border-border/60 shadow-sm hover:border-border',
        className
      )}
    >
      {/* Left icon */}
      <div
        className={cn(
          'flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-300 shrink-0',
          focused ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
        )}
      >
        <Search size={15} strokeWidth={2.5} />
      </div>

      {/* Input field */}
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="flex-1 border-none bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 h-8 p-0 text-sm font-medium placeholder:text-muted-foreground/50 text-foreground"
      />

      {/* Clear button */}
      {value && (
        <button
          onClick={() => onChange('')}
          className="shrink-0 w-6 h-6 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
        >
          <X size={13} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
};
