import { Meta, StoryObj } from '@storybook/react'

import { CFeedbackTable, CFeedbackTableProps } from './CFeedbackTable'

export default {
    title: 'common/cFeedbackTable',
    component: CFeedbackTable,
} as Meta<CFeedbackTableProps>

export const Default: StoryObj<typeof CFeedbackTable> = {
    args: {},
}
