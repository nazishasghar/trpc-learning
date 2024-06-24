import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Exclude } from 'class-transformer'

export abstract class BaseEntities {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    @Exclude()
    readonly id!: bigint

    @Column({ type: 'char', length: 36, unique: true, comment: 'uuid' })
    uuid!: string

    @DeleteDateColumn({ type: 'datetime', precision: 0, default: null })
    @Exclude()
    readonly deletedAt!: Date | null

    @CreateDateColumn({ type: 'datetime', precision: 0, default: () => 'CURRENT_TIMESTAMP' })
    readonly createdAt!: Date

    @UpdateDateColumn({
        type: 'datetime',
        precision: 0,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    readonly updatedAt!: Date
}
