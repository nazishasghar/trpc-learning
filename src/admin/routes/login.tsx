import {
    Flex,
    Stack,
    Avatar,
    Heading,
    Box,
    FormControl,
    InputGroup,
    InputLeftElement,
    Input,
    InputRightElement,
    Button,
    FormHelperText,
    chakra,
    Link,
} from '@chakra-ui/react'
import { useState, type FC } from 'react'
import { FaUserAlt, FaLock } from 'react-icons/fa'
import { SubmitHandler, useForm } from 'react-hook-form'
import { loginSchema, LoginSchema } from '~/types/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTrpc } from '~/utils/trpc'
import { useNavigate } from 'react-router'
import { useAdminAuthState } from '~/utils/hooks/use-auth-state'
import { DefaultLayout } from '~/layout/default'

// logic
const useLoginPage = () => {
    const CFaUserAlt = chakra(FaUserAlt)
    const CFaLock = chakra(FaLock)

    const { trpc } = useTrpc()

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema), mode: 'onBlur' })

    const loginMutation = trpc.admin.auth.signin.useMutation()

    const { setAuthState, setMe } = useAdminAuthState()

    const navigate = useNavigate()

    const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
        return await loginMutation.mutateAsync(data, {
            onSuccess: (res) => {
                setAuthState({ ...res, expires_in: String(res.expires_in) })
                navigate('/')
            },
        })
    }

    const [showPassword, setShowPassword] = useState(false)

    const handleShowClick = () => setShowPassword(!showPassword)

    return { CFaLock, CFaUserAlt, showPassword, handleShowClick, register, errors, isValid, onSubmit, handleSubmit }
}

// view
const LoginPageView: FC<ReturnType<typeof useLoginPage>> = () => {
    const { CFaLock, CFaUserAlt, showPassword, handleShowClick, register, errors, isValid, onSubmit, handleSubmit } =
        useLoginPage()

    return (
        <DefaultLayout>
            <Flex
                flexDirection="column"
                width="100wh"
                height="100vh"
                justifyContent="center"
                alignItems="center"
                pointerEvents={'all'}
            >
                <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
                    <Avatar bg="teal.500" />
                    <Heading color="teal.400">Welcome</Heading>
                    <Box minW={{ base: '90%', md: '468px' }}>
                        <form>
                            <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<CFaUserAlt color="gray.300" />}
                                        />
                                        <Input
                                            {...register('email')}
                                            type="email"
                                            placeholder="email address"
                                            isInvalid={!!errors.email}
                                            errorBorderColor={'red.500'}
                                        />
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            color="gray.300"
                                            children={<CFaLock color="gray.300" />}
                                        />
                                        <Input
                                            {...register('password')}
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Password"
                                            isInvalid={!!errors.password}
                                            errorBorderColor={'red.500'}
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                                {showPassword ? 'Hide' : 'Show'}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormHelperText textAlign="right">
                                        <Link>forgot password?</Link>
                                    </FormHelperText>
                                </FormControl>
                                <Button
                                    disabled={!isValid}
                                    onClick={handleSubmit(onSubmit)}
                                    _disabled={{ opacity: '0.3' }}
                                    borderRadius={0}
                                    variant="solid"
                                    colorScheme="teal"
                                    width="full"
                                >
                                    Login
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
            </Flex>
        </DefaultLayout>
    )
}

const LoginPage: FC = () => {
    const hookItems = useLoginPage()
    return <LoginPageView {...hookItems} />
}

export default LoginPage
