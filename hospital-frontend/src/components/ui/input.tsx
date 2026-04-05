import * as React from "react"

// FIXED: Using relative path to bypass alias issues
import { cn } from "../../lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          /* SAMAN KUMARA MEDICAL STYLE: 
             - h-14: taller for better visibility
             - border-2: thicker borders for HUD look
             - bg-background: solid base for high-contrast text
             - font-bold: sharp letters
          */
          "flex h-14 w-full rounded-2xl border-2 border-border bg-background px-5 py-3 text-sm font-bold text-foreground shadow-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/10 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }