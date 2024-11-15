"use client";

import { themes } from "@/styles/themes";
import { useTheme as useNextTheme } from "next-themes";
import React from "react";

export const useTheme = () => {
  const { theme, setTheme } = useNextTheme();

  const handleSetTheme = React.useCallback(
    (name: string | undefined) => {
      if (!name) {
        return `Please provide a theme. Try 'theme ls' to see the list of available themes.`;
      }

      const index = themes.findIndex(
        (colorScheme) => colorScheme.toLowerCase() === name,
      );

      const theme = themes[index];

      if (index === -1 || !theme) {
        return `Theme '${name}' not found. Try 'theme ls' to see the list of available themes.`;
      }

      setTheme(theme);

      return `Theme ${theme} set successfully!`;
    },
    [setTheme],
  );

  return { theme, setTheme: handleSetTheme } as const;
};
