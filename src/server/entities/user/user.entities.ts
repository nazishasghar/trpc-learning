import { Exclude } from 'class-transformer'
import { Column, Entity } from 'typeorm'
import { BaseEntities } from '~/utils/base-entities/base'

@Entity()
export class User extends BaseEntities {
    @Column({ type: 'varchar', length: 50 })
    name!: string

    @Column({ type: 'varchar', length: 50 })
    email!: string

    @Column({ type: 'varchar' })
    @Exclude()
    password!: string

    @Column({ type: 'varchar', length: 250 })
    address!: string
}
