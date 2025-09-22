import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { openapi } from './openapi.js'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@as-integrations/express4'
import { typeDefs } from './graphql/schema'
import { resolvers } from './graphql/resolvers'
import routes from './routes/index.js'

async function main() {
  const app = express()
  app.use(express.json())

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi))

  // Apollo
  const apollo = new ApolloServer({ typeDefs, resolvers })
  await apollo.start()
  app.use('/graphql', expressMiddleware(apollo))

  // Health
  app.get('/health', (_req, res) => res.json({ ok: true }))

  // REST
  routes.forEach(route => {
    const { configuration: cfg } = route
    ;(app as any)[cfg.method](`/api${cfg.url}`, ...cfg.middlewares, cfg.handler)
  })

  const PORT = Number(process.env.PORT ?? 3001)
  app.listen(PORT, () => {
    console.log(`✅ http://localhost:${PORT}/api/health`)
    console.log(`📚 Swagger UI → http://localhost:${PORT}/docs`)
  })
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
