"use client";

import { History } from "../components/history";
import { Input } from "../components/input";
import { useShell } from "../context/shell-provider";
import React from "react";

interface TerminalComponentProps {
  inputRef: React.RefObject<HTMLDivElement>;
}

const TerminalComponent: React.FC<TerminalComponentProps> = ({ inputRef }) => {
  const { history } = useShell();

  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [history, inputRef]);

  return (
    <div className="h-full w-full overflow-hidden rounded-lg p-2">
      <div ref={containerRef} className="h-full w-full overflow-y-auto">
        <div className="float-left flex w-full flex-col gap-2 overflow-x-clip">
          <History history={history} />

          <Input inputRef={inputRef} containerRef={containerRef} />
        </div>
      </div>
    </div>
  );
};

export default TerminalComponent;
