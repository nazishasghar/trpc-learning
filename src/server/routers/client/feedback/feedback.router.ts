import {
    commonListRequestSchema,
    employeeFeedBackListResponseSchema,
    feedbackGetRequestSchema,
    feedbackGetResponseSchema,
} from '~/db/zodSchema/types'
import { privateProcedure, t } from '~/trpc'
import { useClientFeedBackService } from '~/utils/service/client/feedback/feedback'

const { listFeedBack, getFeedbackWithUuid } = useClientFeedBackService()

export const clientFeedBackRouter = t.router({
    /**
     * Lists feedback for an employee based on the provided request schema.
     *
     * @name list
     * @type {TRPCProcedure<EmployeeFeedBackListRequestSchema, EmployeeFeedBackListResponseSchema>}
     * @input {EmployeeFeedBackListRequestSchema} - The request schema for listing feedback.
     * @output {EmployeeFeedBackListResponseSchema} - The response schema containing the list of feedback.
     * @query {Function} listFeedBack - The query function to list feedback.
     */
    list: privateProcedure
        .meta({
            openapi: {
                method: 'GET',
                path: '/api/client.feedback.list',
                description: 'A procedure route to client feedback list',
                tags: ['ClientFeedbackRouter'],
                protect: true,
            },
        })
        .input(commonListRequestSchema)
        .output(employeeFeedBackListResponseSchema)
        .query(listFeedBack),

    /**
     * Retrieves feedback by UUID and ensures the associated employee exists.
     *
     * @param opts - The options object containing input data.
     * @param opts.input - The input data.
     * @param opts.input.employeeId - The UUID of the employee.
     * @param opts.input.feedBackId - The UUID of the feedback.
     * @returns The feedback entity corresponding to the provided UUID.
     * @throws {TRPCError} If the employee or feedback is not found.
     */
    getFeedbackWithUuid: privateProcedure
        .meta({
            openapi: {
                method: 'POST',
                path: '/api/client.feedback.getFeedbackWithUuid',
                description: 'A procedure route to feedback with uuid',
                tags: ['ClientFeedbackRouter'],
                protect: true,
            },
        })
        .input(feedbackGetRequestSchema)
        .output(feedbackGetResponseSchema)
        .query(getFeedbackWithUuid),
})
