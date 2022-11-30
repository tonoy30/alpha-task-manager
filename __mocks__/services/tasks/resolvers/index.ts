import { MockContext } from '@libs/context'
import { List } from '@libs/model'
import { Task, TaskStatus } from '@prisma/client'
import { Resolvers } from 'generated/types'

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
  },
  Query: {
    lists: (_parent, _args, _ctx) => queryData,
    pagedLists: (_parent, args, _ctx) => {
      const { skip, take } = args
      const list = queryData.slice(skip, skip + (take ?? 2))
      return list
    },
  },
}

export const queryData: List[] = [
  {
    id: '9cb80d31-49ed-4e6b-9eea-78f0b8a04eb8',
    title: 'List 1',
    tasks: [
      {
        listId: '9cb80d31-49ed-4e6b-9eea-78f0b8a04eb8',
        id: 'bb97eb77-26d2-4d50-bfb9-a50003aabf25',
        position: 4,
        title: 'Task 4',
        status: 'Uncompleted',
      },
      {
        listId: '9cb80d31-49ed-4e6b-9eea-78f0b8a04eb8',
        id: '6dda2e6f-4b58-4031-bff1-8cfe810dc77e',
        position: 3,
        title: 'Task 3',
        status: 'Uncompleted',
      },
      {
        listId: '9cb80d31-49ed-4e6b-9eea-78f0b8a04eb8',
        id: 'd26423b6-80a1-455b-98e9-8f4bd068f2b7',
        position: 2,
        title: 'Task 2',
        status: 'Uncompleted',
      },
      {
        listId: '9cb80d31-49ed-4e6b-9eea-78f0b8a04eb8',
        id: '8d995d0b-5de3-406e-8b7d-2e50f5f27274',
        position: 1,
        title: 'Task 1',
        status: 'Uncompleted',
      },
      {
        listId: '9cb80d31-49ed-4e6b-9eea-78f0b8a04eb8',
        id: '528f55d5-3cb0-468b-a503-be21493c986b',
        position: 0,
        title: 'Task 0',
        status: 'Uncompleted',
      },
    ],
  },
  {
    id: '9cb80d31-49ed-4e6b-9eea-78f0b8a04eb9',
    title: 'List 2',
    tasks: [
      {
        listId: '9cb80d31-49ed-4e6b-9eea-78f0b8a04eb9',
        id: 'bb97eb77-26d2-4d50-bfb9-a50003aabf25',
        position: 4,
        title: 'Task 4',
        status: 'Uncompleted',
      },
      {
        listId: '9cb80d31-49ed-4e6b-9eea-78f0b8a04eb9',
        id: '6dda2e6f-4b58-4031-bff1-8cfe810dc77e',
        position: 3,
        title: 'Task 3',
        status: 'Uncompleted',
      },
      {
        listId: '9cb80d31-49ed-4e6b-9eea-78f0b8a04eb9',
        id: 'd26423b6-80a1-455b-98e9-8f4bd068f2b7',
        position: 2,
        title: 'Task 2',
        status: 'Uncompleted',
      },
      {
        listId: '9cb80d31-49ed-4e6b-9eea-78f0b8a04eb9',
        id: '8d995d0b-5de3-406e-8b7d-2e50f5f27274',
        position: 1,
        title: 'Task 1',
        status: 'Uncompleted',
      },
      {
        listId: '9cb80d31-49ed-4e6b-9eea-78f0b8a04eb9',
        id: '528f55d5-3cb0-468b-a503-be21493c986b',
        position: 0,
        title: 'Task 0',
        status: 'Uncompleted',
      },
    ],
  },
  {
    id: '9cb80d31-49ed-4e6b-9eea-78f0b8a04e10',
    title: 'List 3',
    tasks: [
      {
        listId: '9cb80d31-49ed-4e6b-9eea-78f0b8a04e10',
        id: 'bb97eb77-26d2-4d50-bfb9-a50003aabf25',
        position: 4,
        title: 'Task 4',
        status: 'Uncompleted',
      },
      {
        listId: '9cb80d31-49ed-4e6b-9eea-78f0b8a04e10',
        id: '6dda2e6f-4b58-4031-bff1-8cfe810dc77e',
        position: 3,
        title: 'Task 3',
        status: 'Uncompleted',
      },
      {
        listId: '9cb80d31-49ed-4e6b-9eea-78f0b8a04e10',
        id: 'd26423b6-80a1-455b-98e9-8f4bd068f2b7',
        position: 2,
        title: 'Task 2',
        status: 'Uncompleted',
      },
      {
        listId: '9cb80d31-49ed-4e6b-9eea-78f0b8a04e10',
        id: '8d995d0b-5de3-406e-8b7d-2e50f5f27274',
        position: 1,
        title: 'Task 1',
        status: 'Uncompleted',
      },
      {
        listId: '9cb80d31-49ed-4e6b-9eea-78f0b8a04e10',
        id: '528f55d5-3cb0-468b-a503-be21493c986b',
        position: 0,
        title: 'Task 0',
        status: 'Uncompleted',
      },
    ],
  },
  {
    id: '9cb80d31-49ed-4e6b-9eea-78f0b8a04e11',
    title: 'List 4',
    tasks: [
      {
        listId: '9cb80d31-49ed-4e6b-9eea-78f0b8a04e11',
        id: 'bb97eb77-26d2-4d50-bfb9-a50003aabf25',
        position: 4,
        title: 'Task 4',
        status: 'Uncompleted',
      },
      {
        listId: '9cb80d31-49ed-4e6b-9eea-78f0b8a04e11',
        id: '6dda2e6f-4b58-4031-bff1-8cfe810dc77e',
        position: 3,
        title: 'Task 3',
        status: 'Uncompleted',
      },
      {
        listId: '9cb80d31-49ed-4e6b-9eea-78f0b8a04e11',
        id: 'd26423b6-80a1-455b-98e9-8f4bd068f2b7',
        position: 2,
        title: 'Task 2',
        status: 'Uncompleted',
      },
      {
        listId: '9cb80d31-49ed-4e6b-9eea-78f0b8a04e11',
        id: '8d995d0b-5de3-406e-8b7d-2e50f5f27274',
        position: 1,
        title: 'Task 1',
        status: 'Uncompleted',
      },
      {
        listId: '9cb80d31-49ed-4e6b-9eea-78f0b8a04e11',
        id: '528f55d5-3cb0-468b-a503-be21493c986b',
        position: 0,
        title: 'Task 0',
        status: 'Uncompleted',
      },
    ],
  },
]
