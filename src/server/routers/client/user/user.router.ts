import { userRepo } from '~/db/repository/client/user.repository'
import { publicProcedure, router } from '~/trpc'
export const userRouter = router({
    list: publicProcedure.query(async () => {
        return await userRepo.createQueryBuilder().where('1=1').getManyAndCount()
    }),
})
