import { TRPCError } from '@trpc/server'
import { manager } from '~/db/manager/manager'
import {
    EmployeeFeedBackListResponseSchema,
    CommonListRequestSchema,
    FeedbackGetRequestSchema,
    FeedbackGetResponseSchema,
} from '~/db/zodSchema/types'
import { EmployeeEntities } from '~/entities/employee/employee.entities'
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
     * @param {number} opts.input.limit - The number of FeedBacks to retrieve per page.
     * @param {number} opts.input.page - The page number to retrieve.
     *
     * @returns {Promise<EmployeeFeedBackListResponseSchema>} A promise that resolves to an object containing the list of FeedBacks.
     */
    const listFeedBack = procedureFunction<CommonListRequestSchema, EmployeeFeedBackListResponseSchema>(
        async (opts) => {
            const { take, skip } = calcPager(opts.input.limit, opts.input.page)

            return await manager.findAndCount(FeedBackEntities, {
                where: { employee: { uuid: (opts.ctx.user as EmployeeEntities).uuid } },
                take,
                skip,
                relations: { feedBackBy: true },
            })
        },
    )

    /**
     * Retrieves feedback by UUID and ensures the associated employee exists.
     *
     * @param opts - The options object containing input data.
     * @param opts.input - The input data.
     * @param opts.input.feedBackId - The UUID of the feedback.
     * @returns The feedback entity corresponding to the provided UUID.
     * @throws {TRPCError} If the employee or feedback is not found.
     */
    const getFeedbackWithUuid = procedureFunction<FeedbackGetRequestSchema, FeedbackGetResponseSchema>(async (opts) => {
        const feedBack = await manager.findOne(FeedBackEntities, {
            where: { uuid: opts.input.feedbackId },
            relations: { feedBackBy: true, employee: true },
        })

        if (!feedBack) throw new TRPCError({ code: 'NOT_FOUND', message: 'FeedBack not found' })
        return feedBack
    })

    return { listFeedBack, getFeedbackWithUuid }
}
