import { privateProcedure, publicProcedure, router } from '~/trpc'
import { loginRequestSchema, loginResponseSchema, refreshRequestSchema, refreshResponseSchema } from '~/db/zodSchema/types'
import { useAdminAuthService } from '~/utils/service/admin/auth/auth'

const { signin, refreshToToken } = useAdminAuthService()

export const adminAuthRouter = router({
    signin: publicProcedure.input(loginRequestSchema).output(loginResponseSchema).mutation(signin),
    refresh: privateProcedure.input(refreshRequestSchema).output(refreshResponseSchema).query(refreshToToken)
})
