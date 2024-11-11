import { Shell } from "./shell";
import { HydrateClient } from "@/trpc/server";
import React from "react";

const App: React.FC = () => {
  return (
    <HydrateClient>
      <Shell />
    </HydrateClient>
  );
};

export default App;
