import z from 'zod'
import { EmployeeEntities } from '~/entities/employee/employee.entities'
import { FeedBackEntities } from '~/entities/feedback/feedback.entities'

export const createEmployeeRequestSchema = z.object({
    name: z.string().min(1, 'name is required'),
    password: z.string().min(8, 'password must be 8 character or more'),
    email: z.string().min(1, 'email is required'),
})

export type CreateEmployeeRequestSchema = z.infer<typeof createEmployeeRequestSchema>

export const loginRequestSchema = z.object({
    email: z.string().min(1, 'email is required').email('email must be an email'),
    password: z.string({ required_error: 'password is required' }).min(8, 'password must be 8 character or more'),
})

export type LoginRequestSchema = z.infer<typeof loginRequestSchema>

export const loginResponseSchema = z.object({
    access_token: z.string(),
    refresh_token: z.string(),
    token_type: z.string(),
    expires_in: z.number(),
})

export type LoginResponseSchema = z.infer<typeof loginResponseSchema>

export const refreshRequestSchema = z.object({
    refresh_token: z.string(),
})

export type RefreshRequestSchema = z.infer<typeof refreshRequestSchema>

export const refreshResponseSchema = z.object({
    access_token: z.string(),
    token_type: z.string(),
    expires_in: z.number(),
})

export type RefreshResponseSchema = z.infer<typeof refreshResponseSchema>

export const createFeedBackSchema = z.object({
    points: z.string(),
    comments: z.string(),
    employeeId: z.string(),
    FeedBackDate: z.string(),
})

export type CreateFeedBackSchema = z.infer<typeof createFeedBackSchema>

export const editFeedBackSchema = z.object({
    feedBackId: z.string(),
    employeeId: z.string(),
    points: z.string(),
    comments: z.string(),
    FeedBackDate: z.string(),
})

export type EditFeedBackSchema = z.infer<typeof editFeedBackSchema>

export const deleteFeedBackSchema = z.object({
    feedBackId: z.string(),
    employeeId: z.string(),
})

export type DeleteFeedBackSchema = z.infer<typeof deleteFeedBackSchema>

export const employeeFeedBackListRequestSchema = z.object({
    employeeId: z.string(),
    page: z.number(),
    limit: z.number(),
})

export type EmployeeFeedBackListRequestSchema = z.infer<typeof employeeFeedBackListRequestSchema>

export const employeeFeedBackListResponseSchema = z.object({
    feedBackList: z.array(z.custom<FeedBackEntities>()),
})

export type EmployeeFeedBackListResponseSchema = z.infer<typeof employeeFeedBackListResponseSchema>

export const employeeListResponseSchema = z.object({
    employeeList: z.array(z.custom<EmployeeEntities>()),
})

export type EmployeeListResponseSchema = z.infer<typeof employeeListResponseSchema>

export const commonListRequestSchema = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
})

export type CommonListRequestSchema = z.infer<typeof commonListRequestSchema>
