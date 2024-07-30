import z from 'zod'
export const loginSchema = z.object({
    email: z.string({ required_error: 'This is a required field' }).email('Email must be an email'),
    password: z.string({ required_error: 'This is a required field' }).min(8, 'Minimum 8 characters required'),
})

export type LoginSchema = z.infer<typeof loginSchema>
