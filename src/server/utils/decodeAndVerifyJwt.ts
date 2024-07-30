import { manager } from '~/db/manager/manager'
import { AdminEntities } from '~/entities/admin/admin.entities'
import { EmployeeEntities } from '~/entities/employee/employee.entities'
import { jwtAsyncVerify } from '~/utils/jwt'

export const decodeAndVerifyJwtToken = async (token: string, isClient: boolean) => {
    const decodedJwt = await jwtAsyncVerify(token, process.env.JWTSECRET as string)
    if (isClient) return await manager.findOneBy(EmployeeEntities, { uuid: decodedJwt.uuid })
    return await manager.findOneBy(AdminEntities, { uuid: decodedJwt.uuid })
}
