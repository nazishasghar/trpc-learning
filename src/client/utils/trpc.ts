import { createTRPCReact } from '@trpc/react-query'
import type { baseRouter } from '../../server/baseRouter'

type ClientRouter = typeof baseRouter

export const trpc = createTRPCReact<ClientRouter>()
