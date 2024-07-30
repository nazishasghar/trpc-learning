import { router } from '~/trpc'
import { adminAuthRouter } from '~/routers/admin/auth/auth.router'
import { adminfeedBackRouter } from '~/routers/admin/feedback/feedback.router'
import { adminEmployeeRouter } from './employee/employee'

export const adminRouter = router({
    auth: adminAuthRouter,
    feedback: adminfeedBackRouter,
    employee: adminEmployeeRouter
})
