import { AppDataSource } from '~/data-source'
import { Admin } from '~/entities/admin/admin.entities'

export const adminRepo = AppDataSource.getRepository(Admin)