import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pages from 'vite-plugin-pages'
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label'
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh'
import * as dotenv from 'dotenv'

dotenv.config({ path: '../../config/.env' })

export default defineConfig({
    plugins: [
        react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } }),
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
            '@': '../../*',
        },
    },
    server: {
        port: 3001,
        fs: {
            allow: ['../..'],
        },
    },
    define: {
        'process.env.HTTP_BATCH_LINK': `'${process.env.HTTP_BATCH_LINK}'`,
    },
    cacheDir: '../../node_modules/admin/.vite',
})
