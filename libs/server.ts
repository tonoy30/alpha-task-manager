import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { stitchingDirectives } from '@graphql-tools/stitching-directives'
import type { IResolvers } from '@graphql-tools/utils'
import { ApolloServer, gql } from 'apollo-server'
import { DocumentNode, GraphQLSchema, print } from 'graphql'
import { createContext } from './context'

export interface CreateGqlServerOptions {
  typeDefs: DocumentNode
  resolvers: IResolvers
}

export async function createGqlServer(
  options: CreateGqlServerOptions
): Promise<ApolloServer> {
  const schema = makeSchema(options)

  return new ApolloServer({
    schema,
    context: ctx => createContext(ctx),
  })
}

function mergeTypeDefsWithDirectives(typeDefs: DocumentNode): DocumentNode {
  const { allStitchingDirectivesTypeDefs } = stitchingDirectives()

  return mergeTypeDefs([
    allStitchingDirectivesTypeDefs,
    typeDefs,
    gql`
      type Query {
        _sdl: String!
      }
    `,
  ])
}

function mergeResolversWithDirectivesAndSdl({
  typeDefs,
  resolvers,
}: CreateGqlServerOptions): IResolvers {
  return mergeResolvers([
    resolvers,
    {
      Query: {
        _sdl: () => print(typeDefs),
      },
    },
  ])
}

function makeSchema(options: CreateGqlServerOptions): GraphQLSchema {
  let { typeDefs, resolvers } = options

  typeDefs = mergeTypeDefsWithDirectives(typeDefs)
  resolvers = mergeResolversWithDirectivesAndSdl({
    typeDefs,
    resolvers,
  })

  return makeExecutableSchema({
    typeDefs,
    resolvers,
  })
}
