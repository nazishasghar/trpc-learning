import z from 'zod'

export const createUserRequestSchema = z.object({
    name: z.string().min(1, 'name is required'),
    address: z.string().min(1, 'address is required'),
    password: z.string().min(8, 'password must be 8 character or more'),
    email: z.string().min(1, 'email is required'),
})

export type CreateUserRequestSchema = z.infer<typeof createUserRequestSchema>

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