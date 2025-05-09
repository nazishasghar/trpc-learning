import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { RouterOutputs } from '../trpc'

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

const authAtom = atomWithStorage<AuthState | undefined>('admin-access_token', initialValue, undefined, {
    getOnInit: true,
})
const meAtom = atomWithStorage<RouterOutputs['admin']['auth']['getMe'] | undefined>('admin', undefined)

export const useAdminAuthState = () => {
    const [authState, setAuthState] = useAtom(authAtom)
    const [me, setMe] = useAtom(meAtom)

    const removeAuth = () => {
        setAuthState(initialValue)
        setMe(undefined)
    }

    return {
        authState,
        setAuthState,
        removeAuth,
        me,
        setMe,
    }
}
