import { adminRepo } from '~/db/repository/admin/admin.repository'
import { userRepo } from '~/db/repository/client/user.repository'
import { jwtAsyncVerify } from '~/utils/jwt'

export const decodeAndVerifyJwtToken = async (token: string, isClient: boolean) => {
    const decodedJwt = await jwtAsyncVerify(token, process.env.JWTSECRET as string)
    if (isClient) return await userRepo.findOneBy({ uuid: decodedJwt.uuid })
    return await adminRepo.findOneBy({ uuid: decodedJwt.uuid })
}
