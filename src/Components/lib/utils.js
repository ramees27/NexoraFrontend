import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
// import {twMerge} from "ta"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}