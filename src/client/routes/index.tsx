import { Flex } from '@chakra-ui/react'
import { useState, type FC } from 'react'
import Spline from '@splinetool/react-spline'
import { CFeedbackTable } from '~/components/common/cFeedbackTable/CFeedbackTable'
import { DefaultLayout } from '~/layout/default'
import { useTrpc } from '~/utils/trpc'

// logic
const useIndexPage = () => {
    const { trpc } = useTrpc()
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const { data: feedbackList } = trpc.client.feedback.list.useQuery({ page, limit })
    return { feedbackList, page, setLimit, setPage, limit }
}

// view
const IndexPageView: FC<ReturnType<typeof useIndexPage>> = (props) => {
    const { feedbackList, page, setPage, setLimit, limit } = props

    return (
        <DefaultLayout>
            <Flex pos={'relative'} w={'full'} justify={'center'}>
                <Flex pos={'absolute'} zIndex={1} w={'full'}>
                    {feedbackList && feedbackList?.[1] > 0 && (
                        <CFeedbackTable
                            feedbackList={feedbackList}
                            page={page}
                            limit={limit}
                            setLimit={setLimit}
                            setPage={setPage}
                        />
                    )}
                </Flex>
                <Flex pos={'fixed'} w={'full'} pointerEvents={'none'} left={'-1%'} h={'full'}>
                    <Spline scene="https://prod.spline.design/hatGYoUWG2NQpL8u/scene.splinecode" />
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
