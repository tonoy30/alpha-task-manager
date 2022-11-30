import { Context } from '@libs/context'
import { Task, TaskStatus } from '@prisma/client'
import { Resolvers } from 'generated/types'

export const mutation: Resolvers<Context>['Mutation'] = {
  createList: async (_parent, { input }, ctx) =>
    ctx.prisma.list.create({ data: input }),

  createTask: async (_parent, { listId, input }, ctx) => {
    const data = { ...input, listId }
    return ctx.prisma.task.create({ data })
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
      throw Error('task is not found')
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
    return ctx.prisma.task.findUnique({
      where: {
        id,
      },
    })
  },
}

const getStatus = (status: string) => {
  switch (status) {
    case 'Completed':
      return TaskStatus.Completed
    default:
      return TaskStatus.Uncompleted
  }
}
