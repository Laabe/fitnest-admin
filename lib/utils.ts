import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateSKU = (name: string): string => {
    const hash = Array.from(name).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const part1 = (hash * 17 % 10000).toString().padStart(4, "0");
    const part2 = (hash * 41 % 10000).toString().padStart(4, "0");
    return `SKU-${part1}-${part2}`;
}