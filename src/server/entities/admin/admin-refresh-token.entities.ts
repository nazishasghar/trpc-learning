import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'
import type { Relation } from 'typeorm'
import { BaseEntities } from '../../utils/base-entities/base'
import { Exclude } from 'class-transformer'
import { Admin } from './admin.entities'

@Entity()
@Exclude()
export class AdminRefreshTokenEntities extends BaseEntities {
    @Column({ type: 'varchar', length: 63 })
    @Index()
    token!: string

    @ManyToOne(() => Admin)
    @JoinColumn()
    user?: Relation<Admin>
}
