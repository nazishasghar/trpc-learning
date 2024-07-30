import { commonListRequestSchema, employeeListResponseSchema } from '~/db/zodSchema/types'
import { privateProcedure, t } from '~/trpc'
import { useAdminEmployeeService } from '~/utils/service/admin/employee/employee'

const { listEmployees } = useAdminEmployeeService()
export const adminEmployeeRouter = t.router({
    list: privateProcedure.input(commonListRequestSchema).output(employeeListResponseSchema).mutation(listEmployees),
})
