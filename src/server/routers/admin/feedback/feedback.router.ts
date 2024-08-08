import { z } from 'zod'
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
    create: privateProcedure
        .meta({
            openapi: {
                method: 'POST',
                path: '/api/admin.feedback.create',
                description: 'A procedure route to create feedback',
                tags: ['AdminFeedbackRouter'],
                protect: true,
            },
        })
        .input(createFeedBackSchema)
        .output(feedbackGetResponseSchema)
        .mutation(createFeedBack),

    /**
     * Edits feedback based on the provided request schema.
     *
     * @name edit
     * @type {TRPCProcedure<EditFeedBackSchema, void>}
     * @input {EditFeedBackSchema} - The request schema for editing feedback.
     * @mutation {Function} editFeedBack - The mutation function to edit feedback.
     */
    edit: privateProcedure
        .meta({
            openapi: {
                method: 'POST',
                path: '/api/admin.feedback.edit',
                description: 'A procedure route to edit feedback',
                tags: ['AdminFeedbackRouter'],
                protect: true,
            },
        })
        .input(editFeedBackSchema)
        .output(feedbackGetResponseSchema)
        .mutation(editFeedBack),

    /**
     * Deletes feedback based on the provided request schema.
     *
     * @name delete
     * @type {TRPCProcedure<DeleteFeedBackSchema, void>}
     * @input {DeleteFeedBackSchema} - The request schema for deleting feedback.
     * @mutation {Function} deleteFeedBack - The mutation function to delete feedback.
     */
    delete: privateProcedure
        .meta({
            openapi: {
                method: 'POST',
                path: '/api/admin.feedback.delete',
                description: 'A procedure route to delete feedback',
                tags: ['AdminFeedbackRouter'],
                protect: true,
            },
        })
        .input(deleteFeedBackSchema)
        .output(z.void())
        .mutation(deleteFeedBack),

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
        .meta({
            openapi: {
                method: 'POST',
                path: '/api/admin.feedback.employeeFeedbackList/{employeeId}',
                description: 'A procedure route to employee feedback list',
                tags: ['AdminFeedbackRouter'],
                protect: true,
            },
        })
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
        .meta({
            openapi: {
                method: 'POST',
                path: '/api/admin.feedback.getFeedbackWithUuid/{feedbackId}',
                description: 'A procedure route to feedback with uuid',
                tags: ['AdminFeedbackRouter'],
                protect: true,
            },
        })
        .input(feedbackGetRequestSchema)
        .output(feedbackGetResponseSchema)
        .query(getFeedbackWithUuid),
})
