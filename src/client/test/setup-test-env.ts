import '@testing-library/jest-dom/vitest'
import 'jest-extended'

import { vi } from 'vitest'

vi.mock('react-router', () => {
    return {
        useNavigate: vi.fn(),
        useLocation: vi.fn(),
    }
})
