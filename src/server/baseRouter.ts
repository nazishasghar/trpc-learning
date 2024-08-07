import { publicProcedure, router } from '~/trpc'
import { adminRouter } from '~/routers/admin/admin.router'
import { clientRouter } from '~/routers/client/client.router'

export const baseRouter = router({
    health: publicProcedure.query(() => 'healthy'),
    admin: adminRouter,
    client: clientRouter,
})
export type BaseRouter = typeof baseRouter
