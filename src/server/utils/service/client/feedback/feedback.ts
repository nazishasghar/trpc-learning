import { manager } from '~/db/manager/manager'
import { EmployeeFeedBackListResponseSchema, EmployeeFeedBackListRequestSchema } from '~/db/zodSchema/types'
import { FeedBackEntities } from '~/entities/feedback/feedback.entities'
import { useUtilityFunction } from '~/utils/util'

const { procedureFunction, calcPager } = useUtilityFunction()

/**
 * Service for managing client-side FeedBack operations.
 *
 * @module ClientFeedBackService
 */
export const useClientFeedBackService = () => {
    /**
     * Lists FeedBacks for a specific employee.
     *
     * This function retrieves a paginated list of FeedBacks based on the provided employee ID, limit, and page number.
     *
     * @param {EmployeeFeedBackListRequestSchema} opts - The options for listing FeedBacks.
     * @param {string} opts.input.employeeId - The UUID of the employee whose FeedBacks are to be listed.
     * @param {number} opts.input.limit - The number of FeedBacks to retrieve per page.
     * @param {number} opts.input.page - The page number to retrieve.
     *
     * @returns {Promise<EmployeeFeedBackListResponseSchema>} A promise that resolves to an object containing the list of FeedBacks.
     */
    const listFeedBack = procedureFunction<EmployeeFeedBackListRequestSchema, EmployeeFeedBackListResponseSchema>(
        async (opts) => {
            const { take, skip } = calcPager(opts.input.limit, opts.input.page)

            return await manager.findAndCount(FeedBackEntities, {
                where: { employee: { uuid: opts.input.employeeId } },
                take,
                skip,
                relations: { feedBackBy: true },
            })
        },
    )

    return { listFeedBack }
}
