import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const commentRouter = createTRPCRouter({
  createComment: protectedProcedure
    .input(
      z.object({
        postId: z.number(),
        comment: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.comments.create({
        data: {
          postId: input.postId,
          content: input.comment,
          userId: ctx.session.user.id,
        },
      });
    }),
});
