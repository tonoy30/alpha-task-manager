import { gql } from 'apollo-server'

export const typeDefs = gql`
  enum TaskStatus {
    Completed
    Uncompleted
  }

  type Task {
    id: ID!
    title: String!
    status: TaskStatus
    order: Int!
  }

  type List {
    id: ID!
    title: String!
    tasks: [Task!]!
  }

  input CreateListInput {
    title: String!
  }

  input CreateTaskInput {
    title: String!
  }

  input UpdateTaskInput {
    title: String!
    status: String!
  }

  input MoveTaskInput {
    previousPosition: Int!
    currentPosition: Int!
  }

  type MutationResult {
    success: Boolean!
  }

  type Query {
    lists: [List]!
  }

  type Mutation {
    createList(input: CreateListInput!): List!
    createTask(listId: ID!, input: CreateTaskInput!): Task!
    updateTask(id: ID!, input: UpdateTaskInput!): Task
    moveTask(id: ID!, input: MoveTaskInput!): MutationResult!
  }
`
