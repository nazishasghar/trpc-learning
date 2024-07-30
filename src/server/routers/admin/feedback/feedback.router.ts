import { createFeedBackSchema, deleteFeedBackSchema, editFeedBackSchema } from '~/db/zodSchema/types'
import { privateProcedure, router } from '~/trpc'
import { useAdminFeedBackService } from '~/utils/service/admin/feedback/feedback'

const { createFeedBack, editFeedBack, deleteFeedBack } = useAdminFeedBackService()

export const adminfeedBackRouter = router({
    create: privateProcedure.input(createFeedBackSchema).mutation(createFeedBack),
    edit: privateProcedure.input(editFeedBackSchema).mutation(editFeedBack),
    delete: privateProcedure.input(deleteFeedBackSchema).mutation(deleteFeedBack)
})
