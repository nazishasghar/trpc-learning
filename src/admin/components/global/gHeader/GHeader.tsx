import { useEffect, type FC } from 'react'
import { useAdminAuthState } from '~/utils/hooks/use-auth-state'
import dayjs from 'dayjs'
import { useTrpc } from '~/utils/trpc'
import { Flex, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router'

export type GHeaderProps = {}

// logic
export const useGHeader = () => {
    const { authState, setAuthState, removeAuth } = useAdminAuthState()

    const navigate = useNavigate()
    const { trpc } = useTrpc()

    const { data: authData, isError } = trpc.admin.auth.refresh.useQuery(
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

    return { navigate }
}

// view
export const GHeaderView: FC<GHeaderProps & ReturnType<typeof useGHeader>> = (props) => {
    const { navigate } = props

    return (
        <Flex
            data-testid="g-header"
            bgColor={'#414245'}
            justify={'start'}
            h={'3rem'}
            borderRadius={'10px'}
            px={'1rem'}
            mx={'1rem'}
            backdropBlur={'20px'}
            alignItems={'center'}
            zIndex={1}
        >
            <Text
                onClick={() => navigate('/')}
                cursor={'pointer'}
                pointerEvents={'all'}
                fontFamily={'cursive'}
                fontSize={'large'}
                color={'white'}
            >
                FeedBack
            </Text>
        </Flex>
    )
}

// component
export const GHeader: FC<GHeaderProps> = (props: GHeaderProps) => {
    const hookItems = useGHeader()
    return <GHeaderView {...props} {...hookItems} />
}
