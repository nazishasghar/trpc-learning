import { Meta, StoryObj } from '@storybook/react'

import { CGraph, CGraphProps } from './CGraph'

export default {
    title: 'functional/cGraph',
    component: CGraph,
} as Meta<CGraphProps>

export const Default: StoryObj<typeof CGraph> = {
    args: {},
}
