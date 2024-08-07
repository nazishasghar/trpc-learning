import { Flex } from '@chakra-ui/react'
import { useEffect, useMemo, type FC } from 'react'
import { DefaultLayout } from '~/layout/default'
import { useTrpc } from '~/utils/trpc'
import Spline from '@splinetool/react-spline'
import { CEmployeeRow } from '~/components/common/cEmployeeRow/CEmployeeRow'
import { useAdminAuthState } from '~/utils/hooks/use-auth-state'

// logic
const useIndexPage = () => {
    const { trpc } = useTrpc()

    const { setMe } = useAdminAuthState()

    const { data: employees } = trpc.admin.employee.list.useQuery({})

    const { data: admin } = trpc.admin.auth.getMe.useQuery(undefined)

    useEffect(() => {
        setMe(admin)
    }, [admin])

    const employeeList = useMemo(
        () => employees?.[0].map((i) => <CEmployeeRow key={i.uuid} employee={i} />),
        [employees],
    )
    return { employeeList }
}

// view
const IndexPageView: FC<ReturnType<typeof useIndexPage>> = (props) => {
    const { employeeList } = props
    return (
        <DefaultLayout>
            <Flex position={'relative'} w={'full'}>
                <Flex gap={'0.5rem'} direction={'column'} px={'5rem'} zIndex={1} w={'full'}>
                    {employeeList}
                </Flex>
                <Flex pos={'fixed'} w={'full'} h={'full'} top={'-10'} left={'-2%'}>
                    <Spline scene="https://prod.spline.design/V05N0PsDPyZ1kAEm/scene.splinecode" />
                </Flex>
            </Flex>
        </DefaultLayout>
    )
}

const IndexPage: FC = () => {
    const hookItems = useIndexPage()
    return <IndexPageView {...hookItems} />
}

export default IndexPage
