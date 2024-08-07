import { Meta, StoryObj } from '@storybook/react'

import { CDialog, CDialogProps } from './CDialog'

export default {
    title: 'common/cDialog',
    component: CDialog,
} as Meta<CDialogProps>

export const Default: StoryObj<typeof CDialog> = {
    args: {},
}
