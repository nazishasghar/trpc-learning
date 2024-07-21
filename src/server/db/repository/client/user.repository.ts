import { AppDataSource } from '~/data-source'
import { User } from '~/entities/user/user.entities'

export const userRepo = AppDataSource.getRepository(User)


