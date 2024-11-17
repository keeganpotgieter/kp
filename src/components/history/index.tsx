import Username from "../username";
import type { CommandHistory } from "@/types/history";
import React from "react";

interface Props {
  history: Array<CommandHistory>;
}

export const History: React.FC<Props> = ({ history }) => {
  return (
    <>
      {history.map((entry: CommandHistory, index: number) => {
        const Component = typeof entry.command === "string" ? "div" : "div";
        return (
          <div key={entry.command + index}>
            <div className="flex w-full max-w-full flex-row">
              <div className="float-left flex-shrink">
                <Username />
              </div>

              <div className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
                {entry.command}
              </div>
            </div>

            <Component
              className="whitespace-pre-wrap pb-2"
              style={{ lineHeight: "normal" }}
            >
              {entry.output}
            </Component>
          </div>
        );
      })}
    </>
  );
};

export default History;
