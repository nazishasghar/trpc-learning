import { Meta, StoryObj } from '@storybook/react'

import { CButton, CButtonProps } from './CButton'

export default {
    title: 'global/cButton',
    component: CButton,
} as Meta<CButtonProps>


export const Default: StoryObj<typeof CButton> = {
    args: {},
}
