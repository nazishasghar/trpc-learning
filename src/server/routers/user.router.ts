import { userRepo } from '~/db/repository/user.repository'
import { publicProcedure, router } from '~/trpc'
import z from 'zod'
import { uuid } from 'uuidv4'
export const userRouter = router({
    list: publicProcedure.query(() => {8
        return userRepo.createQueryBuilder().where('1=1').getManyAndCount()
    }),
    create: publicProcedure
        .input(
            z.object({
                name: z.string().min(1, 'Name is required'),
                address: z.string().min(1, 'Address is required'),
                email: z.string().min(1, 'Email is required')
            }),
        )
        .output(
            z.object({
                name: z.string().min(1, 'Name is required'),
                address: z.string().min(1, 'Address is required'),
                email: z.string().min(1, 'Email is required')
            }),
        )
        .mutation(async (opts) => {
            const user = userRepo.create({
                uuid: uuid(),
                name: opts.input.name,
                address: opts.input.address,
                email: opts.input.email,
            })
            return await userRepo.save(user)
        }),
})
