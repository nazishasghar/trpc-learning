import { Button, Flex, FormLabel, Heading, Input, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import Spline from '@splinetool/react-spline'
import { useEffect, useMemo, useState, type FC } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { CModal } from '~/components/common/cModal/CModal'
import { CTextEditor } from '~/components/common/cTextEditor/CTextEditor'
import { DefaultLayout } from '~/layout/default'
import { CreateFeedbackSchema, createFeedbackSchema } from '~/types/zodSchema'
import { splitDateTime } from '~/utils/common'
import { useAdminAuthState } from '~/utils/hooks/use-auth-state'
import { useConfirmationDialog } from '~/utils/hooks/use-dialog'
import { useTrpc } from '~/utils/trpc'

// logic
const useFeedbackDetailUuidPage = () => {
    const { '*': dynamicParams } = useParams()

    const feedBackId = dynamicParams?.split('/')[0]

    const employeeId = dynamicParams?.split('/')[1]

    const { trpc } = useTrpc()

    const [showModel, setShowModel] = useState(false)
    const {
        handleSubmit,
        register,
        reset,
        control,
        formState: { isValid },
    } = useForm<CreateFeedbackSchema>({ resolver: zodResolver(createFeedbackSchema), mode: 'onBlur' })
    const { data: feedback, refetch } = trpc.admin.feedback.getFeedbackWithUuid.useQuery({
        feedbackId: feedBackId ?? '',
    })

    const { queueDialog } = useConfirmationDialog()
    const navigate = useNavigate()
    const editFeedbackMutation = trpc.admin.feedback.edit.useMutation()
    const deleteFeedbackMutation = trpc.admin.feedback.delete.useMutation()

    const { me } = useAdminAuthState()

    const hasFeedbackEditDeleteAccess = useMemo(() => {
        return me && feedback?.feedBackBy.uuid === me.uuid
    }, [feedback])

    const onEdit: SubmitHandler<CreateFeedbackSchema> = async (data) => {
        return await queueDialog({
            text: 'Do you want to change feedback ?',
            type: 'confirm',
            confirmButtonHandler: async () =>
                await editFeedbackMutation.mutateAsync(
                    {
                        ...data,
                        feedBackDate: dayjs(data.createdAt).format('MM/DD/YYYY'),
                        feedBackId: feedBackId ?? '',
                    },
                    {
                        onSuccess: async () => {
                            setShowModel(false)
                            await refetch()
                        },
                    },
                ),
        })
    }

    const onDelete = async () => {
        return await queueDialog({
            text: 'Do you want to delete feedback ?',
            type: 'delete',
            confirmButtonHandler: async () =>
                await deleteFeedbackMutation.mutateAsync(
                    {
                        feedBackId: feedBackId ?? '',
                    },
                    {
                        onSuccess: () => {
                            navigate(`/employee/${employeeId}`)
                        },
                    },
                ),
        })
    }

    useEffect(() => {
        reset({
            createdAt: splitDateTime(feedback?.feedBackDate) ?? '',
            points: feedback?.points,
            comments: feedback?.comments,
        })
    }, [feedback])
    return {
        feedback,
        showModel,
        setShowModel,
        isValid,
        handleSubmit,
        onEdit,
        register,
        control,
        onDelete,
        hasFeedbackEditDeleteAccess,
    }
}

// view
const FeedbackDetailUuidPageView: FC<ReturnType<typeof useFeedbackDetailUuidPage>> = (props) => {
    const {
        feedback,
        showModel,
        setShowModel,
        isValid,
        handleSubmit,
        onEdit,
        register,
        control,
        onDelete,
        hasFeedbackEditDeleteAccess,
    } = props

    return (
        <DefaultLayout>
            <Flex position={'relative'} w={'full'}>
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
                    {hasFeedbackEditDeleteAccess && (
                        <Flex gap={'2rem'}>
                            <Button onClick={() => setShowModel(true)}>Edit</Button>
                            <Button onClick={onDelete}>Delete</Button>
                        </Flex>
                    )}
                </Flex>
                <CModal
                    isOpen={showModel}
                    onClose={() => setShowModel(false)}
                    disabled={!isValid}
                    title={'Edit Feedback'}
                    onSubmitHandler={handleSubmit(onEdit)}
                >
                    <Flex direction={'column'} gap={'1rem'}>
                        <Flex
                            justifyContent={'space-between'}
                            direction={{ base: 'column', md: 'row' }}
                            bgColor={'black.200'}
                            w={'full'}
                            px={'0.5rem'}
                        >
                            <Flex justifyContent={'space-between'} w={'full'}>
                                <Flex direction={'column'}>
                                    <FormLabel textColor={'white'} requiredIndicator>
                                        Choose Date
                                    </FormLabel>
                                    <Input
                                        {...register('createdAt')}
                                        type={'date'}
                                        bgColor={'black'}
                                        textColor={'white'}
                                        w={'10rem'}
                                    />
                                </Flex>
                                <Flex direction={'column'}>
                                    <FormLabel textColor={'white'} requiredIndicator>
                                        Points
                                    </FormLabel>
                                    <Input {...register('points')} bgColor={'black'} textColor={'white'} w={'10rem'} />
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex>
                            <CTextEditor control={control} name={'comments'} />
                        </Flex>
                    </Flex>
                </CModal>
            </Flex>
        </DefaultLayout>
    )
}

const FeedbackDetailUuidPage: FC = () => {
    const hookItems = useFeedbackDetailUuidPage()
    return <FeedbackDetailUuidPageView {...hookItems} />
}

export default FeedbackDetailUuidPage
