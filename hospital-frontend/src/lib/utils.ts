import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// This 'export' keyword is the most important part!
export function cn(...inputs: ClassValue[]) {
 return twMerge(clsx(inputs))
}