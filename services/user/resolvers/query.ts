import { Context } from '@libs/context'
import { Resolvers } from 'generated/types'

export const query: Resolvers<Context>['Query'] = {
  users: async (_parent, _args, ctx) => ctx.prisma.user.findMany(),
  user: async (_parent, { id }, ctx) =>
    ctx.prisma.user.findUnique({
      where: { id },
    }),
}
