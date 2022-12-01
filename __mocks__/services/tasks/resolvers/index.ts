import { MockContext } from '@libs/context'
import { List } from '@libs/model'
import { Task, TaskStatus } from '@prisma/client'
import { Resolvers } from 'generated/types'
import { listData } from '../../../../datasources/list'
import { applyTakeConstraints } from '../../../../utils/query.util'

export const resolvers: Resolvers<MockContext> = {
  Mutation: {
    createList: (_parent: unknown, { input }, ctx) => {
      const newList = {
        id: '1',
        title: input.title,
      } as List
      ctx.prisma.list.create.mockResolvedValue(newList)
      return newList
    },
    createTask: (_parent: unknown, { listId, input }, ctx) => {
      const newTask = {
        listId,
        title: input.title,
        position: input.position,
        status: TaskStatus.Uncompleted,
        id: '0',
      } as Task
      ctx.prisma.task.create.mockResolvedValue(newTask)
      return newTask
    },
    updateTask: (_parent: unknown, { id, input }, ctx) => {
      if (id === 'throwerror') {
        const error = new Error('unable to update task!')
        ctx.prisma.task.update.mockRejectedValue(error)
        throw error
      } else {
        const { title, status } = input
        const task = {
          listId: '0',
          title,
          position: 0,
          status: status,
          id,
        } as Task

        ctx.prisma.task.update.mockResolvedValue(task)
        return task
      }
    },
    moveTask: async (_parent, { id, input }, ctx) => {
      const task = {
        listId: input.listId,
        title: 'Task 0',
        position: input.currentPosition,
        status: TaskStatus.Uncompleted,
        id,
      } as Task
      ctx.prisma.task.update.mockResolvedValue(task)
      return task
    },
  },
  Query: {
    lists: (_parent, _args, _ctx) => listData,
    pagedLists: (_parent, args, _ctx) => {
      const take = applyTakeConstraints({
        min: 1,
        max: 50,
        value: args.take ?? 30,
      })
      const { skip } = args
      const list = listData.slice(skip, skip + (take ?? 2))
      return list
    },
  },
}
