import { privateProcedure, publicProcedure, router } from '~/trpc'
import {
    loginRequestSchema,
    loginResponseSchema,
    refreshRequestSchema,
    refreshResponseSchema,
} from '~/db/zodSchema/types'
import { useClientAuthService } from '~/utils/service/client/auth/auth'

const { signIn, refreshToToken } = useClientAuthService()

export const clientAuthRouter = router({
    signin: publicProcedure.input(loginRequestSchema).output(loginResponseSchema).mutation(signIn),

    refresh: privateProcedure.input(refreshRequestSchema).output(refreshResponseSchema).mutation(refreshToToken),
})
