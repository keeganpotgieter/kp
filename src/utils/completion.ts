import { bin } from "./bin";
import { findIndexStartsWithAlphabetical } from "./bin/find-index";
import React from "react";

type BinFunctionFn<T extends unknown[]> = (
  ...args: T | never[]
) => React.ReactNode | null;

export type BinFunction<T extends unknown[] = unknown[]> =
  | BinFunctionWithArguments<T>
  | HiddenBinFunction<T>;

export type BaseBinFunction<T extends unknown[]> = {
  fn: BinFunctionFn<T>;
  description: string | undefined;
};

export type BinFunctionWithArguments<T extends unknown[]> =
  BaseBinFunction<T> & {
    _arguments?: Record<string, null | string[]>;
  };

export type HiddenBinFunction<T extends unknown[]> = BaseBinFunction<T> & {
  hidden: true;
  _arguments?: Record<string, null | string[]>;
};

const hasArguments = <T extends unknown[]>(
  fn: BinFunction<T>,
): fn is BinFunctionWithArguments<T> => {
  return "_arguments" in fn;
};

export const isCommandHidden = <T extends unknown[]>(
  fn: BinFunction<T>,
): fn is HiddenBinFunction<T> => {
  return "hidden" in fn;
};

const commandCache: Record<string, string[]> = {};

export const getCommandSuggestion = async ({
  command,
  previousIndex = 0,
  setPreviousIndex,
}: {
  command: string;
  previousIndex: number;
  setPreviousIndex: (value: number) => void;
}): Promise<string | undefined> => {
  const completion = await handleAutocomplete({
    command,
    previousIndex,
    setPreviousIndex,
  });

  if (completion) {
    return completion.substring(command.length);
  }
};

export const getCommandCompletion = (command: string): string | undefined => {
  if (commandCache[command]) {
    const commands = commandCache[command];
    return commands[0];
  }

  const commands = Object.keys(bin).filter((entry) => {
    const fn = bin[entry] as BinFunction;
    return entry.startsWith(command) && !isCommandHidden(fn);
  });

  commandCache[command] = commands;

  return commands[0];
};

export const handleTabCompletion = async ({
  command,
  setCommand,
  setPreviousIndex,
  previousIndex = 0,
}: {
  command: string;
  setCommand: (value: string) => void;
  setPreviousIndex: (value: number) => void;
  previousIndex: number;
}) => {
  const nextSuggestion = await handleAutocomplete({
    command,
    previousIndex,
    setPreviousIndex,
  });
  if (nextSuggestion) {
    setCommand(nextSuggestion);
  }
};

//
// Split the command and arguments and validate them
export const handleAutocomplete = async ({
  command,
  previousIndex = 0,
  setPreviousIndex,
}: {
  command: string;
  previousIndex: number;
  setPreviousIndex: (value: number) => void;
}): Promise<string | undefined> => {
  const parts = command.trim().split(/\s+/);
  const [cmd, ...args] = parts;

  if (!cmd) {
    return undefined;
  }

  const binFunction = bin[cmd] as BinFunction;

  // If there are no more arguments expected
  if (!args.length && !binFunction) {
    return getCommandCompletion(cmd);
  }

  if (!binFunction) {
    return undefined;
  }

  if (isCommandHidden(binFunction)) {
    return;
  }

  const cmdArguments = hasArguments(binFunction) ? binFunction._arguments : {};

  if (!cmdArguments) throw new Error("Invalid command arguments");

  const index = args.length - 1;

  let lastArg = null;
  let ctx = null;

  const _args = [...args];
  let usedArgs = _args.shift();
  while (usedArgs) {
    if (cmdArguments[usedArgs] !== undefined) {
      lastArg = usedArgs;
      ctx = cmdArguments[usedArgs];
    }
    usedArgs = _args.shift();
  }

  if (!lastArg) {
    // if lastCmd is null: below
    // Suggest the next argument
    const nextArg = Object.keys(cmdArguments).find((arg) => {
      return arg.startsWith(args[index] ?? "");
    });

    return nextArg
      ? cmd + " " + args.join(" ") + nextArg.substring(args[index]?.length ?? 0)
      : cmd + " " + args.join(" ");
  }

  // If the function expects no more arguments
  if (ctx === null) {
    return cmd + " " + args.join(" ");
  }

  let _arr: string[] = [];

  if (Array.isArray(ctx)) {
    _arr = [...ctx];
  }

  const nextArgIndex = findIndexStartsWithAlphabetical(_arr, args[index] ?? "");

  const nextArg = _arr[nextArgIndex];

  if (nextArgIndex !== -1) setPreviousIndex(nextArgIndex + previousIndex);

  return nextArg
    ? cmd + " " + args.join(" ") + nextArg.substring(args[index]?.length ?? 0)
    : cmd + " " + args.join(" ");
};
