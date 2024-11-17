"use client";

import { themes } from "@/styles/themes";
import { useTheme as useNextTheme } from "next-themes";
import React from "react";

const themeColors = {
  light: "#FFFFFF",
  dark: "#000000",
} satisfies Record<(typeof themes)[number], string>;

export const useTheme = () => {
  const { theme, setTheme } = useNextTheme();

  React.useEffect(() => {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.setAttribute("name", "theme-color");
      document.head.appendChild(metaThemeColor);
    }

    metaThemeColor.setAttribute(
      "content",
      theme ? themeColors[theme as keyof typeof themeColors] : themeColors.dark,
    );
  }, [theme]);

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
