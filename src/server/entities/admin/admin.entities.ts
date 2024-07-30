import { Column, Entity, OneToMany, Relation } from 'typeorm'
import { BaseEntities } from '../../utils/base-entities/base'
import { Exclude } from 'class-transformer'
import { EmployeeEntities } from '../employee/employee.entities'
import { OmitAndPickPartial, position } from '../../types/common'

@Entity()
export class AdminEntities extends BaseEntities {
    @Column({ type: 'varchar', length: 50 })
    name!: string

    @Column({ type: 'varchar', length: 50, unique: true })
    email!: string

    @Column({ type: 'varchar', length: 120 })
    bio!: string

    @Column({ type: 'varchar', length: 10 })
    position!: typeof position[number]

    @Column({ type: 'varchar', length: 120 })
    @Exclude()
    password!: string

    @OneToMany(() => EmployeeEntities, (ob) => ob.leader)
    team?: Relation<EmployeeEntities[]>

    constructor(partial: OmitAndPickPartial<AdminEntities, keyof Omit<BaseEntities, 'uuid'>, never>) {
        super()
        Object.assign(this, partial)
    }

}
