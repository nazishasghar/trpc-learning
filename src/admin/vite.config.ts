import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pages from 'vite-plugin-pages'
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label'
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh'
import * as dotenv from 'dotenv'

const stage = process.env.STAGE || 'local'
process.env.STAGE = stage

dotenv.config({ path: '../../config/.env' })
dotenv.config({ path: `../../config/.${stage}.env` })
console.log(`stage: ${stage}`)

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
