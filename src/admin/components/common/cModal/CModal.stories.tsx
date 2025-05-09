import { Meta, StoryObj } from '@storybook/react'

import { CModal, CModalProps } from './CModal'

export default {
    title: 'common/cModel',
    component: CModal,
} as Meta<CModalProps>

export const Default: StoryObj<typeof CModal> = {
    args: {},
}
