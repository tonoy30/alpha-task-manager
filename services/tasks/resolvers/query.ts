import { Context } from '@libs/context'
import { Resolvers } from 'generated/types'
import { applyTakeConstraints } from '../../../utils/query.util'

export const query: Resolvers<Context>['Query'] = {
  lists: async (_parent, _args, ctx) =>
    ctx.prisma.list.findMany({
      include: {
        tasks: {
          orderBy: {
            position: 'desc',
          },
        },
      },
    }),
  pagedLists: async (_parent, args, ctx) => {
    const take = applyTakeConstraints({
      min: 1,
      max: 50,
      value: args.take ?? 30,
    })
    return ctx.prisma.list.findMany({
      skip: args.skip,
      take,
      include: {
        tasks: {
          orderBy: {
            position: 'desc',
          },
        },
      },
    })
  },
}
