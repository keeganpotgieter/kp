import type { BinFunction } from "../completion";
import config from "~/config.json";

export const github = {
  fn: async (): Promise<string> => {
    window.open(`https://github.com/${config.social.github}/`);

    return "Opening github...";
  },
  description: "Open my github profile",
} satisfies BinFunction;

export const super_secret = {
  fn: async (): Promise<string> => {
    window.open(`https://www.youtube.com/watch?v=QB7ACr7pUuE`);

    return "sorry...";
  },
  description: "Shhhh...",
} satisfies BinFunction;

export const resume = {
  fn: async (): Promise<string> => {
    window.open(`./assets/Resume_06_24.pdf`, "_blank");

    return "Opening resume...";
  },
  description: "Open my resume",
} satisfies BinFunction;

export const r = resume;

export const linkedin = {
  fn: async (): Promise<string> => {
    window.open(`https://www.linkedin.com/in/${config.social.linkedin}/`);

    return "Opening linkedin...";
  },
  description: "Open my linkedin profile",
} satisfies BinFunction;
