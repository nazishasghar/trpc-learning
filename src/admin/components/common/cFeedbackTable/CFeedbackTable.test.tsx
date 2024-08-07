import { vi } from 'vitest'

import { createQueryWrapper } from '~/test/utils/create-query-wrapper'

describe('CFeedbackTable', () => {
    // Create stub
    const { queryClient } = createQueryWrapper()
    // Set a constant values to initialize react-query
    // e.g.
    queryClient.setQueryData(['sample-key'], { data: 'sample' })

    afterEach(() => {
        vi.clearAllMocks()
    })

    describe('logic', () => {
        test('ADD_YOUR_TESTS', async () => {
            // Arrange
            // const rendered = renderHook(() => useCFeedbackTable(), { wrapper: queryWrapper }).result
            // // Act
            // await act(async () => {})
            // Assert
        })
    })

    describe('view', () => {
        test('should be rendered', async () => {
            // Arrange
            // const { getByTestId } = render(<CFeedbackTable />, { wrapper: queryWrapper })
            // const element = getByTestId('c-feedback-table')
            // // Assert
            // expect(element).toBeInTheDocument()
        })

        test('ADD_YOUR_TESTS', async () => {
            // Arrange
            // Act
            // await act(async () => {})
            // Assert
        })
    })
})
