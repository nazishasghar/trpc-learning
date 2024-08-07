import { Meta, StoryObj } from '@storybook/react'

import { CTextEditor, CTextEditorProps } from './CTextEditor'

export default {
    title: 'common/cTextEditor',
    component: CTextEditor,
} as Meta<CTextEditorProps>

export const Default: StoryObj<typeof CTextEditor> = {
    args: {},
}
