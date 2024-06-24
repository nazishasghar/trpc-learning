/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./test/setup-test-env.ts', 'jest-extended/all'],
        // reporters: ['default', 'junit'],
        coverage: {
            provider: 'v8',
            reporter: ['json-summary', 'html-spa', 'cobertura', 'text', 'text-summary'],
            reportsDirectory: '.pages/cov',
            clean: true,
        },
        outputFile: {
            junit: '.pages/junit.xml',
        },
    },
})
