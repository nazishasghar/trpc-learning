import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify'

export async function createContext(opts: CreateFastifyContextOptions) {
    return {
        res: opts.res,
        req: opts.req
    }
}

export type Context = Awaited<ReturnType<typeof createContext>>
