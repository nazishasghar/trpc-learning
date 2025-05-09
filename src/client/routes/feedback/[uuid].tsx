import { Flex, Heading, Text } from '@chakra-ui/react'
import Spline from '@splinetool/react-spline'
import dayjs from 'dayjs'
import type { FC } from 'react'
import { useParams } from 'react-router'
import { DefaultLayout } from '~/layout/default'
import { useTrpc } from '~/utils/trpc'

// logic
const useFeedbackUuidPage = () => {
    const { uuid } = useParams()
    const { trpc } = useTrpc()
    const { data: feedback } = trpc.client.feedback.getFeedbackWithUuid.useQuery({
        feedbackId: uuid ?? '',
    })

    return { feedback }
}

// view
const FeedbackUuidPageView: FC<ReturnType<typeof useFeedbackUuidPage>> = (props) => {
    const { feedback } = props

    return (
        <DefaultLayout>
            <Flex position={'relative'} textColor={'white'}>
                <Flex position={'fixed'} pointerEvents={'all'} justifyContent={'center'} w={'full'} left={'-1%'}>
                    <Spline scene="https://prod.spline.design/f9hnPmBWJUOnpIUM/scene.splinecode" />
                </Flex>
                <Flex position={'absolute'} direction={'column'} gap={'2rem'} pointerEvents={'all'} justify={'center'}>
                    <Flex direction={'column'}>
                        <Heading>Comments</Heading>
                        <Text dangerouslySetInnerHTML={{ __html: feedback?.comments ?? '' }} />
                    </Flex>
                    <Flex alignItems={'center'} gap={'1rem'}>
                        <Heading>Points:</Heading>
                        <Text fontSize={'1.5rem'}>{feedback?.points}</Text>
                    </Flex>

                    <Flex alignItems={'center'} gap={'1rem'}>
                        <Heading>Feedback Date:</Heading>
                        <Text fontSize={'1.5rem'}>{dayjs(feedback?.feedBackDate).format('MM/DD/YYYY')}</Text>
                    </Flex>

                    <Flex alignItems={'center'} gap={'1rem'}>
                        <Heading>Feedback By:</Heading>
                        <Text fontSize={'1.5rem'}>{feedback?.feedBackBy.name}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </DefaultLayout>
    )
}

const FeedbackUuidPage: FC = () => {
    const hookItems = useFeedbackUuidPage()
    return <FeedbackUuidPageView {...hookItems} />
}

export default FeedbackUuidPage
