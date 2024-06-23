import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function parseNumberFromDb(value: string): number {
    // Remove any non-numeric characters except the decimal point
    let cleanedValue = value.replace(/[^0-9.]/g, '');
  
    // Convert to a number
    return parseFloat(cleanedValue);
}