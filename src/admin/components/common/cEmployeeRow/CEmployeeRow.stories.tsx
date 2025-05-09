import { Meta, StoryObj } from '@storybook/react'

import { CEmployeeRow, CEmployeeRowProps } from './CEmployeeRow'

export default {
    title: 'common/cEmployeeRow',
    component: CEmployeeRow,
} as Meta<CEmployeeRowProps>

export const Default: StoryObj<typeof CEmployeeRow> = {
    args: {},
}
