import { healthRouter } from './routers/health.router'
import { userRouter } from './routers/user.router'
import { router } from './trpc'

export const baseRouter = router({
    health: healthRouter,
    user: userRouter,
})
export type BaseRouter = typeof baseRouter
