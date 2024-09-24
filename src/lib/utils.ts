import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function repeat(times: number) {
  return Array.from(Array(times).keys());
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
