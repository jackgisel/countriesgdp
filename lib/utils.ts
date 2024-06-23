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


export function formatNumber(value: string, decimalPlaces = 2) {  
  let num = parseNumberFromDb(value);
  
  // Determine the appropriate suffix and format the number
  if (num >= 1e12) {
      return '$' + (num / 1e12).toFixed(decimalPlaces) + 'T';
  } else if (num >= 1e9) {
      return '$' + (num / 1e9).toFixed(decimalPlaces) + 'B';
  } else if (num >= 1e6) {
      return '$' + (num / 1e6).toFixed(decimalPlaces) + 'M';
  } else if (num >= 1e3) {
      return '$' + (num / 1e3).toFixed(decimalPlaces) + 'K';
  } else {
      return '$' + num.toFixed(2);
  }
}