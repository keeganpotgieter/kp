import type { BinFunction } from "../completion";

export const projects = {
  fn: async (): Promise<string> => {
    return "Projects coming soon...";
  },
  description: "Get a summary of my projects",
} satisfies BinFunction;

export const p = projects;
