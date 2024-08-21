export type OmitAndPickPartial<T, OmitType extends keyof T, PickType extends keyof T | never> = Omit<
    T,
    OmitType | PickType
> &
    Partial<Pick<T, PickType>>

type OmitKeys = 'createdAt' | 'updatedAt' | 'deletedAt' | 'id' | 'password'

export type OmitBaseProp<T> = {
    [P in keyof T as P extends OmitKeys ? never : P]: OmitBaseProp<T[P]>
}
export const position = ['CEO', 'CTO', 'COO', 'M3', 'M2', 'M1', 'J2', 'J1', 'B1', 'S1', 'S2'] as const
