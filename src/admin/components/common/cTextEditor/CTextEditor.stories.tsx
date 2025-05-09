import { Meta, StoryObj } from '@storybook/react'

import { CTextEditor, CTextEditorProps } from './CTextEditor'

export default {
    title: 'common/cTextEditor',
    component: CTextEditor,
} as Meta<CTextEditorProps<{ [key: string]: string }>>

export const Default: StoryObj<typeof CTextEditor> = {
    args: {},
}
