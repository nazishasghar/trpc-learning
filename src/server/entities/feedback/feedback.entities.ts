import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm'
import { BaseEntities } from '../../utils/base-entities/base'
import { EmployeeEntities } from '../employee/employee.entities'
import { AdminEntities } from '../admin/admin.entities'
import { OmitAndPickPartial } from '~/types/common'

@Entity()
export class FeedBackEntities extends BaseEntities {
    @ManyToOne(() => AdminEntities)
    @JoinColumn()
    feedBackBy!: Relation<AdminEntities>

    @Column({ type: 'varchar', length: 20 })
    points!: string

    @ManyToOne(() => EmployeeEntities)
    employee!: Relation<EmployeeEntities>

    @Column({ type: 'text' })
    comments!: string

    @Column({ type: 'datetime', precision: 0 })
    feedBackDate!: string

    constructor(partial: OmitAndPickPartial<FeedBackEntities, keyof Omit<BaseEntities, 'uuid'>, never>) {
        super()
        Object.assign(this, partial)
    }
}
