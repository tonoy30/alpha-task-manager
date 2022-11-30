import { PrismaClient } from '@prisma/client'
import type { ExpressContext } from 'apollo-server-express'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { prisma } from './prisma'
export interface Context {
  prisma: PrismaClient
}

export type MockContext = {
  prisma: DeepMockProxy<PrismaClient>
}

export function createContext(ctx: ExpressContext): Context {
  return {
    ...ctx,
    prisma,
  }
}

export const createMockContext = (): MockContext => {
  return {
    prisma: mockDeep<PrismaClient>(),
  }
}
