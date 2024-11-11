import { bin } from "./bin";

const commandCache: Record<string, boolean> = {};

export const commandExists = (command: string) => {
  if (commandCache[command]) {
    return commandCache[command];
  }

  const baseCommand = command.split(" ")[0];

  if (!baseCommand) {
    commandCache[command] = false;
    return false;
  }

  const result = Object.hasOwn(bin, baseCommand);
  commandCache[command] = result;

  return result;
};
