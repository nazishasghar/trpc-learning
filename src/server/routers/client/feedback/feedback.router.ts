import { employeeFeedBackListRequestSchema, employeeFeedBackListResponseSchema } from '~/db/zodSchema/types'
import { privateProcedure, t } from '~/trpc'
import { useClientFeedBackService } from '~/utils/service/client/feedback/feedback'

const { listFeedBack } = useClientFeedBackService()

export const clientFeedBackRouter = t.router({
    list: privateProcedure.input(employeeFeedBackListRequestSchema).output(employeeFeedBackListResponseSchema).query(listFeedBack)
})
