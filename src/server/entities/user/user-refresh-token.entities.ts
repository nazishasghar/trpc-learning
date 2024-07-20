import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'
import type { Relation } from 'typeorm'
import { BaseEntities } from '~/utils/base-entities/base'
import { User } from '~/entities/user/user.entities'
import { Exclude } from 'class-transformer'

@Entity()
@Exclude()
export class UserRefreshTokenEntities extends BaseEntities {
    @Column({ type: 'varchar', length: 63 })
    @Index()
    token!: string

    @ManyToOne(() => User)
    @JoinColumn()
    user?: Relation<User>
}
