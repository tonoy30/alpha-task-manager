import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Task {
    id: ID!
    listId: ID
    title: String!
    status: String!
    position: Int!
  }

  type List {
    id: ID!
    title: String!
    tasks: [Task]
  }

  input CreateListInput {
    title: String!
  }

  input CreateTaskInput {
    title: String!
    position: Int!
  }

  input UpdateTaskInput {
    title: String!
    status: String!
  }

  input MoveTaskInput {
    listId: ID!
    currentPosition: Int!
  }

  type MutationResult {
    success: Boolean!
  }

  type Query {
    lists: [List!]!
    pagedLists(skip: Int!, take: Int): [List!]!
  }

  type Mutation {
    createList(input: CreateListInput!): List!
    deleteList(id: ID!): MutationResult!
    createTask(listId: ID!, input: CreateTaskInput!): Task!
    updateTask(id: ID!, input: UpdateTaskInput!): Task
    moveTask(id: ID!, input: MoveTaskInput!): Task
    deleteTask(id: ID!): MutationResult!
  }
`
