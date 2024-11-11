"use client";

import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import React, { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

const transition = {
  type: "spring",
  bounce: 0.15,
  duration: 0.3,
};

const OpenDialogue: React.FC<{
  closedNode: React.ReactElement<{
    id: string;
  }>;
  openedNode: React.ReactElement<{
    id: string;
  }>;
}> = ({ closedNode, openedNode }) => {
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
    <MotionConfig transition={transition}>
      <motion.div
        className="relative"
        initial="initial"
        whileHover="animate"
        animate={isOpen ? "open" : "closed"}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
      >
        {closedNode}
      </motion.div>
      {createPortal(
        <AnimatePresence initial={false} mode="sync">
          {isOpen && (
            <>
              <motion.div
                aria-description="open-backdrop"
                key={`backdrop-${uniqueId}`}
                className="fixed inset-0 h-full w-full bg-background/50 backdrop-blur-lg"
                variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
                initial="closed"
                animate="open"
                exit="closed"
                onClick={() => {
                  setIsOpen(false);
                }}
              />
              <motion.div
                key="dialog"
                className="pointer-events-none fixed inset-0 flex items-center justify-center backdrop-blur-md"
                initial="closed"
                animate="open"
                exit="closed"
              >
                {openedNode}
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </MotionConfig>
  );
};

export default OpenDialogue;
