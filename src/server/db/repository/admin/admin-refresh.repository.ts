import { AppDataSource } from '~/data-source'
import { AdminRefreshTokenEntities } from '~/entities/admin/admin-refresh-token.entities'

export const adminRefreshRepo = AppDataSource.getRepository(AdminRefreshTokenEntities)