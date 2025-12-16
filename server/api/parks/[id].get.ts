// server/api/parks/index.get.ts
import { defineEventHandler, getQuery } from 'h3'
import { connectDB } from '../../utils/mongoose'
import Park from '../../models/Park'

export default defineEventHandler(async (event) => {
  console.log('[api/parks] handler invoked at', new Date().toISOString())
  const q = getQuery(event) as Record<string, string | undefined>
  console.log('[api/parks] query:', q)

  try {
    // Try to connect to DB and log a simple marker (connectDB already logs on success)
    await connectDB()
    try {
      // Only log whether runtime config has the URI (do NOT log secret value)
      const cfg = useRuntimeConfig?.()
      console.log('[api/parks] runtimeConfig.mongodbUri present?', !!cfg?.mongodbUri)
    } catch (e) {
      // ignore if useRuntimeConfig isn't available at this stage
    }

    const status = q.status?.toString()
    const filter: Record<string, any> = {}
    if (status === 'active') filter.isActive = true
    if (status === 'inactive') filter.isActive = false

    const parks = await Park.find(filter).sort({ order: 1, createdAt: -1 }).lean()
    console.log(`[api/parks] db returned ${parks?.length ?? 0} park(s)`)

    return { ok: true, data: parks }
  } catch (err: any) {
    console.error('[api/parks] error:', err && (err.stack || err.message || err))
    return { ok: false, error: err?.message || 'Failed to fetch parks (see server logs)' }
  }
})
