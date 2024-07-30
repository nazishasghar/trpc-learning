import { Admin } from '~/entities/admin/admin.entities'
import { Employee } from '~/entities/employee/employee.entities'
import { Context } from '~/utils/context'

export type ProcedureResolveOption<T> = {
    ctx: Context & { user?: Admin | Employee }
    input: T
}
