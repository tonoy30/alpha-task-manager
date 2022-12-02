import { Context } from '@libs/context'
import { Task } from '@prisma/client'
import { Resolvers } from 'generated/types'
import { getStatus } from '../../../utils/status.util'

export const mutation: Resolvers<Context>['Mutation'] = {
  createList: async (_parent, { input }, ctx) =>
    await ctx.prisma.list.create({ data: input }),

  deleteTask: async (_parent, { id }, ctx) => {
    const deletedList = await ctx.prisma.list.delete({
      where: {
        id,
      },
    })
    if (deletedList) {
      return {
        success: true,
      }
    } else {
      return {
        success: false,
      }
    }
  },

  createTask: async (_parent, { listId, input }, ctx) => {
    const data = { ...input, listId }
    return await ctx.prisma.task.create({ data })
  },

  updateTask: async (_parent, { id, input }, ctx) => {
    try {
      const { title, status } = input
      return await ctx.prisma.task.update({
        where: {
          id,
        },
        data: {
          title,
          status: getStatus(status),
        },
      })
    } catch (err) {
      console.error(err)
      throw new Error('unable to update task!')
    }
  },

  moveTask: async (_parent, { id, input }, ctx) => {
    const { listId, currentPosition } = input
    const tasks = await ctx.prisma.task.findMany({
      where: {
        listId,
      },
      orderBy: {
        position: 'desc',
      },
    })
    const fromIndex = tasks.findIndex((task: Task) => task.id === id)
    if (fromIndex !== -1) {
      for (let i = fromIndex; i < tasks.length; i++) {
        const { id: taskId } = tasks[i]
        await ctx.prisma.task.update({
          where: {
            id: taskId,
          },
          data: {
            position: taskId === id ? currentPosition : i,
          },
        })
      }
    }
    return await ctx.prisma.task.findUnique({
      where: {
        id,
      },
    })
  },
  deleteList: async (_parent, { id }, ctx) => {
    const deletedTask = await ctx.prisma.task.delete({
      where: {
        id,
      },
    })
    if (deletedTask) {
      return {
        success: true,
      }
    } else {
      return {
        success: false,
      }
    }
  },
}
