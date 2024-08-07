import { ChakraProvider, Flex, Text } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TRPCClientError, httpBatchLink } from '@trpc/client'
import { Component, ErrorInfo, ReactNode, StrictMode, Suspense, useEffect, useMemo } from 'react'
import { Provider as JotaiProvider } from 'jotai'
import { HelmetProvider } from 'react-helmet-async'
import { useLocation, useNavigate, useRoutes } from 'react-router-dom'
import { trpc } from '~/utils/trpc'
import routes from '~react-pages'
import { useClientAuthState } from '~/utils/hooks/authState'
import { Meta } from './Meta'
import { theme } from '~/utils/chakra-theme'
import { GA4 } from './GA4'

export const PageShell = () => {
    const queryClient = useMemo(() => new QueryClient(), [])
    const navigate = useNavigate()
    const location = useLocation().pathname
    const { authState } = useClientAuthState()

    const helmetContext = {}
    const trpcClient = useMemo(
        () =>
            trpc.createClient({
                links: [
                    httpBatchLink({
                        url: process.env.HTTP_BATCH_LINK as string,
                        ...(authState &&
                            authState.access_token && {
                                headers: { authorization: 'Bearer ' + authState.access_token },
                            }),
                    }),
                ],
            }),
        [authState],
    )
    useEffect(() => {
        if ((!authState || !authState.access_token) && location !== '/login') navigate('/login')
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
                                <Suspense fallback={<p>Loading...</p>}>
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
