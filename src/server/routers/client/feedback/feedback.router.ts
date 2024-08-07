import { employeeFeedBackListRequestSchema, employeeFeedBackListResponseSchema } from '~/db/zodSchema/types'
import { privateProcedure, t } from '~/trpc'
import { useClientFeedBackService } from '~/utils/service/client/feedback/feedback'

const { listFeedBack } = useClientFeedBackService()

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
        .input(employeeFeedBackListRequestSchema)
        .output(employeeFeedBackListResponseSchema)
        .query(listFeedBack),
})
