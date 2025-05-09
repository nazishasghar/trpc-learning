import { generateOpenApiDocument } from 'trpc-openapi'

import { baseRouter } from '~/baseRouter'

export const openApiDocument = generateOpenApiDocument(baseRouter, {
    title: 'Feedback',
    version: '1.0.0',
    baseUrl: 'http://localhost:3000/api',
})
