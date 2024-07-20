import { userRepo } from '~/db/repository/client/user.repository'
import { TRPCError } from '@trpc/server'
import bcrypt from 'bcrypt'
import { v4 } from 'uuid'
import {
    CreateUserRequestSchema,
    LoginRequestSchema,
    LoginResponseSchema,
    RefreshRequestSchema,
    RefreshResponseSchema,
} from '~/db/zodSchema/types'
import { useUtilityFunction } from '~/utils/util'
import { userRefreshRepo } from '~/db/repository/client/user-refresh.repository'
import { User } from '~/entities/user/user.entities'
import { jwtAsyncSignIn } from '~/utils/jwt'

const { generateRandomToken, procedureFunction } = useUtilityFunction()

export const useClientAuthService = () => {
    const signToken = async (user: User) =>
        await jwtAsyncSignIn({ uuid: user.uuid }, process.env.JWTSECRET as string, '30min')

    /**
     * Signs in a user by validating their credentials and generating access and refresh tokens.
     *
     * @param {ProcedureResolveOption<LoginRequestSchema>} opts - Options containing the input schema.
     * @returns {Promise<LoginResponseSchema>} - The response containing tokens and other information.
     */
    const signIn = procedureFunction<LoginRequestSchema, LoginResponseSchema>(async (opts) => {
        const existingUser = await userRepo.findOneBy({ email: opts.input.email })

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
     * Signs up a new user by creating and saving their details.
     *
     * @param {ProcedureResolveOption<CreateUserRequestSchema>} opts - Options containing the input schema.
     * @returns {Promise<User>} - The created user.
     */
    const signup = procedureFunction<CreateUserRequestSchema>(async (opts) => {
        const user = userRepo.create({
            uuid: v4(),
            name: opts.input.name,
            password: await bcrypt.hash(opts.input.password, 10),
            address: opts.input.address,
            email: opts.input.email,
        })
        return await userRepo.save(user)
    })

    const generateRefreshToken = async (user: User) => {
        const token = generateRandomToken(120)

        await userRefreshRepo.save(
            userRefreshRepo.create({
                uuid: v4(),
                token,
                user,
            }),
        )
        return token
    }

    const validateRefreshToken = async (token: string) => {
        const refreshToken = await userRefreshRepo.findOneBy({ token })
        return !!refreshToken
    }

    const findUserByRefreshToken = async (refreshToken: string) => {
        const res = await userRefreshRepo.findOne({
            relations: { user: true },
            where: { token: refreshToken },
        })

        if (!res?.user) throw new TRPCError({ code: 'NOT_FOUND', message: 'user not available' })
        return res.user
    }

    /**
     * Refreshes the access token using a valid refresh token.
     *
     * @param {ProcedureResolveOption<RefreshRequestSchema>} opts - Options containing the input schema.
     * @returns {Promise<RefreshResponseSchema>} - The response containing the new access token and other information.
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
        signup,
        refreshToToken,
    }
}
