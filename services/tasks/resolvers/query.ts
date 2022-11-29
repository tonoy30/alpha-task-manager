import { Context } from '@libs/context'
import { Resolvers } from 'generated/types'

export const query: Resolvers<Context>['Query'] = {
  // NOTE: codegen and prisma datatype is not matched
  lists: async (_parent, _args, ctx): Promise<any> =>
    ctx.prisma.list.findMany({
      include: {
        tasks: true,
      },
    }),
}
