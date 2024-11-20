"use client";

import TerminalComponent from "./terminal";
import Layout from "@/components/layout";
import { ShellProvider } from "@/context/shell-provider";
import React from "react";

export const Shell = () => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const onClickAnywhere = () => {
    inputRef.current?.focus();
  };

  return (
    <ShellProvider>
      <Layout onClick={onClickAnywhere}>
        <TerminalComponent inputRef={inputRef} />
      </Layout>
    </ShellProvider>
  );
};
