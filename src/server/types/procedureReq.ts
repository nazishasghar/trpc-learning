import { AdminEntities } from '~/entities/admin/admin.entities'
import { EmployeeEntities } from '~/entities/employee/employee.entities'
import { Context } from '~/utils/context'

export type ProcedureResolveOption<T> = {
    ctx: Context & { user?: AdminEntities | EmployeeEntities }
    input: T
}
