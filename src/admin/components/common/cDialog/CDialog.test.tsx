import { render } from '@testing-library/react'
import { vi } from 'vitest'

import { createQueryWrapper } from '~/test/utils/create-query-wrapper'

import { CDialog } from './CDialog'

describe('CDialog', () => {
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
            // const rendered = renderHook(() => useCDialog(), { wrapper: queryWrapper }).result
            // // Act
            // await act(async () => {})
            // Assert
        })
    })

    describe('view', () => {
        test('should be rendered', async () => {
            // Arrange
            const { getByTestId } = render(<CDialog />, { wrapper: queryWrapper })
            const element = getByTestId('c-dialog')

            // Assert
            expect(element).toBeInTheDocument()
        })

        test('ADD_YOUR_TESTS', async () => {
            // Arrange
            // Act
            // await act(async () => {})
            // Assert
        })
    })
})
