import { TRPCError } from '@trpc/server'
import { manager } from '~/db/manager/manager'
import {
    CommonListRequestSchema,
    EmployeeGetRequestSchema,
    EmployeeGetResponseSchema,
    EmployeeListResponseSchema,
} from '~/db/zodSchema/types'
import { EmployeeEntities } from '~/entities/employee/employee.entities'
import { useUtilityFunction } from '~/utils/util'

const { procedureFunction, calcPager } = useUtilityFunction()
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
    const listEmployees = procedureFunction<CommonListRequestSchema, EmployeeListResponseSchema>(async (opts) => {
        const { skip, take } = calcPager(opts.input.limit, opts.input.page)
        return await manager.findAndCount(EmployeeEntities, {
            order: { position: 'DESC' },
            relations: { leader: true },
            skip,
            take,
        })
    })

    /**
     * Fetches an employee by their UUID along with their leader and feedback relations.
     *
     * @param {Object} opts - The options object containing input parameters.
     * @param {EmployeeGetRequestSchema} opts.input - The request schema for fetching an employee.
     * @param {string} opts.input.employeeId - The UUID of the employee to fetch.
     * @returns {Promise<EmployeeGetResponseSchema>} The employee data including leader and feedbacks.
     * @throws {TRPCError} If no employee is found with the given UUID.
     */
    const getEmployee = procedureFunction<EmployeeGetRequestSchema, EmployeeGetResponseSchema>(async (opts) => {
        const employee = await manager.findOne(EmployeeEntities, {
            where: { uuid: opts.input.employeeId },
            relations: { leader: true },
        })

        if (!employee) throw new TRPCError({ code: 'NOT_FOUND', message: 'no employee found' })

        return employee
    })

    return {
        listEmployees,
        getEmployee,
    }
}
