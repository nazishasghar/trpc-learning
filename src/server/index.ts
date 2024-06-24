import { fastifyTRPCPlugin, FastifyTRPCPluginOptions } from '@trpc/server/adapters/fastify'
import Fastify from 'fastify'
import { createContext } from './utils/context'
import cors from '@fastify/cors'
import * as dotenv from 'dotenv'
import { AppDataSource } from './dataSource'
import { BaseRouter, baseRouter } from './baseRouter'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
dotenv.config({ path: `../..prod.env` })
dotenv.config({ path: '../../config/.env' })

const main = async () => {
    const app = Fastify()
    // Setup CORS
    await app.register(cors)

    await app.register(fastifyTRPCPlugin, {
        prefix: '/api',
        trpcOptions: {
            router: baseRouter,
            createContext,
            onError({ path, error }) {
                // report to error monitoring
                console.error(`Error in tRPC handler on path '${path}':`, error)
            },
        } as FastifyTRPCPluginOptions<BaseRouter>['trpcOptions'],
    })

    await app.register(fastifySwagger)

    await app.register(fastifySwaggerUi, { prefix: '/docs' })

    await app
        .listen({ port: Number(process.env.PORT) })
        .then((address) => {
            console.log(`Server started on ${address}\n: http://localhost:${process.env.PORT}/api`)
            console.log(`Swagger started on ${address}\n: http://localhost:${process.env.PORT}/docs`)
        })
        .catch((e) => {
            throw e
        })
}

AppDataSource.initialize()
    .then(async () => main())
    .catch(() => process.exit(1))
