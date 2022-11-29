import { Context } from '@libs/context'
import { Resolvers } from 'generated/types'

export const query: Resolvers<Context>['Query'] = {
  lists: async (_parent, _args, ctx) =>
    ctx.prisma.list.findMany({
      include: {
        tasks: {
          orderBy: {
            order: 'desc',
          },
        },
      },
    }),
}
