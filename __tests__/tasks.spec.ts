import { addMocksToSchema } from '@graphql-tools/mock'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { List } from '@libs/model'
import { Task } from '@prisma/client'
import { ApolloServer, gql } from 'apollo-server'
import { GraphQLError } from 'graphql'
import { Context, createMockContext, MockContext } from '../libs/context'
import { typeDefs } from '../services/tasks/resolvers/schema'
import { resolvers } from '../__mocks__/services/tasks/resolvers'

let testSever: ApolloServer
let mockCtx: MockContext
let ctx: Context

const listQuery = gql`
  query List {
    lists {
      id
      title
      tasks {
        id
        position
        title
        status
      }
    }
  }
`
const pagedListQuery = gql`
  query PagedListQuery($skip: Int!, $take: Int) {
    pagedLists(skip: $skip, take: $take) {
      id
      title
      tasks {
        id
        position
        title
        status
      }
    }
  }
`
const createListMutation = gql`
  mutation CreateList($createListInput: CreateListInput!) {
    createList(input: $createListInput) {
      id
      title
    }
  }
`
const deleteListMutation = gql`
  mutation DeleteList($deleteListId: ID!) {
    deleteList(id: $deleteListId) {
      success
    }
  }
`

const createTaskMutation = gql`
  mutation CreateTask($listId: ID!, $createTaskInput: CreateTaskInput!) {
    createTask(listId: $listId, input: $createTaskInput) {
      id
      listId
      title
      status
      position
    }
  }
`
const updateTaskMutation = gql`
  mutation UpdateTask($updateTaskId: ID!, $updateTaskInput: UpdateTaskInput!) {
    updateTask(id: $updateTaskId, input: $updateTaskInput) {
      id
      listId
      title
      status
      position
    }
  }
`
const moveTaskMutation = gql`
  mutation MoveTask($moveTaskId: ID!, $moveTaskInput: MoveTaskInput!) {
    moveTask(id: $moveTaskId, input: $moveTaskInput) {
      id
      listId
      title
      status
      position
    }
  }
`

const deletedTaskMutation = gql`
  mutation DeleteTask($deleteTaskId: ID!) {
    deleteTask(id: $deleteTaskId) {
      success
    }
  }
`

beforeAll(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as any as Context

  testSever = new ApolloServer({
    schema: addMocksToSchema({
      schema: makeExecutableSchema({ typeDefs, resolvers }),
      preserveResolvers: true,
    }),
    context: mockCtx,
  })
})

describe('Testing Task and List Queries', () => {
  it('should fetches all the lists', async () => {
    const response = await testSever.executeOperation({ query: listQuery })
    checkResponse(response)
    expect(response).toMatchSnapshot()
  })
  it('should fetches first 2 list', async () => {
    const response = await testSever.executeOperation({
      query: pagedListQuery,
      variables: {
        skip: 0,
        take: 2,
      },
    })
    checkResponse(response)
    expect(response).toMatchSnapshot()
  })
  it('should `applyTakeConstraints` for lists', async () => {
    const response = await testSever.executeOperation({
      query: pagedListQuery,
      variables: {
        skip: 0,
        take: 0,
      },
    })
    const err = response && response.errors && response.errors[0]
    expect(err).toBeInstanceOf(GraphQLError)
    expect(err).toHaveProperty(
      'message',
      `'take' argument value '0' is outside the valid range of '1' to '50'.`
    )
  })
})

describe('Testing Task and List Mutations', () => {
  it('should create list', async () => {
    const list: List = {
      id: '1',
      title: 'List 1',
    }
    const response = await testSever.executeOperation({
      query: createListMutation,
      variables: {
        createListInput: {
          title: list.title,
        },
      },
    })
    checkResponse(response)
    await expect(createList(list, ctx)).resolves.toEqual(
      response?.data?.createList
    )
  })
  it('should delete list', async () => {
    const response = await testSever.executeOperation({
      query: deleteListMutation,
      variables: {
        deleteListId: '1',
      },
    })
    checkResponse(response)
  })
  it('should create task', async () => {
    const task = {
      id: '0',
      listId: '0',
      position: 0,
      title: 'Task 0',
      status: 'Uncompleted',
    } as Task

    const response = await testSever.executeOperation({
      query: createTaskMutation,
      variables: {
        listId: task.listId,
        createTaskInput: {
          title: task.title,
          position: task.position,
        },
      },
    })
    checkResponse(response)
    await expect(createTask(task, ctx)).resolves.toEqual(
      response?.data?.createTask
    )
  })
  it('should update task', async () => {
    const task = {
      id: '0',
      listId: '0',
      position: 0,
      title: 'Task 0000',
      status: 'Completed',
    } as Task
    const response = await testSever.executeOperation({
      query: updateTaskMutation,
      variables: {
        updateTaskId: task.id,
        updateTaskInput: {
          title: task.title,
          status: task.status,
        },
      },
    })
    checkResponse(response)
    await expect(updateTask(task, ctx)).resolves.toEqual(
      response?.data?.updateTask
    )
  })
  it('should update task fail if task not found', async () => {
    const task = {
      id: 'throwerror',
      listId: '0',
      position: 0,
      title: 'Task 0000',
      status: 'Completed',
    } as Task
    const response = await testSever.executeOperation({
      query: updateTaskMutation,
      variables: {
        updateTaskId: 'throwerror',
        updateTaskInput: {
          title: task.title,
          status: task.status,
        },
      },
    })

    await expect(updateTask(task, ctx)).rejects.toHaveProperty(
      'message',
      'unable to update task!'
    )

    expect(response && response.errors && response.errors[0]).toHaveProperty(
      'message',
      'unable to update task!'
    )
  })
  it('should move task', async () => {
    const task = {
      id: '0',
      listId: '0',
      position: 0,
      title: 'Task 0000',
      status: 'Completed',
    } as Task
    const response = await testSever.executeOperation({
      query: moveTaskMutation,
      variables: {
        moveTaskId: task.id,
        moveTaskInput: {
          currentPosition: 1,
          listId: task.listId,
        },
      },
    })
    checkResponse(response)
    task.position = 1
    await expect(updateTask(task, ctx)).resolves.toEqual(
      response?.data?.moveTask
    )
  })
  it('should delete task', async () => {
    const response = await testSever.executeOperation({
      query: deletedTaskMutation,
      variables: {
        deleteTaskId: '1',
      },
    })
    checkResponse(response)
  })
})

const checkResponse = (response: any) => {
  expect(response).toBeTruthy()
  expect(response).toHaveProperty('data')
  expect(response.errors).toBeFalsy()
}

const createList = async (list: List, ctx: Context) => {
  return await ctx.prisma.list.create({
    data: list,
  })
}

const createTask = async (data: Task, ctx: Context) => {
  return await ctx.prisma.task.create({
    data,
  })
}
const updateTask = async (task: Task, ctx: Context) => {
  if (task.id === 'throwerror') {
    throw new Error('unable to update task!')
  }
  return await ctx.prisma.task.update({
    where: {
      id: task.id,
    },
    data: {
      title: task.title,
      status: task.status,
      position: task.position,
    },
  })
}
