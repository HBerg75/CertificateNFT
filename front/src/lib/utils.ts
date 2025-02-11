import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isValidAddress = (addr: string | null): addr is `0x${string}` => {
  return addr !== null && /^0x[a-fA-F0-9]{40}$/.test(addr);
};
