import { gql } from 'apollo-server'

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }

  input CreateUserInput {
    username: String!
    password: String!
  }

  input UpdateUserInput {
    username: String
  }

  type MutationResult {
    success: Boolean!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User
    deleteUser(id: ID!): MutationResult!
  }
`
