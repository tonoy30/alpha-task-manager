import { addMocksToSchema } from '@graphql-tools/mock'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { ApolloServer, gql } from 'apollo-server'
import { typeDefs } from '../services/tasks/resolvers/schema'
import { resolvers } from '../__mocks__/services/tasks/resolvers'

let testSever: ApolloServer

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

beforeAll(() => {
  testSever = new ApolloServer({
    schema: addMocksToSchema({
      schema: makeExecutableSchema({ typeDefs, resolvers }),
      preserveResolvers: true,
    }),
  })
})

describe('Testing Task and List Queries', () => {
  it('fetches all the lists', async () => {
    const response = await testSever.executeOperation({ query: listQuery })
    expect(response).toBeTruthy()
    expect(response).toHaveProperty('data')
    expect(response.errors).toBeFalsy()
    expect(response).toMatchSnapshot()
  })
  it('fetches first 2 list', async () => {
    const response = await testSever.executeOperation({
      query: pagedListQuery,
      variables: {
        skip: 0,
        take: 2,
      },
    })
    expect(response).toBeTruthy()
    expect(response).toHaveProperty('data')
    expect(response.errors).toBeFalsy()
    expect(response).toMatchSnapshot()
  })
})
