import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import config from "~/config.json";

type Repo = {
  name: string;
  fork: boolean;
  html_url: string;
};

export const reposRouter = createTRPCRouter({
  getRepos: publicProcedure.query(async () => {
    const response = await fetch(
      `https://api.github.com/users/${config.social.github}/repos`,
    );

    return (await response.json()) as Repo[];
  }),
});
