"use client";

import { useTheme } from "@/components/theme/use-theme";
import type { CommandHistory } from "@/types/history";
import { bin } from "@/utils/bin";
import { BinFunction } from "@/utils/completion";
import React from "react";

async function handleCommand(
  cmd: string | undefined,
  args: string[],
  handleSetHistory: (cmd: React.ReactNode) => void,
) {
  if (!cmd || Object.keys(bin).indexOf(cmd) === -1) {
    handleSetHistory(`Command not found: ${cmd}. Try 'help' to get started.`);
  } else {
    try {
      const binFunction = bin[cmd] as BinFunction;
      const output = await binFunction.fn(...args);

      handleSetHistory(output ?? ""); // Provide a default value if output is undefined
    } catch (error) {
      handleSetHistory((error as Error).message);
    }
  }
}

interface ShellContextType {
  history: CommandHistory[];
  command: string;
  lastCommandIndex: number;

  setHistory: (output: string) => void;
  setCommand: (command: string) => void;
  setLastCommandIndex: (index: number) => void;
  execute: (command: string) => Promise<void>;
  clearHistory: () => void;
}

const ShellContext = React.createContext<ShellContextType | undefined>(
  undefined,
);

interface ShellProviderProps {
  children: React.ReactNode;
}

export const useShell = () => {
  const context = React.useContext(ShellContext);

  if (!context) {
    throw new Error("useShell must be used within a ShellProvider");
  }

  return context;
};

export const normaliseString = (str: string) => str.replace(/\u00A0/g, " ");

export const ShellProvider: React.FC<ShellProviderProps> = ({ children }) => {
  const { setTheme } = useTheme();
  const [init, setInit] = React.useState(true);
  const [history, setHistory] = React.useState<CommandHistory[]>([]);
  const [command, setCommand] = React.useState<string>("");
  const [lastCommandIndex, setLastCommandIndex] = React.useState<number>(0);

  React.useEffect(() => {
    handleSetCommand("banner");
  }, []);

  React.useEffect(() => {
    if (!init) {
      void execute();
    }
  }, [command, init]);

  const handleSetHistory = React.useCallback(
    (output: React.ReactNode) => {
      setHistory((previousHistory) => [
        ...previousHistory,
        {
          id: history.length,
          date: new Date(),
          command: command.split(" ").slice(1).join(" "),
          output,
        },
      ]);
    },
    [command],
  );

  const handleSetCommand = React.useCallback(
    (command: string) => {
      setCommand([Date.now(), command].join(" "));

      setInit(false);
    },
    [setCommand],
  );

  const clearHistory = React.useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  const execute = React.useCallback(async () => {
    const normalisedCommand = normaliseString(command).trim();
    const [cmd, ...args] = normalisedCommand.split(" ").slice(1);

    switch (cmd) {
      case "theme": {
        const result = await bin.theme?.fn(setTheme, ...args);
        handleSetHistory(result ?? "");
        break;
      }
      case "clear":
        clearHistory();
        break;
      case "":
        handleSetHistory("");
        break;
      case "cd": {
        const result = await bin.cd?.fn(history, ...args);
        handleSetHistory(result ?? "");
        break;
      }
      case "im_a_nerd":
        handleSetHistory(bin.im_a_nerd?.fn(...history) ?? "");
        break;
      default: {
        await handleCommand(cmd, args, handleSetHistory);
      }
    }
  }, [command, clearHistory, handleSetHistory, history]);

  const contextValue = React.useMemo(
    () => ({
      history,
      command,
      lastCommandIndex,
      setHistory: handleSetHistory,
      setCommand: handleSetCommand,
      setLastCommandIndex,
      execute,
      clearHistory,
    }),
    [
      history,
      command,
      lastCommandIndex,
      handleSetHistory,
      handleSetCommand,
      setLastCommandIndex,
      execute,
      clearHistory,
    ],
  );

  return (
    <ShellContext.Provider value={contextValue}>
      {children}
    </ShellContext.Provider>
  );
};
