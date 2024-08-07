import { Button, Flex, Text } from '@chakra-ui/react'
import type { FC } from 'react'
import { useNavigate } from 'react-router'
import { RouterOutputs } from '~/utils/trpc'

export type CEmployeeRowProps = {
    employee: RouterOutputs['admin']['employee']['list'][0][number]
}

// logic
export const useCEmployeeRow = (props: CEmployeeRowProps) => {
    const { employee } = props

    const navigate = useNavigate()

    const onFeedbackClick = () => {
        navigate(`/feedback/${employee.uuid}`)
    }
    return { onFeedbackClick }
}

// view
export const CEmployeeRowView: FC<CEmployeeRowProps & ReturnType<typeof useCEmployeeRow>> = (props) => {
    const { employee, onFeedbackClick } = props
    return (
        <Flex
            data-testid="c-employee-row"
            w={'full'}
            alignItems={'center'}
            justifyContent={'space-between'}
            borderRadius={'10px'}
            backdropBlur={'5px'}
        >
            <Flex direction={'column'}>
                <Text textColor={'white'}>{employee.name}</Text>
                <Text textColor={'white'} fontSize={'0.6rem'}>
                    {employee.bio}
                </Text>
            </Flex>
            <Button onClick={onFeedbackClick} color={'black'} pointerEvents={'all'}>
                feedback
            </Button>
        </Flex>
    )
}

// component
export const CEmployeeRow: FC<CEmployeeRowProps> = (props: CEmployeeRowProps) => {
    const hookItems = useCEmployeeRow(props)
    return <CEmployeeRowView {...props} {...hookItems} />
}
