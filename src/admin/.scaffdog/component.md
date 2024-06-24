---
name: "component"
root: "./components"
output: "!*"
ignore: ["**/__snapshots__/**"]
questions:
    type:
        message: 'Select the component type'
        choices:
            - 'common'
            - 'functional'
            - 'global'
    name: |-
        Enter component name
        e.g. CButton -> common/cButton/CButton.tsx
        >
---

# `{{ inputs.type }}/{{ inputs.name | camel }}/{{ inputs.name | pascal }}.tsx`

```tsx
import type { FC, ReactNode } from 'react'
import React from 'react'
import { NsPropTypeBase } from '~/types/nsPropTypeBase'


export type {{ inputs.name | pascal -}}Props = {
    children?: ReactNode
} & NsPropTypeBase

// logic
export const use{{ inputs.name | pascal -}} = (props: {{ inputs.name | pascal -}}Props) => {
    return {}
}

// view
export const {{ inputs.name | pascal -}}View: FC<{{ inputs.name | pascal -}}Props & ReturnType<typeof use{{ inputs.name | pascal -}}>> = (props) => {
    const { children, _style } = props

    return (
        <>
            <span data-testid="{{- inputs.name | kebab -}}"></span>
        </>
    )
}

// component
export const {{ inputs.name | pascal -}}: FC<{{ inputs.name | pascal -}}Props> = (props: {{ inputs.name | pascal -}}Props) => {
    const hookItems = use{{ inputs.name | pascal -}}(props)
    return <{{ inputs.name | pascal -}}View {...props} {...hookItems} />
}

```

# `{{ inputs.type }}/{{ inputs.name | camel }}/{{ inputs.name | pascal }}.stories.tsx`

```tsx
import { Meta, StoryObj } from '@storybook/react'

import { {{ inputs.name | pascal }}, {{ inputs.name | pascal }}Props } from './{{ inputs.name | pascal }}'

export default {
    title: '{{ inputs.type }}/{{ inputs.name | camel }}',
    component: {{ inputs.name | pascal }},
} as Meta<{{ inputs.name | pascal }}Props>


export const Default: StoryObj<typeof {{ inputs.name | pascal }}> = {
    args: {},
}

```


# `{{ inputs.type }}/{{ inputs.name | camel }}/{{ inputs.name | pascal }}.test.tsx`

```tsx
import { act, render, renderHook } from '@testing-library/react'
import { vi } from 'vitest'

import { createQueryWrapper } from '~/test/utils/create-query-wrapper'

import { {{ inputs.name | pascal }}, use{{ inputs.name | pascal }} } from './{{ inputs.name | pascal }}'

describe('{{ inputs.name | pascal }}', () => {
    // Create stub
    const { queryClient, queryWrapper } = createQueryWrapper()
    // Set a constant values to initialize react-query
    // e.g.
    queryClient.setQueryData(['sample-key'], { data: 'sample' })

    afterEach(() => {
        vi.clearAllMocks()
    })

    describe('logic', () => {
        test('ADD_YOUR_TESTS', async () => {
            // Arrange
            const rendered = renderHook(() => use{{ inputs.name | pascal }}(), { wrapper: queryWrapper }).result

            // Act
            await act(async () => {})

            // Assert
        })
    })

    describe('view', () => {
        test('should be rendered', async () => {
            // Arrange
            const { getByTestId } = render(<{{ inputs.name | pascal }} />, { wrapper: queryWrapper })
        const element = getByTestId('{{- inputs.name | kebab -}}')

        // Assert
        expect(element).toBeInTheDocument()
    })

    test('ADD_YOUR_TESTS', async () => {
        // Arrange

        // Act
        await act(async () => {})

        // Assert
    })
})
})


```
