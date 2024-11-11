"use client";

import OpenDialogue from "../../ui/extended/open-dialogue";
import { Button } from "@/components/ui/button";
import BorderAnimate from "@/components/ui/extended/border-animate";
// import ClosedNode from "./user-pin/closed-node";
import { cn, tw } from "@/lib/utils";
import { pins, users } from "@/server/db/schema";
import { motion } from "framer-motion";
import { Session } from "next-auth";
import React, { useId } from "react";

export type Pin = typeof pins.$inferSelect & {
  createdBy: typeof users.$inferSelect;
};

const ClosedNode: React.FC<{ pin: Pin; id: string; isUser: boolean }> = ({
  pin,
  id,
  isUser,
}) => {
  const ContainerComponent = isUser ? BorderAnimate : motion.div;

  const extraProps = isUser
    ? ({
        full: true,
        as: "motion.div",
        childContainerClassName: tw`overflow-clip p-0`,
      } satisfies Partial<Parameters<typeof BorderAnimate>[0]>)
    : {};
  return (
    <ContainerComponent
      aria-description="closed-container"
      className={cn(
        "relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-md",
        "transition-shadow",
        "_cursor-none hover:shadow-lg hover:shadow-border",
        "active:translate-y-[1px] active:shadow-inner",
        { "border border-border": pin.index !== 1 },
      )}
      layoutId={`dialog-${id}`}
      {...extraProps}
    >
      <motion.div
        aria-description="closed-img"
        layoutId={`dialog-img-${id}`}
        // className="h-16 w-16"
        // className="h-full w-full object-cover"
      >
        <motion.img
          src={pin.createdBy.image!}
          // className="h-16 w-16 max-w-16"
        />
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
          >
            {pin.createdBy.name}
          </motion.div>
        </div>
      </div>
    </ContainerComponent>
  );
};

const OpenNode: React.FC<{
  pin: Pin;
  id: string;
  index: number;
  isUser: boolean;
}> = ({ pin, id, index, isUser }) => {
  const ContainerComponent = isUser ? BorderAnimate : motion.div;
  const extraProps = isUser
    ? ({
        full: true,
        as: "motion.div",
        childContainerClassName: tw`overflow-clip rounded-sm p-2`,
      } satisfies Partial<Parameters<typeof BorderAnimate>[0]>)
    : {};

  return (
    <ContainerComponent
      aria-description="open-container"
      className="_overflow-hidden pointer-events-auto relative m-4 flex h-auto max-h-dvh w-fit flex-col overflow-scroll border border-border bg-background p-1 transition-none sm:max-w-2xl"
      layoutId={`dialog-${id}`}
      tabIndex={-1}
      style={{
        borderRadius: "calc(var(--radius) - 2px)",
      }}
      {...extraProps}
    >
      <motion.div
        aria-description="open-img"
        layoutId={`dialog-img-${id}`}
        className="flex items-center justify-center bg-background p-2"
      >
        <motion.img
          src={pin.createdBy.image!}
          className="_object-cover h-32 w-32 max-w-32 rounded-md"
        />
      </motion.div>
      <div
        aria-description="open-content"
        className="flex flex-col items-center text-center"
      >
        <motion.div
          aria-description="open-title"
          layoutId={`dialog-title-${id}`}
          className="text-2xl"
        >
          <span className="font-mono">#{index}</span> 🇿🇦
        </motion.div>
        <motion.div
          aria-description="open-subtitle"
          layoutId={`dialog-subtitle-${id}`}
          layout="position"
          className="text-foreground"
        >
          {pin.createdBy.name}
        </motion.div>
        <motion.div
          aria-description="open-description"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="flex origin-bottom flex-col gap-2 text-muted-foreground"
        >
          <p>{pin.comment}</p>

          {/* <a
            className="underline"
            href={`https://github.com/${pin.createdBy.name}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View GitHub
          </a> */}

          <Button variant={"shadow"}>View GitHub</Button>
        </motion.div>
      </div>
    </ContainerComponent>
  );
};

const UserPinDialogue: React.FC<{
  pin: Pin;
  index: number;
  className?: string;
}> = ({ pin, index }) => {
  const uniqueId = useId();
  const isUser = pin.index === 2; // TODO: fix

  return (
    <OpenDialogue
      closedNode={<ClosedNode pin={pin} id={uniqueId} isUser={isUser} />}
      openedNode={
        <OpenNode pin={pin} id={uniqueId} index={index} isUser={isUser} />
      }
    />
  );
};

export default UserPinDialogue;
