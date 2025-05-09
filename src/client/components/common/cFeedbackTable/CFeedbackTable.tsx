import { ChangeEvent, type FC } from 'react'
import { RouterOutputs } from '~/utils/trpc'
import dayjs from 'dayjs'
import { TableContainer, Thead, Tr, Th, Tbody, Td, Table, IconButton, Flex, Select, Text } from '@chakra-ui/react'
import { ArrowForwardIcon, ArrowBackIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router'

export type CFeedbackTableProps = {
    feedbackList: RouterOutputs['admin']['feedback']['employeeFeedbackList']
    page: number
    limit: number
    setLimit: (val: number) => void
    setPage: (val: number) => void
}

// logic
export const useCFeedbackTable = (props: CFeedbackTableProps) => {
    const { feedbackList, page, limit, setPage, setLimit } = props

    const columns = ['Feedback', 'Date', 'FeedbackBY', 'Points']

    const totalPages = Math.ceil(feedbackList[1] / limit)

    const navigate = useNavigate()

    const nextButtonHandler = () => {
        if (page < totalPages) setPage(page + 1)
    }

    const nextButtonLastHandler = () => setPage(totalPages)

    const backButtonHandler = () => {
        if (page !== 1) setPage(page - 1)
    }

    const backButtonLastHandler = () => {
        setPage(1)
    }

    const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setLimit(Number(e.target.value))
    }
    return {
        columns,
        feedbackList,
        nextButtonHandler,
        nextButtonLastHandler,
        backButtonLastHandler,
        backButtonHandler,
        onSelectChange,
        navigate,
    }
}

// view
export const CFeedbackTableView: FC<CFeedbackTableProps & ReturnType<typeof useCFeedbackTable>> = (props) => {
    const {
        columns,
        feedbackList,
        page,
        nextButtonHandler,
        nextButtonLastHandler,
        backButtonHandler,
        backButtonLastHandler,
        onSelectChange,
        navigate,
    } = props

    return (
        <Flex direction={'column'} w={'full'} gap={'1rem'}>
            <TableContainer>
                <Table variant="simple" textColor={'white'} align={'left'} size={'lg'} w={'full'}>
                    <Thead>
                        <Tr>
                            {columns.map((i) => (
                                <Th key={i}>{i}</Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {feedbackList[0].map((i) => (
                            <Tr key={i.uuid}>
                                <Td>
                                    <Text
                                        _hover={{ textDecor: 'underline', cursor: 'pointer' }}
                                        onClick={() => navigate(`feedback/${i.uuid}`)}
                                        isTruncated
                                        maxW={'15rem'}
                                    >
                                        {i.comments.replace(/<[^>]*>?/gm, '')}
                                    </Text>
                                </Td>
                                <Td>{dayjs(i.feedBackDate).format('MM/DD/YYYY')}</Td>
                                <Td>{i.feedBackBy.name}</Td>
                                <Td>{i.points}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <Flex
                gap={'1rem'}
                justify={'end'}
                alignItems={{ md: 'center', base: 'flex-start' }}
                direction={{ base: 'column', md: 'row' }}
            >
                <Flex>
                    <Text textColor={'white'}>{`Page: ${page}`}</Text>
                </Flex>
                <Flex direction={'row'} alignItems={'center'}>
                    <Flex>
                        <IconButton
                            onClick={backButtonLastHandler}
                            variant={'simple'}
                            color={'white'}
                            aria-label={'back-page'}
                            icon={<ArrowLeftIcon boxSize={3} />}
                        />
                        <IconButton
                            onClick={backButtonHandler}
                            variant={'simple'}
                            color={'white'}
                            aria-label={'back-page'}
                            icon={<ArrowBackIcon />}
                        />
                    </Flex>
                    <Flex alignItems={'center'}>
                        <IconButton
                            onClick={nextButtonHandler}
                            variant={'simple'}
                            color={'white'}
                            aria-label={'next-page'}
                            icon={<ArrowForwardIcon />}
                        />
                        <IconButton
                            onClick={nextButtonLastHandler}
                            variant={'simple'}
                            color={'white'}
                            aria-label={'next-page'}
                            icon={<ArrowRightIcon boxSize={3} />}
                        />
                    </Flex>
                </Flex>
                <Select
                    onChange={onSelectChange}
                    placeholder="Select limit"
                    w={'10rem'}
                    textColor={'white'}
                    size={'sm'}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </Select>
            </Flex>
        </Flex>
    )
}

// component
export const CFeedbackTable: FC<CFeedbackTableProps> = (props: CFeedbackTableProps) => {
    const hookItems = useCFeedbackTable(props)
    return <CFeedbackTableView {...props} {...hookItems} />
}
