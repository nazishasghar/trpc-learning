import { Column, Entity, Index, JoinColumn, ManyToOne, Relation } from 'typeorm'
import { BaseEntities } from '../../utils/base-entities/base'
import { EmployeeEntities } from './employee.entities'
import { Exclude } from 'class-transformer'
import { OmitAndPickPartial } from '~/types/common'

@Entity()
@Exclude()
export class EmployeeRefreshTokenEntities extends BaseEntities {
    @Column({ type: 'varchar', length: 63 })
    @Index()
    token!: string

    @ManyToOne(() => EmployeeEntities)
    @JoinColumn()
    employee?: Relation<EmployeeEntities>

    constructor(partial: OmitAndPickPartial<EmployeeRefreshTokenEntities, keyof Omit<BaseEntities, 'uuid'>, never>) {
        super()
        Object.assign(this, partial)
    }
}
