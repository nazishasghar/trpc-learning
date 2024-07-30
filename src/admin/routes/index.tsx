import { Box, Button } from '@chakra-ui/react'
import { useEffect, useState, type FC } from 'react'
import { DefaultLayout } from '~/layout/default'
import { RouterInputs, RouterOutputs, trpc } from '~/utils/trpc'

// logic
const useIndexPage = () => {
    const [employeeList, setEmployeeList] = useState<RouterOutputs['admin']['employee']['list']['employeeList']>()
    const employeeListMutation = trpc.admin.employee.list.useMutation()
    useEffect(() => {
        employeeListMutation.mutate({}, { onSuccess: (data) => setEmployeeList(data.employeeList) })
    }, [])
    return { employeeList }
}

// view
const IndexPageView: FC<ReturnType<typeof useIndexPage>> = (props) => {
    const { employeeList } = props
    return (
        <DefaultLayout>
            {employeeList?.map((i) => {
                return <Box key={i.uuid}>{i.name}</Box>
            })}
        </DefaultLayout>
    )
}

const IndexPage: FC = () => {
    const hookItems = useIndexPage()
    return <IndexPageView {...hookItems} />
}

export default IndexPage
