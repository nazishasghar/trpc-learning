import { AppDataSource } from '~/db/config/data-source'
import { UserRefreshTokenEntities } from '~/entities/user/user-refresh-token.entities'

export const userRefreshRepo = AppDataSource.getRepository(UserRefreshTokenEntities)
