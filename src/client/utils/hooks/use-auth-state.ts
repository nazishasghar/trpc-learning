import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export type AuthState = {
    access_token: string
    refresh_token: string
    expires_in: string
}

const initialValue: AuthState = {
    access_token: '',
    refresh_token: '',
    expires_in: '',
}

const authAtom = atomWithStorage<AuthState | undefined>('client-access_token', initialValue)

export const useClientAuthState = () => {
    const [authState, setAuthState] = useAtom(authAtom)

    const removeAuth = () => {
        setAuthState(initialValue)
    }

    return {
        authState,
        setAuthState,
        removeAuth,
    }
}
