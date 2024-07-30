import { Exclude } from 'class-transformer'
import { Column, Entity, ManyToOne, OneToMany, Relation } from 'typeorm'
import { BaseEntities } from '../../utils/base-entities/base'
import { FeedBackEntities } from '../feedback/feedback.entities'
import { AdminEntities } from '../admin/admin.entities'
import { OmitAndPickPartial, position } from '../../types/common'

@Entity()
export class EmployeeEntities extends BaseEntities {
    @Column({ type: 'varchar', length: 50 })
    name!: string

    @Column({ type: 'varchar', length: 50, unique: true })
    email!: string

    @Column({ type: 'varchar', length: 120 })
    @Exclude()
    password!: string

    @Column({ type: 'varchar', length: 50 })
    bio!: string

    @Column({ type: 'varchar', length: 10 })
    position!: typeof position[number]

    @OneToMany(() => FeedBackEntities, (feedback) => feedback.employee)
    feedbacks?: Relation<FeedBackEntities[]>

    @ManyToOne(() => AdminEntities)
    leader?: Relation<AdminEntities>

    constructor(partial: OmitAndPickPartial<EmployeeEntities, keyof Omit<BaseEntities, 'uuid'>, never>) {
        super()
        Object.assign(this, partial)
    }
}
