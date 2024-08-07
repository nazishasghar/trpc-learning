import { Button, Flex, FormLabel, Heading, Input } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useState, type FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router'
import { CFeedbackTable } from '~/components/common/cFeedbackTable/CFeedbackTable'
import { CTextEditor } from '~/components/common/cTextEditor/CTextEditor'
import { CGraph } from '~/components/functional/cGraph/CGraph'
import { DefaultLayout } from '~/layout/default'
import { CreateFeedbackSchema, createFeedbackSchema } from '~/types/zodSchema'
import { useAdminAuthState } from '~/utils/hooks/use-auth-state'
import { useConfirmationDialog } from '~/utils/hooks/use-dialog'
import { useTrpc } from '~/utils/trpc'

// logic
const useFeebackUuidTsxPage = () => {
    const { uuid } = useParams()
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)

    const {
        handleSubmit,
        register,
        control,
        reset,
        formState: { isValid },
    } = useForm<CreateFeedbackSchema>({ resolver: zodResolver(createFeedbackSchema), mode: 'onBlur' })
    const { trpc } = useTrpc()
    const { data: employee } = trpc.admin.employee.getEmployee.useQuery({ employeeId: uuid ?? '' })
    const { data: employeeFeedbackList, refetch } = trpc.admin.feedback.employeeFeedbackList.useQuery({
        employeeId: uuid ?? '',
        page,
        limit,
    })

    const { me } = useAdminAuthState()

    const hasFeedbackEditDeleteAccess =
        me && (employee?.leader?.uuid === me.uuid || ['CTO', 'CEO', 'COO'].includes(me.position))

    const onConfirm = async (data: CreateFeedbackSchema) => {
        return await createFeedbackMutation.mutateAsync(
            {
                ...data,
                employeeId: uuid ?? '',
                feedBackDate: dayjs(data.createdAt).format('MM/DD/YYYY'),
            },
            {
                onSuccess: async () => {
                    reset()
                    await refetch()
                },
            },
        )
    }
    const { queueDialog, dequeueDialog } = useConfirmationDialog()
    const createFeedbackMutation = trpc.admin.feedback.create.useMutation()
    const onSubmit: SubmitHandler<CreateFeedbackSchema> = async (data) => {
        return await queueDialog({
            type: 'confirm',
            text: 'Are you sure want to add ?',
            confirmButtonHandler: async () => await onConfirm(data),
            cancelButtonHandler: dequeueDialog,
        })
    }
    return {
        employee,
        page,
        limit,
        setLimit,
        setPage,
        register,
        control,
        isValid,
        onSubmit,
        handleSubmit,
        employeeFeedbackList,
        hasFeedbackEditDeleteAccess,
    }
}

// view
const FeebackUuidTsxPageView: FC<ReturnType<typeof useFeebackUuidTsxPage>> = (props) => {
    const {
        employee,
        page,
        limit,
        setLimit,
        setPage,
        register,
        control,
        isValid,
        onSubmit,
        handleSubmit,
        employeeFeedbackList,
        hasFeedbackEditDeleteAccess,
    } = props

    return (
        <DefaultLayout>
            <Flex position={'relative'} h={'full'} w={'full'} pointerEvents={'all'}>
                <Flex direction={'column'} w={'full'} bgColor={'black'} gap={'1rem'}>
                    <Flex direction={'column'}>
                        <Flex textColor={'white'} fontSize={'1.5rem'}>
                            {employee?.name + ' ' + (employee?.leader ? `(Team ${employee?.leader?.name})` : '')}
                        </Flex>
                    </Flex>
                    {employeeFeedbackList && employeeFeedbackList?.[1] > 0 && (
                        <CGraph feedbackList={employeeFeedbackList} />
                    )}
                    {employeeFeedbackList && employeeFeedbackList?.[1] > 0 && (
                        <CFeedbackTable
                            feedbackList={employeeFeedbackList}
                            employee={employee}
                            page={page}
                            limit={limit}
                            setLimit={setLimit}
                            setPage={setPage}
                        />
                    )}
                    {hasFeedbackEditDeleteAccess && (
                        <Flex gap={'1rem'} direction={'column'} w={'fit-content'}>
                            <Heading size={'lg'} textColor={'white'}>
                                Write new feedback
                            </Heading>
                            <Flex justifyContent={'space-between'} direction={{ base: 'column', md: 'row' }}>
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
                            <Flex>
                                <CTextEditor control={control} name={'comments'} />
                            </Flex>
                            <Flex mt={'3rem'} justify={'center'}>
                                <Button size={'lg'} w={'50%'} onClick={handleSubmit(onSubmit)} disabled={!isValid}>
                                    Submit
                                </Button>
                            </Flex>
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </DefaultLayout>
    )
}

const FeebackUuidTsxPage: FC = () => {
    const hookItems = useFeebackUuidTsxPage()
    return <FeebackUuidTsxPageView {...hookItems} />
}

export default FeebackUuidTsxPage
