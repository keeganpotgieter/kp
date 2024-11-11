"use client";

import OpenDialogue from "../../ui/extended/open-dialogue";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useId } from "react";

const ClosedNode: React.FC<{ id: string; index: number }> = ({ id, index }) => {
  return (
    <motion.div
      aria-description="closed-container"
      className={cn(
        "flex h-16 w-16 items-center justify-center overflow-hidden rounded-md",
        "transition-shadow",
        "_cursor-none hover:shadow-sm hover:shadow-border",
        "active:translate-y-[1px] active:shadow-inner",
        { "_p-1 border border-border": id !== "10" },
      )}
      layoutId={`dialog-${id}`}
    >
      <motion.div
        aria-description="closed-img"
        layoutId={`dialog-img-${id}`}
        className="flex h-16 w-16 items-center justify-center font-mono text-lg font-semibold text-muted-foreground"
      >
        {/* <motion.img src={user.image!} className="h-16 w-16 max-w-16" /> */}
        {index}
      </motion.div>
      <div
        aria-description="closed-content"
        className="hidden flex-grow flex-row items-end justify-between p-2"
      >
        <div>
          <motion.div
            aria-description="closed-title"
            layoutId={`dialog-title-${id}`}
          ></motion.div>
          <motion.div
            aria-description="closed-subtitle"
            layoutId={`dialog-subtitle-${id}`}
            layout="position"
            className="text-muted-foreground"
          ></motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const OpenNode: React.FC<{ id: string; index: number }> = ({ id, index }) => {
  return (
    <motion.div
      aria-description="open-container"
      className="_overflow-hidden pointer-events-auto relative m-4 flex h-auto max-h-dvh w-full flex-col overflow-scroll border border-border bg-background p-2 transition-none sm:max-w-2xl"
      layoutId={`dialog-${id}`}
      tabIndex={-1}
      style={{
        borderRadius: "calc(var(--radius) - 2px)",
      }}
    >
      <motion.div
        aria-description="open-img"
        layoutId={`dialog-img-${id}`}
        className="flex items-center justify-center bg-background"
      >
        {/* <div className="h-24 w-full bg-blue-100" /> */}
        {/* <motion.img
          src={user.image!}
          className="_object-cover h-32 w-32 max-w-32 rounded-md"
        /> */}
      </motion.div>
      <div aria-description="open-content" className="p-6">
        <motion.div
          aria-description="open-title"
          layoutId={`dialog-title-${id}`}
          className="font-mono text-2xl font-semibold text-foreground"
        >
          #{index}
        </motion.div>
        <motion.div
          aria-description="open-subtitle"
          layoutId={`dialog-subtitle-${id}`}
          layout="position"
          className="text-foreground/80"
        >
          This spot is free to claim
        </motion.div>
        <motion.div
          aria-description="open-description"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="origin-bottom text-muted-foreground"
        >
          TODO: add form here
        </motion.div>
      </div>
    </motion.div>
  );
};

const NoUserPinDialogue: React.FC<{
  index: number;
}> = ({ index }) => {
  const uniqueId = useId();

  return (
    <OpenDialogue
      closedNode={<ClosedNode id={uniqueId} index={index} />}
      openedNode={<OpenNode id={uniqueId} index={index} />}
    />
  );
};

export default NoUserPinDialogue;
