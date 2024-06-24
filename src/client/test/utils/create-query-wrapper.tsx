import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

export const createQueryWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                staleTime: Infinity,
            },
        },
    })

    const queryWrapper = ({ children }: { children: ReactNode }) => {
        return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    }

    return {
        queryClient,
        queryWrapper,
    }
}
