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
    /**
     * Signs in a client user based on the provided request schema.
     *
     * @name signin
     * @type {TRPCProcedure<LoginRequestSchema, LoginResponseSchema>}
     * @input {LoginRequestSchema} - The request schema for signing in.
     * @output {LoginResponseSchema} - The response schema containing the login details.
     * @mutation {Function} signIn - The mutation function to sign in a user.
     */
    signin: publicProcedure
        .meta({
            openapi: {
                method: 'POST',
                path: '/api/client.auth.signin',
                description: 'A procedure route to signin client',
                tags: ['ClientAuthRouter'],
            },
        })
        .input(loginRequestSchema)
        .output(loginResponseSchema)
        .mutation(signIn),

    /**
     * Refreshes the authentication token for a client user.
     *
     * @name refresh
     * @type {TRPCProcedure<RefreshRequestSchema, RefreshResponseSchema>}
     * @input {RefreshRequestSchema} - The request schema for refreshing the token.
     * @output {RefreshResponseSchema} - The response schema containing the new token.
     * @mutation {Function} refreshToToken - The mutation function to refresh the token.
     */
    refresh: privateProcedure
        .meta({
            openapi: {
                method: 'GET',
                path: '/api/client.auth.refresh',
                description: 'A procedure route to get refresh token',
                tags: ['ClientAuthRouter'],
                protect: true,
            },
        })
        .input(refreshRequestSchema)
        .output(refreshResponseSchema)
        .query(refreshToToken),
})
