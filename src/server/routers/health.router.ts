import { publicProcedure, router } from '~/trpc'

export const healthRouter = router({
    list: publicProcedure.query(() => {
        return 'admin healthy'
    }),
})

