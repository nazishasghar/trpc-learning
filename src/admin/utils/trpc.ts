import { createTRPCReact, httpBatchLink, loggerLink, type inferReactQueryProcedureOptions } from '@trpc/react-query'
import type { CombinedDataTransformer, inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import type { BaseRouter } from '@/src/server/baseRouter'
import { useMemo } from 'react'
import { AuthState } from '~/utils/hooks/use-auth-state'
import { QueryClient } from '@tanstack/react-query'
import SuperJSON from 'superjson'

export type ReactQueryOptions = inferReactQueryProcedureOptions<BaseRouter>
export type RouterInputs = inferRouterInputs<BaseRouter>
export type RouterOutputs = inferRouterOutputs<BaseRouter>

export const useTrpc = () => {
    const trpc = createTRPCReact<BaseRouter>()

    const transformer: CombinedDataTransformer = {
        input: SuperJSON,
        output: {
            serialize: (object) => object,
            // This `eval` only ever happens on the **client**
            deserialize: (object) => eval(object),
        },
    }
    const _accessToken = localStorage.getItem('admin-access_token')
    const accessToken = _accessToken ? (JSON.parse(_accessToken) as AuthState) : ''
    const queryClient = useMemo(() => new QueryClient(), [])
    const trpcClient = useMemo(
        () =>
            trpc.createClient({
                links: [
                    loggerLink({
                        enabled: (opts) =>
                            (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') ||
                            (opts.direction === 'down' && opts.result instanceof Error),
                    }),
                    httpBatchLink({
                        url: process.env.HTTP_BATCH_LINK as string,
                        maxURLLength: 2048,
                        ...(accessToken !== '' &&
                            accessToken &&
                            accessToken.access_token && {
                                headers: {
                                    authorization: 'Bearer ' + accessToken.access_token,
                                },
                            }),
                        transformer,
                    }),
                ],
            }),
        [accessToken],
    )
    return {
        trpc,
        trpcClient,
        queryClient,
    }
}
