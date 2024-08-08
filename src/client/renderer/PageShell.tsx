import { ChakraProvider, Flex, Spinner, Text } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TRPCClientError } from '@trpc/client'
import { Component, ErrorInfo, ReactNode, StrictMode, Suspense, useEffect, useMemo } from 'react'
import { Provider as JotaiProvider } from 'jotai'
import { HelmetProvider } from 'react-helmet-async'
import { useNavigate, useRoutes } from 'react-router-dom'
import { useTrpc } from '~/utils/trpc'
import routes from '~react-pages'
import { Meta } from './Meta'
import { theme } from '~/utils/chakra-theme'
import { GA4 } from './GA4'
import { useClientAuthState } from '~/utils/hooks/use-auth-state'

export const PageShell = () => {
    const queryClient = useMemo(() => new QueryClient(), [])
    const navigate = useNavigate()
    const { authState } = useClientAuthState()
    const { trpc, trpcClient } = useTrpc()

    const helmetContext = {}

    useEffect(() => {
        if (!authState || !authState.access_token) navigate('/login')
    }, [authState])

    return (
        <StrictMode>
            <trpc.Provider client={trpcClient} queryClient={queryClient}>
                <QueryClientProvider client={queryClient}>
                    <JotaiProvider>
                        <ChakraProvider theme={theme} resetCSS>
                            <HelmetProvider context={helmetContext}>
                                <GA4 trackingCode={process.env.GA4_ID!} isEnable={process.env.STAGE !== 'local'} />
                                <Meta />
                                <Suspense
                                    fallback={
                                        <Flex h={'100vh'} justifyContent={'center'} alignItems={'center'} w={'full'}>
                                            <Spinner />
                                        </Flex>
                                    }
                                >
                                    {<ErrorBoundary>{useRoutes(routes)}</ErrorBoundary>}
                                </Suspense>
                            </HelmetProvider>
                        </ChakraProvider>
                    </JotaiProvider>
                </QueryClientProvider>
            </trpc.Provider>
        </StrictMode>
    )
}

interface Props {
    children?: ReactNode
}

interface State {
    hasError: boolean
    error?: Error
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: undefined,
    }

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error: error }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo)
    }

    public render() {
        const { hasError, error } = this.state
        if (hasError) {
            return (
                <Flex px={4} py={4} direction={'column'} alignItems={'center'} gap={'0.65rem'}>
                    <Text color={'black'}>An error has occurred</Text>
                    <Text color={'black'}>{error && error instanceof TRPCClientError && <>{error.message}</>}</Text>
                </Flex>
            )
        }

        return this.props.children
    }
}
