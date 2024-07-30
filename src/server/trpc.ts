import { initTRPC, TRPCError } from '@trpc/server'
import { Context } from '~/utils/context'
import { decodeAndVerifyJwtToken } from '~/utils/decodeAndVerifyJwt'
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
export const t = initTRPC.context<Context>().create()
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router

export const publicProcedure = t.procedure

export const privateProcedure = t.procedure.use(async (opts) => {
    const getUserFromHeader = async () => {
        if (opts.ctx.req.headers.authorization) {
            const isClient = opts.ctx.req.url.startsWith('/api/client')
            const user = await decodeAndVerifyJwtToken(opts.ctx.req.headers.authorization.split(' ')[1], isClient)
            return user
        }
        return null
    }
    const user = await getUserFromHeader()
    if (!user) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'No user found' })

    return opts.next({
        ctx: { user }
    })
})
