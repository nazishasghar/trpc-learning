import { Column, Entity } from 'typeorm'
import { BaseEntities } from '~/utils/base-entities/base'

@Entity()
export class Admin extends BaseEntities {
    @Column({ type: 'varchar', length: 50 })
    name!: string

    @Column({ type: 'varchar', length: 50 })
    email!: string

    @Column({ type: 'varchar', length: 250 })
    address!: string
}
