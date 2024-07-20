import { router } from '~/trpc'
import { adminAuthRouter } from './auth/auth.router'

export const adminRouter = router({
    auth: adminAuthRouter
})
