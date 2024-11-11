import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const tw = (className: TemplateStringsArray, ...classNames: string[]) =>
  String.raw({ raw: className }, ...classNames);
