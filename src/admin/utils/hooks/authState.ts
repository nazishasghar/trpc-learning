import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

type AuthState = {
    access_token: string
    refresh_token: string
    expires_in: string
}

const initialValue: AuthState = {
    access_token: '',
    refresh_token: '',
    expires_in: '',
}

const authAtom = atomWithStorage<AuthState | undefined>('access_token', initialValue)

export const useAdminAuthState = () => {

    const [authState, setAuthState] = useAtom(authAtom)

    const setAuth = (val: AuthState) => {
        setAuthState(val)
    }

    const removeAuth = () => {
        setAuthState(initialValue)
    }

    return {
        authState,
        setAuth,
        removeAuth,
    }
}
