import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pages from 'vite-plugin-pages'

import dotenv from 'dotenv'

dotenv.config({ path: '../../config/.env' })

export default defineConfig({
    plugins: [
        react(),
        pages({
            dirs: './routes',
            extensions: ['tsx'],
            exclude: ['**/components/**'],
            importMode: 'async',
        }),
    ],
    resolve: {
        alias: {
            '~': __dirname,
        },
    },
    server: {
        port: 3002,
    },
    define: {
        'process.env.HTTP_BATCH_LINK': `'${process.env.HTTP_BATCH_LINK}'`,
    },
})
