import { BinFunction } from "../completion";
import { themes } from "@/styles/themes";

const ERROR = `Usage: theme [arg]
Args:
  - ls: list all themes
  - set: set a theme
  - random: set a random theme

Example: 
  theme ls        # to list all themes
  theme set dark  # to set a theme`;

type CallbackFn = (value: string | undefined) => string;

const themeFn = async (callback?: CallbackFn, ...args: string[]) => {
  if (args.length === 0) {
    return ERROR;
  }

  switch (args[0]) {
    case "ls": {
      const lsOfThemes = themes.map((theme) => (
        <button
          key={theme}
          className="h-fit cursor-pointer underline"
          onClick={() => callback?.(theme.toLowerCase())}
        >
          {theme}
        </button>
      ));

      return <div className="flex w-full flex-wrap gap-2">{lsOfThemes}</div>;
    }
    case "set": {
      const selectedTheme = args[1];
      return callback?.(selectedTheme?.toLowerCase());
    }
    case "random": {
      const randomTheme = themes[Math.floor(Math.random() * themes.length)];
      return callback?.(randomTheme?.toLowerCase());
    }

    default: {
      return ERROR;
    }
  }
};

export const theme = {
  fn: themeFn,
  description: "Set the shell theme",
  _arguments: {
    ls: null,
    set: themes,
    random: null,
  },
} satisfies BinFunction<[CallbackFn, ...string[]]>;
