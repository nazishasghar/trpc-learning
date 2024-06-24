import { AppDataSource } from '~/dataSource'
import { User } from '~/entities/user/user.entities'

export const userRepo = AppDataSource.getRepository(User)


