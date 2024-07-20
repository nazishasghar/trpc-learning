import { AppDataSource } from '~/db/config/data-source'
import { AdminRefreshTokenEntities } from '~/entities/admin/admin-refresh-token.entities'

export const adminRefreshRepo = AppDataSource.getRepository(AdminRefreshTokenEntities)