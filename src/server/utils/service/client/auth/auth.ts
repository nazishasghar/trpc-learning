import { TRPCError } from '@trpc/server'
import bcrypt from 'bcrypt'
import { v4 } from 'uuid'
import {
    LoginRequestSchema,
    LoginResponseSchema,
    RefreshRequestSchema,
    RefreshResponseSchema,
} from '~/db/zodSchema/types'
import { useUtilityFunction } from '~/utils/util'
import { EmployeeEntities } from '~/entities/employee/employee.entities'
import { jwtAsyncSignIn } from '~/utils/jwt'
import { manager } from '~/db/manager/manager'
import { EmployeeRefreshTokenEntities } from '~/entities/employee/employee-refresh-token.entities'

const { generateRandomToken, procedureFunction } = useUtilityFunction()

/**
 * Service for handling client authentication operations.
 *
 * @module ClientAuthService
 */
export const useClientAuthService = () => {
    /**
     * Signs a token for an employee.
     *
     * This function generates a JWT token for the given employee.
     *
     * @param {Employee} employee - The employee for whom the token is to be signed.
     * @returns {Promise<string>} A promise that resolves to the signed token.
     */
    const signToken = async (employee: EmployeeEntities) => await jwtAsyncSignIn({ uuid: employee.uuid }, '30min')

    /**
     * Signs in a user by validating their credentials and generating access and refresh tokens.
     *
     * @param {ProcedureResolveOption<LoginRequestSchema>} opts - Options containing the input schema for login.
     * @param {string} opts.input.email - The email address of the user attempting to log in.
     * @param {string} opts.input.password - The password of the user attempting to log in.
     *
     * @throws {TRPCError} If the email or password is incorrect.
     *
     * @returns {Promise<LoginResponseSchema>} A promise that resolves to the response containing access and refresh tokens, token type, and expiration time.
     */
    const signIn = procedureFunction<LoginRequestSchema, LoginResponseSchema>(async (opts) => {
        const existingUser = await manager.findOneBy(EmployeeEntities, { email: opts.input.email })

        const isPasswordCorrect = await bcrypt.compare(opts.input.password, existingUser?.password ?? '')

        if (!existingUser || !isPasswordCorrect)
            throw new TRPCError({ code: 'NOT_FOUND', message: 'email or password is incorrect' })

        const refresh_token = await generateRefreshToken(existingUser)
        const access_token = await signToken(existingUser)

        return {
            access_token,
            refresh_token,
            token_type: 'Bearer',
            expires_in: 30 * 60,
        }
    })
    /**
     * Generates a refresh token for an employee.
     *
     * @param {Employee} employee - The employee for whom the refresh token is to be generated.
     * @returns {Promise<string>} A promise that resolves to the generated refresh token.
     */
    const generateRefreshToken = async (employee: EmployeeEntities) => {
        const token = generateRandomToken(120)

        const refreshToken = new EmployeeRefreshTokenEntities({
            uuid: v4(),
            token,
            employee,
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
        const refreshToken = await manager.findOneBy(EmployeeRefreshTokenEntities, { token })
        return !!refreshToken
    }

    /**
     * Finds a user associated with a refresh token.
     *
     * @param {string} refreshToken - The refresh token to find the associated user.
     * @returns {Promise<Employee>} A promise that resolves to the employee associated with the refresh token.
     * @throws {TRPCError} If no user is found with the provided refresh token.
     */
    const findUserByRefreshToken = async (refreshToken: string) => {
        const res = await manager.findOne(EmployeeRefreshTokenEntities, {
            relations: { employee: true },
            where: { token: refreshToken },
        })

        if (!res?.employee) throw new TRPCError({ code: 'NOT_FOUND', message: 'user not available' })
        return res.employee
    }

    /**
     * Refreshes the access token using a valid refresh token.
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
            token_type: 'bearer',
            expires_in: 30 * 60,
        }
    })

    return {
        signIn,
        refreshToToken,
    }
}
