import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Box,
    Button,
} from '@chakra-ui/react'
import type { FC, ReactNode } from 'react'
import { NsPropTypeBase } from '~/types/ns-prop-type'

export type CModalProps = {
    isOpen: boolean
    onClose: () => void
    disabled?: boolean
    title: string
    onSubmitHandler: () => void
    children: ReactNode
    dataTestId?: string
} & NsPropTypeBase

// logic
export const useCModal = (props: CModalProps) => {
    const onSubmitHandler = () => {
        if (!props.disabled) props.onSubmitHandler()
    }
    return { onSubmitHandler }
}

// view
export const CModalView: FC<CModalProps & ReturnType<typeof useCModal>> = (props) => {
    const { isOpen, onClose, title, children, disabled, _style, dataTestId = 'c-modal' } = props
    const { onSubmitHandler } = useCModal(props)

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose} closeOnEsc={true} data-testid={dataTestId}>
            <ModalOverlay />
            <ModalContent
                w={'full'}
                minW={{ sm: '35rem', md: '46rem', lg: '64rem' }}
                bgColor={'black'}
                textColor={'white'}
                sx={_style}
            >
                <ModalHeader
                    textAlign={'center'}
                    p={0}
                    mb={'20px'}
                    fontWeight={'normal'}
                    data-testid={`${dataTestId}-header`}
                >
                    {title}
                </ModalHeader>
                <ModalCloseButton size={'lg'} color={'white'} />
                <ModalBody
                    display={'flex'}
                    flexDir={'column'}
                    alignItems={'center'}
                    p={0}
                    data-testid={`${dataTestId}-body`}
                >
                    {children}
                    <Box mt={'2.5rem'}>
                        <Button disabled={disabled} onClick={onSubmitHandler}>
                            Submit
                        </Button>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

// component
export const CModal: FC<CModalProps> = (props: CModalProps) => {
    const hookItems = useCModal(props)
    return <CModalView {...props} {...hookItems} />
}
