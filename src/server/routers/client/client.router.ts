import { router } from '~/trpc'
import { clientAuthRouter } from '~/routers/client/auth/auth.router'
import { clientFeedBackRouter } from '~/routers/client/feedback/feedback.router'

export const clientRouter = router({
    auth: clientAuthRouter,
    feedback: clientFeedBackRouter
})
