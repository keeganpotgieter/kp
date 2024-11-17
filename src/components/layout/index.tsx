import { CrypticHover } from "../ui/extended/cryptic-hover";
import WindowDisplay from "../ui/extended/window";
import SecretGreeting from "./secret-greeting";
import React from "react";
import packageJson from "~/package.json";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

const Layout: React.FC<Props> = ({ children, onClick }) => {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden overscroll-none bg-background text-xs md:text-base"
      onClick={onClick}
    >
      <CrypticHover>
        <WindowDisplay
          searchBar={`keeganpotgieter — zsh — ${packageJson.version}`}
          className="z-10 h-full w-full max-w-4xl sm:max-h-[80%]"
        >
          {children}
        </WindowDisplay>

        <div className="absolute z-[1] m-auto h-fit w-fit -translate-y-24 animate-fade-in rounded-md bg-black/10 text-center text-muted-foreground/80 filter-none backdrop-blur-xl">
          <SecretGreeting />
        </div>
      </CrypticHover>
    </div>
  );
};

export default Layout;
