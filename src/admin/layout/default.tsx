import type { FC, ReactNode } from 'react'
import { Flex } from '@chakra-ui/react'
import { GHeader } from '~/components/global/gHeader/GHeader'
import { useAdminAuthState } from '~/utils/hooks/use-auth-state'

export type DefaultLayoutProps = {
    children?: ReactNode
}

// logic
export const useDefaultLayout = () => {
    const { authState } = useAdminAuthState()

    return { authState }
}

// view
export const DefaultLayoutView: FC<DefaultLayoutProps & ReturnType<typeof useDefaultLayout>> = (props) => {
    const { children, authState } = props

    return (
        <Flex direction={'column'} w={'full'} gap={'1rem'} pointerEvents={'none'} bgColor={'black'} py={'1rem'}>
            {authState?.access_token && <GHeader />}
            <Flex justifyContent={'center'} w={'full'}>
                <Flex direction={'column'} px={'1rem'} w={'full'} maxW={'65rem'} textColor={'white'}>
                    {children}
                </Flex>
            </Flex>
        </Flex>
    )
}

// component
export const DefaultLayout: FC<DefaultLayoutProps> = (props: DefaultLayoutProps) => {
    const hookItems = useDefaultLayout()
    return <DefaultLayoutView {...props} {...hookItems} />
}
