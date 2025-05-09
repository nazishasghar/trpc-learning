import { Column, Entity, Index, JoinColumn, ManyToOne, Relation } from 'typeorm'
import { BaseEntities } from '../../utils/base-entities/base'
import { Exclude } from 'class-transformer'
import { AdminEntities } from './admin.entities'
import { OmitAndPickPartial } from '~/types/common'

@Entity()
@Exclude()
export class AdminRefreshTokenEntities extends BaseEntities {
    @Column({ type: 'varchar', length: 63 })
    @Index()
    token!: string

    @ManyToOne(() => AdminEntities)
    @JoinColumn()
    user?: Relation<AdminEntities>

    constructor(partial: OmitAndPickPartial<AdminRefreshTokenEntities, keyof Omit<BaseEntities, 'uuid'>, never>) {
        super()
        Object.assign(this, partial)
    }
}
