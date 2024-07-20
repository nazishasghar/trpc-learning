import { AppDataSource } from '~/db/config/data-source'
import { Admin } from '~/entities/admin/admin.entities'

export const adminRepo = AppDataSource.getRepository(Admin)