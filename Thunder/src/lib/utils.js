import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines Tailwind classes and merges conflicts.
 * @param {...string} inputs - Classes to be combined
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}