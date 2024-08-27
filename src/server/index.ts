import { fastifyTRPCPlugin, FastifyTRPCPluginOptions } from '@trpc/server/adapters/fastify'
import Fastify from 'fastify'
import { createContext } from '~/utils/context'
import cors from '@fastify/cors'
import dotenv from 'dotenv'
import { AppDataSource } from '~/data-source'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import helmet from '@fastify/helmet'
import { BaseRouter, baseRouter } from '~/baseRouter'
import fmp from '@fastify/multipart'
import { Logger } from 'tslog'
import { fastifyTRPCOpenApiPlugin } from 'trpc-openapi'
import { openApiDocument } from './swagger'

const stage = process.env.STAGE || 'local'
process.env.STAGE = stage

dotenv.config({ path: '../../config/.env' })
dotenv.config({ path: `../../config/.${stage}.env` })
console.log(`stage: ${stage}`)
const logger = new Logger()

const app = Fastify()

const main = async () => {
    await app.register(cors)

    const isHTTPS = process.env.HTTPS === 'true'

    await app.register(fmp)

    await app.register(fastifyTRPCPlugin, {
        prefix: '/api',
        trpcOptions: {
            router: baseRouter,
            createContext,
            onError({ path, error }) {
                // report to error monitoring
                logger.error(`Error in tRPC handler on path '${path}':`, error)
            },
        } as FastifyTRPCPluginOptions<BaseRouter>['trpcOptions'],
    })

    if (process.env.NODE_ENV !== 'production') {
        await app.register(fastifyTRPCOpenApiPlugin, { router: baseRouter, prefix: '/api' })

        app.get('/openapi.json', () => openApiDocument)

        await app.register(fastifySwagger, {
            specification: { document: openApiDocument },
            mode: 'static',
        })

        await app.register(fastifySwaggerUi, {
            prefix: '/docs',
            uiConfig: {
                deepLinking: false,
            },
        })

        app.swagger()
    }

    app.addHook('onRequest', async (_, reply) => {
        if (isHTTPS) reply.header('Content-Security-Policy', 'upgrade-insecure-requests')

        reply.header('x-xss-protection', '1; mode=block')
    })

    await app.register(helmet, {
        contentSecurityPolicy: false,
        crossOriginResourcePolicy: false,
        hsts: isHTTPS,
    })

    await app
        .listen({ port: Number(process.env.PORT) })
        .then(() => {
            logger.info(`Server started on http://localhost:${process.env.PORT}/api`)
            logger.info(`Swagger started on http://localhost:${process.env.PORT}/docs`)
        })
        .catch((err) => {
            logger.error(err)
        })
}

AppDataSource.initialize()
    .then(async () => await main())
    .catch((err) => logger.error(err))
