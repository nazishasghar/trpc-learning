import {
    createFeedBackSchema,
    deleteFeedBackSchema,
    editFeedBackSchema,
    employeeFeedBackListRequestSchema,
    employeeFeedBackListResponseSchema,
    feedbackGetRequestSchema,
    feedbackGetResponseSchema,
} from '~/db/zodSchema/types'
import { privateProcedure, router } from '~/trpc'
import { useAdminFeedBackService } from '~/utils/service/admin/feedback/feedback'

const { createFeedBack, editFeedBack, deleteFeedBack, getEmployeeFeedBackList, getFeedbackWithUuid } =
    useAdminFeedBackService()

export const adminfeedBackRouter = router({
    /**
     * Creates feedback based on the provided request schema.
     *
     * @name create
     * @type {TRPCProcedure<CreateFeedBackSchema, void>}
     * @input {CreateFeedBackSchema} - The request schema for creating feedback.
     * @mutation {Function} createFeedBack - The mutation function to create feedback.
     */
    create: privateProcedure.input(createFeedBackSchema).mutation(createFeedBack),

    /**
     * Edits feedback based on the provided request schema.
     *
     * @name edit
     * @type {TRPCProcedure<EditFeedBackSchema, void>}
     * @input {EditFeedBackSchema} - The request schema for editing feedback.
     * @mutation {Function} editFeedBack - The mutation function to edit feedback.
     */
    edit: privateProcedure.input(editFeedBackSchema).mutation(editFeedBack),

    /**
     * Deletes feedback based on the provided request schema.
     *
     * @name delete
     * @type {TRPCProcedure<DeleteFeedBackSchema, void>}
     * @input {DeleteFeedBackSchema} - The request schema for deleting feedback.
     * @mutation {Function} deleteFeedBack - The mutation function to delete feedback.
     */
    delete: privateProcedure.input(deleteFeedBackSchema).mutation(deleteFeedBack),

    /**
     * Procedure to retrieve a list of feedback entries for a specific employee.
     *
     * This procedure allows querying feedback entries based on the employee's UUID, with pagination support.
     *
     * @param {employeeFeedBackListRequestSchema} input - The input schema containing:
     * - `employeeId` {string} - The UUID of the employee.
     * - `limit` {number} - The number of feedback entries to retrieve per page.
     * - `page` {number} - The page number for pagination.
     *
     * @returns {employeeFeedBackListResponseSchema} - The response schema containing:
     * - An array of feedback entries associated with the specified employee.
     *
     * @throws {TRPCError} - Throws an error if the specified employee does not exist.
     */
    employeeFeedbackList: privateProcedure
        .input(employeeFeedBackListRequestSchema)
        .output(employeeFeedBackListResponseSchema)
        .query(getEmployeeFeedBackList),

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
        .input(feedbackGetRequestSchema)
        .output(feedbackGetResponseSchema)
        .query(getFeedbackWithUuid),
})
