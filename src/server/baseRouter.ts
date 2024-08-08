import { publicProcedure, router } from '~/trpc'
import { adminRouter } from '~/routers/admin/admin.router'
import { clientRouter } from '~/routers/client/client.router'
import { z } from 'zod'

export const baseRouter = router({
    health: publicProcedure
        .meta({
            openapi: {
                method: 'GET',
                path: '/api/health',
                description: 'A procedure route for health check',
                tags: ['RouterHealthCheck'],
            },
        })
        .input(z.void())
        .output(z.string())
        .query(() => 'healthy'),
    admin: adminRouter,
    client: clientRouter,
})
export type BaseRouter = typeof baseRouter
