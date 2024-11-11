"use client";

import OpenDialogue from "../ui/extended/open-dialogue";
import { motion } from "framer-motion";
import { Session } from "next-auth";
import React, { useEffect, useId, useState } from "react";

const ClosedNode: React.FC<{ user: Session["user"]; id: string }> = ({
  user,
  id,
}) => {
  return (
    <motion.div
      aria-description="closed-container"
      className="flex flex-col overflow-hidden rounded-md border border-border bg-background dark:border-border"
      layoutId={`dialog-${id}`}
    >
      <motion.div aria-description="closed-img" layoutId={`dialog-img-${id}`}>
        <div className="h-24 w-full bg-blue-100" />
      </motion.div>
      <div
        aria-description="closed-content"
        className="flex flex-grow flex-row items-end justify-between p-2"
      >
        <div>
          <motion.div
            aria-description="closed-title"
            layoutId={`dialog-title-${id}`}
          >
            🇿🇦
          </motion.div>
          <motion.div
            aria-description="closed-subtitle"
            layoutId={`dialog-subtitle-${id}`}
            layout="position"
            className="text-muted-foreground"
          >
            Edouard Wilfrid Buquet
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const OpenNode: React.FC<{ user: Session["user"]; id: string }> = ({
  user,
  id,
}) => {
  return (
    <motion.div
      aria-description="open-container"
      className="pointer-events-auto relative m-4 flex h-auto w-full flex-col overflow-hidden border border-border sm:max-w-2xl"
      layoutId={`dialog-${id}`}
      tabIndex={-1}
      style={{
        borderRadius: "calc(var(--radius) - 2px)",
      }}
    >
      <motion.div aria-description="open-img" layoutId={`dialog-img-${id}`}>
        <div className="h-24 w-full bg-blue-100" />
      </motion.div>
      <div aria-description="open-content" className="p-6">
        <motion.div
          aria-description="open-title"
          layoutId={`dialog-title-${id}`}
          className="text-2xl"
        >
          🇿🇦
        </motion.div>
        <motion.div
          aria-description="open-subtitle"
          layoutId={`dialog-subtitle-${id}`}
          layout="position"
          className="text-foreground"
        >
          Edouard Wilfrid Buquet
        </motion.div>
        <motion.div
          aria-description="open-description"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="origin-bottom text-muted-foreground"
        >
          <p className="mt-2">
            Little is known about the life of Édouard-Wilfrid Buquet. He was
            born in France in 1866, but the time and place of his death is
            unfortunately a mystery.
          </p>
          <p>
            Research conducted in the 1970s revealed that he’d designed the “EB
            27” double-arm desk lamp in 1925, handcrafting it from nickel-plated
            brass, aluminium and varnished wood.
          </p>
          <a
            className="mt-2 inline-flex underline"
            href="https://www.are.na/block/12759029"
            target="_blank"
            rel="noopener noreferrer"
          >
            Are.na block
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

const UserPinDialogue: React.FC<{
  user: Session["user"];
  className?: string;
}> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // prevents the dialog from pre-renderd on the server
  if (!mounted) {
    return null;
  }

  return (
    <OpenDialogue
      closedNode={<ClosedNode user={user} id={uniqueId} />}
      openedNode={<OpenNode user={user} id={uniqueId} />}
    />
  );
};

export default UserPinDialogue;
