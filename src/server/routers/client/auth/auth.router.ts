import { publicProcedure, router } from '~/trpc'
import {
    loginRequestSchema,
    loginResponseSchema,
    createUserRequestSchema,
    refreshRequestSchema,
    refreshResponseSchema,
} from '~/db/zodSchema/types'
import { useClientAuthService } from '~/utils/service/client/auth/auth'

const { signIn, signup, refreshToToken } = useClientAuthService()

export const clientAuthRouter = router({
    signin: publicProcedure.input(loginRequestSchema).output(loginResponseSchema).mutation(signIn),

    signup: publicProcedure.input(createUserRequestSchema).mutation(signup),

    refresh: publicProcedure.input(refreshRequestSchema).output(refreshResponseSchema).query(refreshToToken),
})
