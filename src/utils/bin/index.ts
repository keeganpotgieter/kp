import type { BinFunction } from "../completion";
import * as aboutModule from "./about";
import * as educationModule from "./education";
import * as expModule from "./exp";
// import * as projectsModule from './projects';
import * as hiddenModule from "./hidden";
import * as neofetchModule from "./neofetch";
import * as socialModule from "./social";
import * as themeModule from "./theme";
import * as utilsModule from "./utils";

// Combine all imported functions into the bin array
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const bin: Record<string, BinFunction<any>> = {
  ...aboutModule,
  ...educationModule,
  ...expModule,
  ...hiddenModule,
  ...neofetchModule,
  ...socialModule,
  ...themeModule,
  ...utilsModule,
};
