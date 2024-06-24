import { act, render } from '@testing-library/react'
import { vi } from 'vitest'

import { createQueryWrapper } from '~/test/utils/create-query-wrapper'

import { CButton } from './CButton'

describe('CButton', () => {
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
            // const rendered = renderHook(() => useCButton(), { wrapper: queryWrapper }).result

            // Act
            await act(async () => {})

            // Assert
        })
    })

    describe('view', () => {
        test('should be rendered', async () => {
            // Arrange
            const { getByTestId } = render(<CButton />, { wrapper: queryWrapper })
            const element = getByTestId('c-button')

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
