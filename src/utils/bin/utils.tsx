"use client";

import { BinFunction, isCommandHidden } from "../completion";
import { bin } from "./index";
import BorderAnimate from "@/components/ui/extended/border-animate";
import { CopyCheckIcon, CopyIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import config from "~/config.json";

const groupCommandsByDescription = () => {
  const grouped: Record<
    string,
    {
      aliases: [string, ...string[]];
      callback: BinFunction;
    }
  > = {};

  Object.entries(bin).forEach(([name, fn]) => {
    const description = fn.description ?? fn.fn.name;

    if (isCommandHidden(fn)) {
      return;
    }

    if (!grouped[description]) {
      grouped[description] = { aliases: [name], callback: fn };
      return;
    }

    grouped[description].aliases.push(name);
  });

  return grouped;
};

const CommandComponent: React.FC<{
  command: string;
}> = ({ command }) => {
  const [showIcon, setShowIcon] = React.useState<boolean>(false);

  const handleOnClick = async (e: React.MouseEvent<HTMLTableCellElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setShowIcon(true);

    await navigator.clipboard.writeText(command);

    setTimeout(() => {
      setShowIcon(false);
    }, 1000);
  };

  return (
    <td
      className="hover:gradient-text group relative cursor-pointer transition-all"
      onClick={handleOnClick}
    >
      {command}
      {showIcon ? (
        <CopyCheckIcon className="absolute right-2 top-1/2 hidden size-3 -translate-y-1/2 group-hover:block sm:size-4" />
      ) : (
        <CopyIcon className="absolute right-2 top-1/2 hidden size-3 -translate-y-1/2 group-hover:block sm:size-4" />
      )}
    </td>
  );
};

const formatCommandDescription = (
  command: string,
  aliases: string[],
  callback: BinFunction,
) => {
  const aliasList = aliases.map((alias) => `'${alias}'`).join(" / ");
  const args = callback.fn.length > 0 ? "[args]" : "";
  const description = callback.description ?? "No description available";

  return (
    <tr key={command}>
      <CommandComponent command={command} />
      <td>{aliasList}</td>
      <td className="max-sm:hidden">{args}</td>
      <td className="text-right">{description}</td>
    </tr>
  );
};

const helpFn = async () => {
  const groupedCommands = groupCommandsByDescription();

  const commandDescriptions = Object.entries(groupedCommands).map(
    ([_, { aliases, callback }]) => {
      const command = aliases.pop();
      return formatCommandDescription(command!, aliases, callback);
    },
  );

  return (
    <div className="flex flex-col gap-4">
      <table className="w-full">
        <thead className="px-2 text-left">
          <tr>
            <th>Command</th>
            <th>Aliases</th>
            <th className="max-sm:hidden">Args</th>
            <th className="text-right">Description</th>
          </tr>
        </thead>
        <tbody>{commandDescriptions}</tbody>
      </table>
      <p className="hidden sm:block">
        [tab] trigger completion.
        <br />
        [ctrl+l] clear terminal.
        <br />
      </p>
      <p className="block sm:hidden">
        [touch] trigger completion.
        <br />
      </p>
    </div>
  );
};

export const help = {
  fn: helpFn,
  description: "Show all available commands",
} satisfies BinFunction;

export const h = help;

export const echo = {
  fn: async (...args: string[]): Promise<string> => {
    return args.join(" ");
  },
  description: "Print a message",
} satisfies BinFunction<string[]>;

export const date = {
  fn: async (): Promise<string> => {
    return new Date().toString();
  },
  description: "Show date and time",
} satisfies BinFunction;

/**
 * Not available yet
 */
// export const wall = {
//   fn: async (): Promise<string> => {
//     window.open("/wall", "_self");

//     return "Opening The Wall...";
//   },
//   description: "View 'The Wall'",
// } satisfies BinFunction;

export const email = {
  fn: async (): Promise<string> => {
    window.open("mailto:keeganpotgieter@outlook.com.au");

    return "Opening mailto:keeganpotgieter@outlook.com.au...";
  },
  description: "Email me",
} satisfies BinFunction;

const sudoFn = (...args: string[]) => {
  setTimeout(function () {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  }, 1000);

  return `Permission denied: unable to run the command '${args?.[0]}' as root.`;
};

export const sudo = {
  fn: sudoFn,
  description: "Sudo",
} satisfies BinFunction<string[]>;

const bannerFn = () => {
  return (
    <BorderAnimate full>
      <div className="flex w-full items-center gap-2 p-0 text-xl">
        <h2>Welcome! I&apos;m Keegan</h2>{" "}
        <div className="h-fit w-fit origin-bottom-right animate-wave text-base">
          👋
        </div>
      </div>
      <span className="text-sm text-muted-foreground">
        I&apos;m a software enginner currently focused on full-stack
        development.
      </span>
      <div className="mt-4 flex flex-col text-sm">
        <h3 className="text-base">Example Commands:</h3>
        <span>- Resume: &apos;resume&apos; or &apos;r&apos;</span>
        <span>- Github: &apos;github&apos;</span>
        <span>- Experience: &apos;experience&apos; or &apos;e&apos;</span>

        <h3 className="mt-2 text-base">Contacts:</h3>
        <span>
          - Email me: &apos;
          <Link
            href="mailto:keeganpotgieter@outlook.com.au"
            className="gradient-text"
          >
            email
          </Link>
          &apos;
        </span>
        <span>
          - LinkedIn: &apos;
          <Link
            href={`https://www.linkedin.com/in/${config.social.linkedin}/`}
            className="gradient-text"
          >
            linkedin
          </Link>
          &apos;
        </span>
      </div>
      <br></br>
      <p className="text-xs">
        Type &apos;help&apos; to see a list of available commands.
      </p>
      <div className="mt-2 block h-fit w-fit whitespace-normal rounded-md border border-border/50 bg-border/10 bg-[conic-gradient(hsl(var(--secondary))_60deg,hsl(var(--tertiary))_140deg,hsl(var(--primary))_200deg,hsl(var(--secondary))_340deg)] px-[2px] py-[1.5px] sm:hidden">
        <span className="text-background mix-blend-normal">
          For more fun, visit on a bigger device!
        </span>
      </div>
    </BorderAnimate>
  );
};

export const banner = {
  fn: bannerFn,
  description: "Display the welcome banner",
} satisfies BinFunction;

export const b = banner;

export const clear = {
  // ts-ignore: eslint-disable-next-line @typescript-eslint/no-empty-function
  fn: () => null,
  description: "Clear the terminal",
} satisfies BinFunction;
