import { router } from '~/trpc'
import { userRouter } from './user/user.router'
import { clientAuthRouter } from './auth/auth.router'

export const clientRouter = router({
    auth: clientAuthRouter,
    user: userRouter,
})
