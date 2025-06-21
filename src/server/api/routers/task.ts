import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TaskPriority, TasksSortOption, TaskStatus } from "~/types/tasks";
import { getTaskPriorityEnumValue, getTaskStatusEnumValue } from "~/utils/getEnums";

export const taskRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: protectedProcedure.input(z.object({
    sortBy: z.enum(Object.values(TasksSortOption) as [TasksSortOption, ...TasksSortOption[]])
  })).query(async ({ input, ctx }) => {
    let orderBy: any = {};
    if(input.sortBy === TasksSortOption.DateAsc) {
      orderBy = { createdAt: "asc" };
    } else if(input.sortBy === TasksSortOption.PriorityAsc) {
      orderBy = { priority: "asc" };
    } else if(input.sortBy === TasksSortOption.PriorityDesc) {
      orderBy = { priority: "desc" };
    } else {
      orderBy = { createdAt: "desc" };
    }
    return ctx.db.task.findMany({
      include: {
        assignees: {
          include: {
            user: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        createdBy: true,
      },
      orderBy
    });
  }),
  
  create: protectedProcedure
    .input(z.object({ 
      title: z.string().min(1),
      description: z.string().optional(),
      dueDate: z.date(),
      priority: z.enum(Object.values(TaskPriority) as [TaskPriority, ...TaskPriority[]]),
      status: z.enum(Object.values(TaskStatus) as [TaskStatus, ...TaskStatus[]]),
      assigneeIds: z.array(z.string()).min(1, "At least one assignee is required"),
      tagIds: z.array(z.string()).min(1, "At least one tag is required"),
     }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.create({
        data: {
          title: input.title,
          description: input.description,
          dueDate: input.dueDate,
          priority: getTaskPriorityEnumValue(input.priority),
          status: getTaskStatusEnumValue(input.status),
          createdBy: { connect: { id: ctx.session.user.id } },
          assignees: {
            create: input.assigneeIds.map((assigneeId) => ({
              user: { connect: { id: assigneeId } },
            }))
          },
          tags: {
            create: input.tagIds.map((tagId) => ({
              tag: { connect: { id: tagId } },
            }))
          }
        },
      });
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      title: z.string().min(1).optional(),
      description: z.string().optional(),
      dueDate: z.date().optional(),
      priority: z.enum([TaskPriority.High, TaskPriority.Medium, TaskPriority.Low]).optional(),
      status: z.enum([TaskStatus.Todo, TaskStatus.InProgress, TaskStatus.Completed]).optional(),
      assigneeIds: z.array(z.string()).optional(),
      tagIds: z.array(z.string()).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Build the update data object using object spread for clarity
      const data: any = {
        ...(input.title !== undefined && { title: input.title }),
        ...(input.description !== undefined && { description: input.description }),
        ...(input.dueDate !== undefined && { dueDate: input.dueDate }),
        ...(input.priority !== undefined && { priority: getTaskPriorityEnumValue(input.priority) }),
        ...(input.status !== undefined && { status: getTaskStatusEnumValue(input.status) }),
      };

      // Update assignees if provided
      if (input.assigneeIds !== undefined) {
        data.assignees = {
          deleteMany: {},
          create: input.assigneeIds.map((assigneeId: string) => ({
            user: { connect: { id: assigneeId } },
          })),
        };
      }

      // Update tags if provided (clear old tags first)
      if (input.tagIds !== undefined) {
        data.tags = {
          deleteMany: {},
          create: input.tagIds.map((tagId: string) => ({
            tag: { connect: { id: tagId } },
          })),
        };
      }

      // Try to update, throw if not found
      try {
        return await ctx.db.task.update({
          where: { id: input.id },
          data,
        });
      } catch (e: any) {
        throw new Error("Task not found");
      }
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
