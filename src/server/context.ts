import { prisma } from '@/server/db/client'
import { type inferAsyncReturnType } from '@trpc/server'
import { type CreateNextContextOptions } from '@trpc/server/adapters/next'

export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts
  return {
    req,
    res,
    prisma,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
