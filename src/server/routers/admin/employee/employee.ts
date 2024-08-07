import {
    commonListRequestSchema,
    employeeGetRequestSchema,
    employeeGetResponseSchema,
    employeeListResponseSchema,
} from '~/db/zodSchema/types'
import { privateProcedure, t } from '~/trpc'
import { useAdminEmployeeService } from '~/utils/service/admin/employee/employee'

const { listEmployees, getEmployee } = useAdminEmployeeService()

export const adminEmployeeRouter = t.router({
    /**
     * Lists employees based on the provided request schema.
     *
     * @name list
     * @type {TRPCProcedure<CommonListRequestSchema, EmployeeListResponseSchema>}
     * @input {CommonListRequestSchema} - The request schema for listing employees.
     * @output {EmployeeListResponseSchema} - The response schema containing the list of employees.
     * @query {Function} listEmployees - The query function to list employees.
     */
    list: privateProcedure.input(commonListRequestSchema).output(employeeListResponseSchema).query(listEmployees),

    /**
     * Fetches an employee by their UUID.
     *
     * @name getEmployee
     * @type {TRPCProcedure<EmployeeGetRequestSchema, EmployeeGetResponseSchema>}
     * @input {EmployeeGetRequestSchema} - The request schema for fetching an employee.
     * @output {EmployeeGetResponseSchema} - The response schema containing the employee details.
     * @query {Function} getEmployee - The query function to get an employee.
     */
    getEmployee: privateProcedure.input(employeeGetRequestSchema).output(employeeGetResponseSchema).query(getEmployee),
})
