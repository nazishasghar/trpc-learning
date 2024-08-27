import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pages from 'vite-plugin-pages'
import * as dotenv from 'dotenv'

const stage = process.env.STAGE || 'local'
process.env.STAGE = stage

dotenv.config({ path: '../../config/.env' })
dotenv.config({ path: `../../config/.${stage}.env` })
console.log(`stage: ${stage}`)

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
            '@': '../../*',
        },
    },
    server: {
        port: 3002,
        fs: {
            allow: ['../..'],
        },
    },
    define: {
        'process.env.HTTP_BATCH_LINK': `'${process.env.HTTP_BATCH_LINK}'`,
    },
    cacheDir: '../../node_modules/client/.vite',
})
