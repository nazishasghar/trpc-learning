import type { FC, ReactNode } from 'react'
import { Flex } from '@chakra-ui/react'
import { GHeader } from '~/components/global/gHeader/GHeader'
import { useClientAuthState } from '~/utils/hooks/use-auth-state'

export type DefaultLayoutProps = {
    children?: ReactNode
}

// logic
export const useDefaultLayout = () => {
    const { authState } = useClientAuthState()
    return { authState }
}

// view
export const DefaultLayoutView: FC<DefaultLayoutProps & ReturnType<typeof useDefaultLayout>> = (props) => {
    const { children, authState } = props

    return (
        <Flex direction={'column'}>
            {authState?.access_token && <GHeader />}
            {children}
        </Flex>
    )
}

// component
export const DefaultLayout: FC<DefaultLayoutProps> = (props: DefaultLayoutProps) => {
    const hookItems = useDefaultLayout()
    return <DefaultLayoutView {...props} {...hookItems} />
}
