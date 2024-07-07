import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ content: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          content: input.content,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),
  like: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      const alreadyLike = await ctx.db.likes.findFirst({
        where: {
          postId: input,
          userId: ctx.session.user.id,
        },
      });
      if (alreadyLike) {
        const updated = await Promise.all([
          ctx.db.likes.update({
            where: {
              id: alreadyLike.id,
            },
            data: {
              status: !alreadyLike.status,
            },
          }),
          ctx.db.post.update({
            where: {
              id: input,
            },
            data: {
              counterLike: {
                increment: alreadyLike.status ? -1 : 1,
              },
            },
          }),
        ]);
        return {
          postId: input,
          like: updated[1].counterLike,
        };
      }
      const updated = await Promise.all([
        ctx.db.likes.create({
          data: {
            postId: input,
            userId: ctx.session.user.id,
            status: true,
          },
        }),
        ctx.db.post.update({
          where: {
            id: input,
          },
          data: {
            counterLike: {
              increment: 1,
            },
          },
        }),
      ]);
      return {
        postId: input,
        like: updated[1].counterLike,
      };
    }),
  getAllPost: publicProcedure
    .input(
      z.object({
        userId: z.string().optional(),
        limit: z.number(),
        page: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      //   await new Promise((resolve) => setTimeout(resolve, 1000));
      const posts = await ctx.db.post.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          createdBy: true,
          Likes: {
            where: {
              userId: ctx.session?.user.id,
            },
          },
        },
        where: {
          createdById: input.userId ?? undefined,
        },

        take: input.limit,
        skip: input.page * input.limit,
      });
      return {
        posts,
        total: await ctx.db.post.count({
          where: {
            createdById: input.userId ?? undefined,
          },
        }),
      };
    }),

  getById: protectedProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.db.post.findFirst({
      include: {
        createdBy: true,
        Comments: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        Likes: {
          where: {
            userId: ctx.session?.user.id,
          },
        },
      },
      where: { id: input },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
