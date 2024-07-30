import { TRPCError } from '@trpc/server'
import { CreateFeedBackSchema, DeleteFeedBackSchema, EditFeedBackSchema } from '~/db/zodSchema/types'
import { useUtilityFunction } from '~/utils/util'
import dayjs from 'dayjs'
import { v4 } from 'uuid'
import { manager } from '~/db/manager/manager'
import { EmployeeEntities } from '~/entities/employee/employee.entities'
import { FeedBackEntities } from '~/entities/feedback/feedback.entities'
import { AdminEntities } from '~/entities/admin/admin.entities'

const { procedureFunction } = useUtilityFunction()

/**
 * Service for managing admin FeedBacks.
 *
 * @module AdminFeedBackService
 */
export const useAdminFeedBackService = () => {
    const isFeedBackAccess = (employee: EmployeeEntities, user: AdminEntities) => {
        return employee.leader?.uuid === user.uuid || ['CEO', 'CTO', 'COO'].every((i) => user.position === i)
    }
    /**
     * Creates a new FeedBack for an employee.
     *
     * Takes in details for creating a FeedBack, including employee ID, points, and FeedBack date.
     *
     * @throws {TRPCError} If the employee does not exist or if the points exceed 100.
     *
     * @returns {Promise<FeedBack>} A promise that resolves to the created FeedBack.
     */
    const createFeedBack = procedureFunction<CreateFeedBackSchema>(async (opts) => {
        const employee = await manager.findOne(EmployeeEntities, {
            where: { uuid: opts.input.employeeId },
            relations: { leader: true },
        })
        if (!employee) throw new TRPCError({ code: 'NOT_FOUND', message: 'employee did not exist' })

        if (Number(opts.input.points) > 100)
            throw new TRPCError({ code: 'BAD_REQUEST', message: 'Point must not exceed 100' })

        if (!isFeedBackAccess(employee, opts.ctx.user as AdminEntities))
            throw new TRPCError({ code: 'BAD_REQUEST', message: 'Not allowed to create feedback' })

        const feedBack = new FeedBackEntities({
            uuid: v4(),
            employee,
            points: opts.input.points,
            comments: opts.input.comments,
            feedBackBy: opts.ctx.user as AdminEntities,
            feedBackDate: dayjs(opts.input.FeedBackDate).toDate(),
        })
        return await manager.save(feedBack)
    })

    /**
     * Edits an existing FeedBack.
     *
     * Updates an existing FeedBack based on its ID and the provided new data, checking for user authorization.
     *
     * @throws {TRPCError} If the FeedBack does not exist or if the user is not authorized to edit the FeedBack.
     *
     * @returns {Promise<FeedBack>} A promise that resolves to the updated FeedBack.
     */
    const editFeedBack = procedureFunction<EditFeedBackSchema>(async (opts) => {
        const employee = await manager.findOne(EmployeeEntities, {
            where: { uuid: opts.input.employeeId },
            relations: { leader: true },
        })
        if (!employee) throw new TRPCError({ code: 'NOT_FOUND', message: 'employee did not exist' })

        const feedBack = await manager.findOne(FeedBackEntities, {
            where: { uuid: opts.input.feedBackId },
            relations: { feedBackBy: true },
        })
        if (!feedBack) throw new TRPCError({ code: 'NOT_FOUND', message: 'feedBack not found' })

        if (!isFeedBackAccess(employee, opts.ctx.user as AdminEntities))
            throw new TRPCError({ code: 'BAD_REQUEST', message: 'The user is not authorized to edit this FeedBack' })

        Object.assign(feedBack, opts.input)
        return await manager.save(feedBack)
    })

    /**
     * Deletes an existing FeedBack.
     *
     * Removes a FeedBack based on its ID, verifying user authorization before deletion.
     *
     * @throws {TRPCError} If the FeedBack does not exist or if the user is not authorized to delete the FeedBack.
     *
     * @returns {Promise<DeleteResult>} A promise that resolves to the result of the deletion.
     */
    const deleteFeedBack = procedureFunction<DeleteFeedBackSchema>(async (opts) => {
        const employee = await manager.findOne(EmployeeEntities, {
            where: { uuid: opts.input.employeeId },
            relations: { leader: true },
        })
        if (!employee) throw new TRPCError({ code: 'NOT_FOUND', message: 'employee did not exist' })

        const feedBack = await manager.findOne(FeedBackEntities, {
            where: { uuid: opts.input.feedBackId },
        })

        if (!feedBack) throw new TRPCError({ code: 'NOT_FOUND', message: 'FeedBack not found' })

        if (!isFeedBackAccess(employee, opts.ctx.user as AdminEntities))
            throw new TRPCError({ code: 'BAD_REQUEST', message: 'The user is not authorized to edit this FeedBack' })

        return await manager.softDelete(FeedBackEntities, { uuid: feedBack.uuid })
    })

    return {
        createFeedBack,
        editFeedBack,
        deleteFeedBack,
    }
}
