import Fastify from 'fastify'
import mongoose from 'mongoose'
import cron from 'node-cron'
import { bdpRoutes } from './routes.js'
import { metaRoutes } from './meta.js'
import { syncRates } from './sync.js'

const SERVICE_NAME = 'connector-bdp'
const HOST      = process.env.HOST || '127.0.0.1'
const PORT      = parseInt(process.env.PORT || '3008')
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/apiaberta-bdp'

const app = Fastify({
  logger: {
    transport: process.env.NODE_ENV !== 'production'
      ? { target: 'pino-pretty' }
      : undefined
  }
})

// ─── Health ──────────────────────────────────────────────────────────────────

app.get('/health', async () => ({
  status:    'ok',
  service:   SERVICE_NAME,
  version:   '1.0.0',
  timestamp: new Date().toISOString()
}))

// ─── Data routes ─────────────────────────────────────────────────────────────

await app.register(metaRoutes)
await app.register(bdpRoutes, { prefix: '/bdp' })

// ─── Cron: sync rates daily at 08:00 (BdP updates are usually morning) ────────

cron.schedule('0 8 * * *', async () => {
  app.log.info('Cron: syncing BdP rates...')
  try {
    const r = await syncRates(app.log)
    app.log.info({ r }, 'BdP rates sync complete')
  } catch (err) {
    app.log.error({ err }, 'BdP rates sync failed')
  }
})

// ─── Startup ─────────────────────────────────────────────────────────────────

await mongoose.connect(MONGO_URI)
app.log.info('Connected to MongoDB')

// Initial sync on startup
app.log.info('Running initial BdP rates sync...')
syncRates(app.log)
  .then(r => app.log.info({ r }, 'Initial BdP rates sync done'))
  .catch(err => app.log.error({ err }, 'Initial BdP rates sync failed'))

await app.listen({ port: PORT, host: HOST })
app.log.info(`${SERVICE_NAME} listening on ${HOST}:${PORT}`)
