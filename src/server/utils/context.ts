import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify'
import { decodeAndVerifyJwtToken } from '~/utils/decodeAndVerifyJwt'

export async function createContext(opts: CreateFastifyContextOptions) {
    const getUserFromHeader = async () => {
        if (opts.req.headers.authorization) {
            const isClient = opts.req.url.startsWith('/api/client')
            const user = await decodeAndVerifyJwtToken(opts.req.headers.authorization.split(' ')[1], isClient)
            return user
        }
        return null
    }
    const user = await getUserFromHeader()
    return {
        user,
    }
}

export type Context = Awaited<ReturnType<typeof createContext>>
