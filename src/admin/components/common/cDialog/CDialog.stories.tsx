import { Meta, StoryObj } from '@storybook/react'

import { CDialog } from './CDialog'

export default {
    title: 'common/cDialog',
    component: CDialog,
} as Meta

export const Default: StoryObj<typeof CDialog> = {
    args: {},
}
