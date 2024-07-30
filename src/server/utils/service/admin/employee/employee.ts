import { manager } from '~/db/manager/manager'
import { CommonListRequestSchema, EmployeeListResponseSchema } from '~/db/zodSchema/types'
import { EmployeeEntities } from '~/entities/employee/employee.entities'
import { useUtilityFunction } from '~/utils/util'

const { procedureFunction } = useUtilityFunction()
/**
 * Custom Service to manage employee-related operations in the admin context.
 */
export const useAdminEmployeeService = () => {
    /**
     * Fetches and returns a list of employees sorted by name in ascending order.
     * @async
     * @function
     * @returns {Promise<EmployeeListResponseSchema>} The response containing the list of employees.
     */
    const listEmployees = procedureFunction<CommonListRequestSchema, EmployeeListResponseSchema>(async () => {
        const employeeList = await manager.find(EmployeeEntities, { order: { name: 'ASC' } })
        return {
            employeeList,
        }
    })

    return {
        listEmployees,
    }
}
