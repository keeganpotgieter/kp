import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { pins } from "@/server/db/schema";
import { z } from "zod";

export const pinRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ comment: z.string().min(1), index: z.number().gte(0) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await ctx.db.insert(pins).values({
        index: input.index,
        comment: input.comment,
        createdById: ctx.session.user.id,
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.pins.findFirst({
      orderBy: (pins, { desc }) => [desc(pins.createdAt)],
    });
  }),

  getPins: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.pins.findMany({
      with: {
        createdBy: true,
      },
      orderBy: (pins, { asc }) => [asc(pins.index)],
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
