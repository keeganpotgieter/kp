import { cn } from "@/lib/utils";
import { PanelBottomOpenIcon } from "lucide-react";
import React from "react";
import { ReactNode } from "react";
import { useAsciiText, ansiShadow as font } from "react-ascii-text";

function Banner() {
  const asciiTextRef = useAsciiText({
    animationCharacters: "▒░█",
    animationCharacterSpacing: 1,
    animationDelay: 2000,
    animationDirection: "down",
    animationInterval: 100,
    animationLoop: true,
    animationSpeed: 30,
    font: font,
    text: ["Keegan Potgieter", "Software Engineer"],
  });

  return (
    <pre
      ref={asciiTextRef as React.MutableRefObject<HTMLPreElement | null>}
    ></pre>
  );
}

interface WindowDisplayProps {
  searchBar?: string;
  className?: string;
  children?: ReactNode;
}

const WindowDisplay = ({
  searchBar,
  className,
  children,
}: WindowDisplayProps) => {
  const [minify, setMinify] = React.useState<boolean>(false);

  const handleClose = () => {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  };

  const handleMinify = () => {
    setMinify((prev) => !prev);
  };

  return (
    <div
      className={cn(
        "flex min-w-fit flex-col overscroll-none rounded-md border-border text-foreground shadow-xl shadow-primary/20 sm:hover:shadow-primary/30",
        className,
        minify
          ? "animate-minimize-window sm:h-0 sm:w-fit"
          : "animate-maximize-window ease-better-ease-in-out sm:h-full sm:w-full sm:transition-[transform,shadow] sm:hover:-translate-y-[2px] sm:hover:shadow-2xl",
      )}
    >
      <div
        className={cn(
          "hidden h-12 w-full items-center justify-between space-x-1.5 rounded-t-lg border-0 border-border/20 bg-background p-2 px-4 sm:flex sm:border",
          { "sm:rounded-xl sm:shadow-xl sm:shadow-primary/20": minify },
        )}
      >
        <div className={cn("flex-1")}>
          <div
            className={cn(
              "flex w-full items-center justify-start space-x-1.5",
              { "sm:hidden": minify },
            )}
          >
            <button
              onClick={handleClose}
              className="h-3 w-3 cursor-pointer rounded-full border border-transparent bg-red-400 hover:bg-red-500 dark:border-red-400"
            ></button>
            <button
              onClick={handleMinify}
              className="h-3 w-3 cursor-pointer rounded-full border border-transparent bg-yellow-400 hover:bg-yellow-500 dark:border-yellow-400"
            ></button>
            <button
              className={cn(
                "h-3 w-3 cursor-pointer rounded-full border border-transparent bg-green-400 hover:bg-green-500 dark:border-green-400",
              )}
            ></button>
          </div>
        </div>
        <div className="flex min-w-fit flex-1 flex-row justify-between text-nowrap transition-colors ease-better-ease-in-out">
          {searchBar && (
            <div
              className={cn(
                "h-full w-full rounded-md border-0 border-border p-1 text-center text-xs text-muted-foreground sm:border",
                { "border-transparent": minify },
              )}
            >
              {searchBar}
            </div>
          )}
        </div>
        <div className="group flex flex-1 items-center justify-end p-1 text-muted-foreground">
          <PanelBottomOpenIcon
            onClick={handleMinify}
            className={cn(
              "m-1 h-4 w-4 scale-90 cursor-pointer transition-transform group-hover:scale-95",
              {
                "sm:hidden": !minify,
              },
            )}
          />
        </div>
      </div>
      <div
        className={cn(
          "flex h-full min-w-full max-w-2xl flex-1 flex-col overflow-clip border-t-0 border-border/20 bg-background text-foreground sm:rounded-b-lg sm:border",
          { "sm:max-h-0 sm:max-w-0 sm:border-none": minify },
        )}
      >
        <div className="flex h-fit w-full items-center justify-center pt-2 text-center text-[4px] leading-[0.25rem] sm:hidden">
          <Banner />
        </div>

        <div className="hidden h-fit w-full items-center justify-center pt-2 text-center text-[7px] leading-[0.5rem] sm:flex">
          <Banner />
        </div>
        <div className="mask relative overflow-y-clip py-2">{children}</div>
      </div>
    </div>
  );
};
export default WindowDisplay;
