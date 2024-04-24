import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTemp(base = 20, delta = 10) {
  return Math.round(base + (Math.random() - 0.5) * delta)
}