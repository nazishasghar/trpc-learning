import { useEffect, type FC, type ReactNode } from 'react'
import { useClientAuthState } from '~/utils/hooks/use-auth-state'
import dayjs from 'dayjs'
import { useTrpc } from '~/utils/trpc'
import { Flex, Text } from '@chakra-ui/react'

export type GHeaderProps = {
    children?: ReactNode
}

// logic
export const useGHeader = () => {
    const { authState, setAuthState, removeAuth } = useClientAuthState()

    const { trpc } = useTrpc()

    const { data: authData, isError } = trpc.client.auth.refresh.useQuery(
        { refresh_token: authState?.refresh_token ?? '' },
        { refetchInterval: (dayjs().minute() % 10) * 100000 },
    )

    useEffect(() => {
        if (authData && authState && authState.refresh_token)
            setAuthState({
                ...authData,
                refresh_token: authState?.refresh_token,
                expires_in: String(authData.expires_in),
            })
        if (isError) {
            removeAuth()
            window.location.href = '/login'
            return
        }
    }, [authData, isError])

    return {}
}

// view
export const GHeaderView: FC<GHeaderProps & ReturnType<typeof useGHeader>> = () => {
    return (
        <Flex data-testid="g-header" bgColor={'black'} justify={'start'} h={'2rem'}>
            <Text fontSize={'large'} color={'white'}>
                Header
            </Text>
        </Flex>
    )
}

// component
export const GHeader: FC<GHeaderProps> = (props: GHeaderProps) => {
    const hookItems = useGHeader()
    return <GHeaderView {...props} {...hookItems} />
}
