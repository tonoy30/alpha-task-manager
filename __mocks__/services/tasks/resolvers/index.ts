import { List } from '@libs/model'
import { CreateListInput } from 'generated/types'

export const resolvers = {
  Query: {
    lists: () => queryData,
    pagedLists: (_parent: unknown, args: { skip: number; take?: number }) => {
      const { skip, take } = args
      const list = queryData.slice(skip, skip + (take ?? 2))
      return list
    },
  },
  Mutation: {
    createList: (
      _parent: unknown,
      { title }: CreateListInput,
      _ctx: unknown
    ) => {
      const newList = {
        id: '1',
        title,
        tasks: [],
      } as List
      mutationData.push(newList)
      return newList
    },
    createTask: () => {},
    updateTask: () => {},
    moveTask: () => {},
  },
}

export const queryData: List[] = [
  {
    id: '9cb80d31-49ed-4e6b-9eea-78f0b8a04eb8',
    title: 'List 1',
    tasks: [
      {
        id: 'bb97eb77-26d2-4d50-bfb9-a50003aabf25',
        position: 4,
        title: 'Task 4',
        status: 'Uncompleted',
      },
      {
        id: '6dda2e6f-4b58-4031-bff1-8cfe810dc77e',
        position: 3,
        title: 'Task 3',
        status: 'Uncompleted',
      },
      {
        id: 'd26423b6-80a1-455b-98e9-8f4bd068f2b7',
        position: 2,
        title: 'Task 2',
        status: 'Uncompleted',
      },
      {
        id: '8d995d0b-5de3-406e-8b7d-2e50f5f27274',
        position: 1,
        title: 'Task 1',
        status: 'Uncompleted',
      },
      {
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
        id: 'bb97eb77-26d2-4d50-bfb9-a50003aabf25',
        position: 4,
        title: 'Task 4',
        status: 'Uncompleted',
      },
      {
        id: '6dda2e6f-4b58-4031-bff1-8cfe810dc77e',
        position: 3,
        title: 'Task 3',
        status: 'Uncompleted',
      },
      {
        id: 'd26423b6-80a1-455b-98e9-8f4bd068f2b7',
        position: 2,
        title: 'Task 2',
        status: 'Uncompleted',
      },
      {
        id: '8d995d0b-5de3-406e-8b7d-2e50f5f27274',
        position: 1,
        title: 'Task 1',
        status: 'Uncompleted',
      },
      {
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
        id: 'bb97eb77-26d2-4d50-bfb9-a50003aabf25',
        position: 4,
        title: 'Task 4',
        status: 'Uncompleted',
      },
      {
        id: '6dda2e6f-4b58-4031-bff1-8cfe810dc77e',
        position: 3,
        title: 'Task 3',
        status: 'Uncompleted',
      },
      {
        id: 'd26423b6-80a1-455b-98e9-8f4bd068f2b7',
        position: 2,
        title: 'Task 2',
        status: 'Uncompleted',
      },
      {
        id: '8d995d0b-5de3-406e-8b7d-2e50f5f27274',
        position: 1,
        title: 'Task 1',
        status: 'Uncompleted',
      },
      {
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
        id: 'bb97eb77-26d2-4d50-bfb9-a50003aabf25',
        position: 4,
        title: 'Task 4',
        status: 'Uncompleted',
      },
      {
        id: '6dda2e6f-4b58-4031-bff1-8cfe810dc77e',
        position: 3,
        title: 'Task 3',
        status: 'Uncompleted',
      },
      {
        id: 'd26423b6-80a1-455b-98e9-8f4bd068f2b7',
        position: 2,
        title: 'Task 2',
        status: 'Uncompleted',
      },
      {
        id: '8d995d0b-5de3-406e-8b7d-2e50f5f27274',
        position: 1,
        title: 'Task 1',
        status: 'Uncompleted',
      },
      {
        id: '528f55d5-3cb0-468b-a503-be21493c986b',
        position: 0,
        title: 'Task 0',
        status: 'Uncompleted',
      },
    ],
  },
]
export const mutationData: List[] = []
