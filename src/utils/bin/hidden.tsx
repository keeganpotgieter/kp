import type { BinFunction, HiddenBinFunction } from "../completion";
import { projects } from "./projects";
import { github, linkedin, resume } from "./social";
import EasterEgg from "@/components/easter-egg";
import { useShell } from "@/context/shell-provider";
import type { CommandHistory } from "@/types/history";

export const ls = {
  fn: (...args: string[]) => {
    const hasHiddenFlag = args?.includes("-a");

    return (
      <div className="flex flex-col gap-4 whitespace-normal">
        <span className="gradient-text text-xs">
          {hasHiddenFlag
            ? "wow, a really hidden command... nerd points +10"
            : "a hidden command... nerd points +1"}
        </span>
        <div className="flex flex-row gap-6">
          <div>linkedin</div>
          <div>keeganpotgieter</div>
          <div>projects</div>
          <div>resume</div>
          {hasHiddenFlag && <div>.youre_a_nerd_i_see</div>}
        </div>
      </div>
    );
  },
  description: "",
  hidden: true,
} satisfies BinFunction<string[]>;

const HiddenFileComponent = ({ history }: { history: CommandHistory[] }) => {
  if (history.find((h) => h.command === "cd .youre_a_nerd_i_see")) {
    return (
      <div className="flex flex-col" key={history.length - 1}>
        Yes, yes... you have tried this already... Look deeeeeeper... Between
        the lines... Between the... divs?
      </div>
    );
  }
  return (
    <div className="flex flex-col" key={history.length - 1}>
      <span className="gradient-text text-xs">nice... nerd points +20</span>
      <span>Well done... try looking a little deeper...</span>
      <EasterEgg />
    </div>
  );
};

const DefaultCDComponent: React.FC<{ arg: string | undefined }> = ({ arg }) => {
  return <div>cd: no such file or directory: {arg}</div>;
};

const cdFn = async (history?: CommandHistory[], ...args: string[]) => {
  if (args.length === 0) {
    return "";
  }

  if (args.length > 1) {
    return "cd: too many arguments";
  }

  switch (args[0]) {
    case "linkedin":
      return linkedin.fn();

    case "keeganpotgieter":
      return github.fn();

    case "projects":
      return projects.fn();

    case "resume":
      return resume.fn();

    case ".youre_a_nerd_i_see":
      return <HiddenFileComponent history={history ?? []} />;

    default:
      return <DefaultCDComponent arg={args[0]} />;
  }
};

export const cd = {
  fn: cdFn,
  description: "",
  hidden: true,
  _arguments: {
    linkedin: null,
    keeganpotgieter: null,
    projects: null,
    resume: null,
  },
} satisfies HiddenBinFunction<[history: CommandHistory[], ...string[]]>;

export const im_a_nerd = {
  fn: (...history: CommandHistory[]) => {
    if (history.find((h) => h.command === "cd .youre_a_nerd_i_see")) {
      return (
        <span className="gradient-text text-xs">
          wow! nice! nerd points +100!!!
        </span>
      );
    }
    return "how did even find this";
  },
  description: "",
  hidden: true,
} satisfies HiddenBinFunction<CommandHistory[]>;
