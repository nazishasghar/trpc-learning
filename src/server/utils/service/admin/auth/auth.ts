import { TRPCError } from '@trpc/server'
import {
    AdminGetResponseSchema,
    LoginRequestSchema,
    LoginResponseSchema,
    RefreshRequestSchema,
    RefreshResponseSchema,
} from '~/db/zodSchema/types'
import { jwtAsyncSignIn } from '~/utils/jwt'
import bcrypt from 'bcrypt'
import { AdminEntities } from '~/entities/admin/admin.entities'
import { useUtilityFunction } from '~/utils/util'
import { v4 } from 'uuid'
import { manager } from '~/db/manager/manager'
import { AdminRefreshTokenEntities } from '~/entities/admin/admin-refresh-token.entities'

const { generateRandomToken, procedureFunction } = useUtilityFunction()

/**
 * Service for handling admin authentication operations.
 *
 * @module AdminAuthService
 */
export const useAdminAuthService = () => {
    /**
     * Signs a token for an admin user.
     *
     * This function generates a JWT token for the given admin user.
     *
     * @param {Admin} user - The admin user for whom the token is to be signed.
     * @returns {Promise<string>} A promise that resolves to the signed token.
     */
    const signToken = async (user: AdminEntities) => {
        return await jwtAsyncSignIn({ uuid: user.uuid }, process.env.JWTSECRET as string, '30min')
    }

    /**
     * Signs in an admin user by validating their credentials and generating access and refresh tokens.
     *
     * @param {ProcedureResolveOption<LoginRequestSchema>} opts - Options containing the input schema for login.
     * @param {string} opts.input.email - The email address of the admin user attempting to log in.
     * @param {string} opts.input.password - The password of the admin user attempting to log in.
     *
     * @throws {TRPCError} If the email or password is incorrect.
     *
     * @returns {Promise<LoginResponseSchema>} A promise that resolves to the response containing access and refresh tokens, token type, and expiration time.
     */
    const signin = procedureFunction<LoginRequestSchema, LoginResponseSchema>(async (opts) => {
        const existingUser = await manager.findOneBy(AdminEntities, { email: opts.input.email })
        const isPasswordCorrect = await bcrypt.compare(opts.input.password, existingUser?.password ?? '')

        if (!existingUser || !isPasswordCorrect)
            throw new TRPCError({ code: 'NOT_FOUND', message: 'email or password is incorrect' })

        const access_token = await signToken(existingUser)
        const refresh_token = await generateRefreshToken(existingUser)

        return {
            access_token,
            token_type: 'bearer',
            refresh_token,
            expires_in: 30 * 60,
        }
    })

    /**
     * Generates a refresh token for an admin user.
     *
     * @param {Admin} user - The admin user for whom the refresh token is to be generated.
     * @returns {Promise<string>} A promise that resolves to the generated refresh token.
     */
    const generateRefreshToken = async (user: AdminEntities) => {
        const token = generateRandomToken(120)

        const refreshToken = new AdminRefreshTokenEntities({
            uuid: v4(),
            token,
            user,
        })
        await manager.save(refreshToken)
        return token
    }

    /**
     * Validates a refresh token.
     *
     * @param {string} token - The refresh token to validate.
     * @returns {Promise<boolean>} A promise that resolves to true if the token is valid, otherwise false.
     */
    const validateRefreshToken = async (token: string) => {
        const refreshToken = await manager.findOneBy(AdminRefreshTokenEntities, { token })
        return !!refreshToken
    }

    /**
     * Finds an admin user associated with a refresh token.
     *
     * @param {string} refreshToken - The refresh token to find the associated user.
     * @returns {Promise<Admin>} A promise that resolves to the admin user associated with the refresh token.
     * @throws {TRPCError} If no user is found with the provided refresh token.
     */
    const findUserByRefreshToken = async (refreshToken: string) => {
        const res = await manager.findOne(AdminRefreshTokenEntities, {
            relations: { user: true },
            where: { token: refreshToken },
        })

        if (!res) throw new TRPCError({ code: 'NOT_FOUND', message: 'user not available' })
        return res.user
    }

    /**
     * Refreshes the access token using a valid refresh token for admin users.
     *
     * @param {ProcedureResolveOption<RefreshRequestSchema>} opts - Options containing the input schema for refreshing the token.
     * @param {string} opts.input.refresh_token - The refresh token to use for generating a new access token.
     *
     * @throws {TRPCError} If the refresh token is invalid or if no user is found with the token.
     *
     * @returns {Promise<RefreshResponseSchema>} A promise that resolves to the response containing the new access token, token type, and expiration time.
     */
    const refreshToToken = procedureFunction<RefreshRequestSchema, RefreshResponseSchema>(async (opts) => {
        if (!(await validateRefreshToken(opts.input.refresh_token)))
            throw new TRPCError({ code: 'BAD_REQUEST', message: 'token does not exist' })

        const user = await findUserByRefreshToken(opts.input.refresh_token)

        if (!user) throw new TRPCError({ code: 'NOT_FOUND', message: 'user does not exist with the token' })

        const token = await signToken(user)

        return {
            access_token: token,
            token_type: 'Bearer',
            expires_in: 30 * 60,
        }
    })

    /**
     * Fetches and returns the information of an admin based on the provided admin ID.
     *
     * @async
     * @function
     * @param {Object} opts - The options object containing the input parameters.
     * @param {AdminGetRequestSchema} opts.input - The request schema containing the admin ID.
     * @returns {Promise<AdminGetResponseSchema>} The response schema containing the admin information.
     * @throws {TRPCError} If the admin does not exist with the provided UUID.
     */
    const getAdminInfo = procedureFunction<unknown, AdminGetResponseSchema>(async (opts) => {
        if (!opts.ctx.user) throw new TRPCError({ code: 'NOT_FOUND', message: 'admin does not exist with the token' })
        return opts.ctx.user
    })

    return { signin, refreshToToken, getAdminInfo }
}
