import { privateProcedure, publicProcedure, router } from '~/trpc'
import {
    adminGetResponseSchema,
    loginRequestSchema,
    loginResponseSchema,
    refreshRequestSchema,
    refreshResponseSchema,
} from '~/db/zodSchema/types'
import { useAdminAuthService } from '~/utils/service/admin/auth/auth'

const { signin, refreshToToken, getAdminInfo } = useAdminAuthService()

export const adminAuthRouter = router({
    /**
     * Signs in an admin user based on the provided request schema.
     *
     * @name signin
     * @type {TRPCProcedure<LoginRequestSchema, LoginResponseSchema>}
     * @input {LoginRequestSchema} - The request schema for signing in.
     * @output {LoginResponseSchema} - The response schema containing the login details.
     * @mutation {Function} signin - The mutation function to sign in a user.
     */
    signin: publicProcedure.input(loginRequestSchema).output(loginResponseSchema).mutation(signin),

    /**
     * Refreshes the authentication token for an admin user.
     *
     * @name refresh
     * @type {TRPCProcedure<RefreshRequestSchema, RefreshResponseSchema>}
     * @input {RefreshRequestSchema} - The request schema for refreshing the token.
     * @output {RefreshResponseSchema} - The response schema containing the new token.
     * @query {Function} refreshToToken - The query function to refresh the token.
     */
    refresh: privateProcedure.input(refreshRequestSchema).output(refreshResponseSchema).query(refreshToToken),

    /**
     * Defines the `getMe` procedure which fetches and returns the information of an admin based on the provided admin ID.
     *
     * @type {Procedure}
     * @property {Function} input - Defines the input schema for the procedure.
     * @property {Function} output - Defines the output schema for the procedure.
     * @property {Function} query - The function to be executed for the procedure, which in this case is `getAdminInfo`.
     */
    getMe: privateProcedure.output(adminGetResponseSchema).query(getAdminInfo),
})
