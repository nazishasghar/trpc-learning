import { Context } from '~/utils/context'

export type ProcedureResolveOption<T> = {
    ctx: Context
    input: T
}
