import { Button, Input } from '@chakra-ui/react'
import { useEffect, useRef, type FC } from 'react'
import { useNavigate } from 'react-router'
import { DefaultLayout } from '~/layout/default'
import { useClientAuthState } from '~/utils/hooks/authState'
import { trpc } from '~/utils/trpc'
// logic
const useLoginPage = () => {
    return {}
}

// view
const LoginPageView: FC<ReturnType<typeof useLoginPage>> = () => {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const { authState, setAuth } = useClientAuthState()
    const navigate = useNavigate()

    const mutate = trpc.client.auth.signin.useMutation()

    useEffect(() => {
        if (authState && authState.access_token) navigate('/')
    }, [authState])

    const onLoginMutation = async () => {
        if (!emailRef.current?.value || !passwordRef.current?.value) return
        return await mutate.mutateAsync(
            {
                email: emailRef.current?.value,
                password: passwordRef.current?.value,
            },
            {
                onSuccess: (data) => {
                    setAuth({
                        access_token: data.access_token,
                        refresh_token: data.refresh_token,
                        expires_in: String(data.expires_in),
                    })
                    navigate('/')
                },
            },
        )
    }

    return (
        <DefaultLayout>
            <Input ref={emailRef} placeholder="Email" />
            <Input ref={passwordRef} placeholder="Password" />
            <Button onClick={onLoginMutation}>Log in</Button>
        </DefaultLayout>
    )
}

const LoginPage: FC = () => {
    const hookItems = useLoginPage()
    return <LoginPageView {...hookItems} />
}

export default LoginPage
