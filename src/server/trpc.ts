import { CombinedDataTransformer, initTRPC, TRPCError } from '@trpc/server'
import { Context } from '~/utils/context'
import { decodeAndVerifyJwtToken } from '~/utils/decodeAndVerifyJwt'
import { OpenApiMeta } from 'trpc-openapi'

// https://github.com/blitz-js/superjson/issues/268
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fixESM = require('fix-esm')
import type SuperJSON from 'superjson'
import { classToPlain } from 'class-transformer'
const superjson: SuperJSON = fixESM.require('superjson')

export const transformer: CombinedDataTransformer = {
    input: superjson,
    output: {
        serialize: (object) => {
            return classToPlain(object)
        },
        // This `eval` only ever happens on the **client**
        deserialize: (object) => {
            return eval(object)
        },
    },
}
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
export const t = initTRPC.meta<OpenApiMeta>().context<Context>().create({ transformer })
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const { router } = t

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
        ctx: { user },
    })
})
