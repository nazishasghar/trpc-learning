import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { StrictMode, Suspense, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import { trpc } from '~/utils/trpc'
import routes from '~react-pages'

function App() {
    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: process.env.HTTP_BATCH_LINK as string,
                }),
            ],
        }),
    )
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <ChakraProvider>
                    <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>
                </ChakraProvider>
            </QueryClientProvider>
        </trpc.Provider>
    )
}

const app = createRoot(document.getElementById('root')!)

app.render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
)
