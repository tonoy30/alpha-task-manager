import { Resolvers } from 'generated/types'
import { Context } from '../../../libs/context'

export const mutation: Resolvers<Context>['Mutation'] = {
  createUser: async (_parent, { input }, ctx) =>
    ctx.prisma.user.create({ data: input }),
  updateUser: async (_parent, { id, input }, ctx) =>
    ctx.prisma.user.update({
      where: { id },
      data: {
        username: input.username ?? undefined,
      },
    }),
}
