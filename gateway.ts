import { fetch } from 'cross-fetch'
import { stitchSchemas } from '@graphql-tools/stitch'
import { stitchingDirectives } from '@graphql-tools/stitching-directives'
import { pruneSchema, filterSchema } from '@graphql-tools/utils'
import { introspectSchema } from '@graphql-tools/wrap'
import { ApolloServer } from 'apollo-server'
import { GraphQLSchema, print } from 'graphql'

function createRemoteExecutor(uri: string) {
  return async ({ document, variables }: any) => {
    const query = print(document)
    const fetchResult = await fetch(`${uri}/graphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    })
    return fetchResult.json()
  }
}

async function createSubSchemas() {
  const userExecutor = createRemoteExecutor(
    `http://localhost:${process.env.USER_SERVICE_PORT}`
  )

  return Promise.all([
    {
      schema: await introspectSchema(userExecutor),
      executor: userExecutor,
    },
  ])
}

async function getStitchedSchemas(): Promise<GraphQLSchema> {
  const { stitchingDirectivesTransformer } = stitchingDirectives()

  const schema = stitchSchemas({
    subschemaConfigTransforms: [stitchingDirectivesTransformer],
    subschemas: await createSubSchemas(),
  })

  return pruneSchema(
    filterSchema({
      schema,
      rootFieldFilter: (_, fieldName) =>
        !!fieldName && !fieldName.startsWith('_'),
      fieldFilter: (_, fieldName) => !!fieldName && !fieldName.startsWith('_'),
      argumentFilter: (_, __, argName) => !!argName && !argName.startsWith('_'),
    })
  )
}

export async function startGateway(): Promise<void> {
  const schema = await getStitchedSchemas()

  const server = new ApolloServer({ schema })
  const { url } = await server.listen(Number(process.env.GATEWAY_PORT))

  console.log(`🚀 Gateway running at ${url}`)
}
