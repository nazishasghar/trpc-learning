import { TRPCError } from '@trpc/server'
import { userRepo } from '~/db/repository/client/user.repository'
import { LoginRequestSchema, LoginResponseSchema, RefreshRequestSchema, RefreshResponseSchema } from '~/db/zodSchema/types'
import { jwtAsyncSignIn } from '~/utils/jwt'
import bcrypt from 'bcrypt'
import { Admin } from '~/entities/admin/admin.entities'
import { useUtilityFunction } from '~/utils/util'
import { adminRefreshRepo } from '~/db/repository/admin/admin-refresh.repository'
import { v4 } from 'uuid'

const { generateRandomToken, procedureFunction } = useUtilityFunction()

export const useAdminAuthService = () => {
    const signToken = async (user: Admin) => {
        return await jwtAsyncSignIn({ uuid: user.uuid }, process.env.JWTSECRET as string, '30min')
    }

    /**
     * Signs in an Admin user by validating their credentials and generating access and refresh tokens.
     *
     * @param {ProcedureResolveOption<LoginRequestSchema>} opts - Options containing the input schema.
     * @returns {Promise<LoginResponseSchema>} - The response containing tokens and other information.
     * @throws {TRPCError} - Throws error if email or password is incorrect.
     */
    const signin = procedureFunction<LoginRequestSchema, LoginResponseSchema>(async (opts) => {
        const existingUser = await userRepo.findOneBy({ email: opts.input.email })
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

    const generateRefreshToken = async (user: Admin) => {
        const token = generateRandomToken(120)

        await adminRefreshRepo.save(
            adminRefreshRepo.create({
                uuid: v4(),
                token,
                user,
            }),
        )
        return token
    }

    const validateRefreshToken = async (token: string) => {
        const refreshToken = await adminRefreshRepo.findOneBy({ token })
        return !!refreshToken
    }

    const findUserByRefreshToken = async (refreshToken: string) => {
        const res = await adminRefreshRepo.findOne({
            relations: { user: true },
            where: { token: refreshToken },
        })

        if (!res) throw new TRPCError({ code: 'NOT_FOUND', message: 'user not available' })
        return res.user
    }

    /**
     * Refreshes the access token using a valid refresh token for Admin users.
     *
     * @param {ProcedureResolveOption<RefreshRequestSchema>} opts - Options containing the input schema.
     * @returns {Promise<RefreshResponseSchema>} - The response containing the new access token and other information.
     * @throws {TRPCError} - Throws error if the refresh token does not exist or the associated user is not found.
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
    return { signin, refreshToToken }
}
