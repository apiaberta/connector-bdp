/**
 * Sync rates from BdP BPstat API
 */

import { Rate } from './db.js'
import { ALL_SERIES } from './series.js'

const BDPSTAT_BASE = 'https://bpstat.bportugal.pt/api'

export async function syncRates(log) {
  const ids = ALL_SERIES.map(s => s.id).join(',')
  const url = `${BDPSTAT_BASE}/series/?lang=PT&series_ids=${ids}`

  log?.info({ url }, 'Fetching rates from BdP BPstat...')

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`BdP BPstat API error: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()
  const fetched = data.data || []

  const now = new Date()
  let updated = 0

  for (const item of fetched) {
    const seriesDef = ALL_SERIES.find(s => s.id === item.id)
    if (!seriesDef) continue

    const value   = parseFloat(item.last_observation_value)
    const refDate = item.last_observation_reference_date

    if (isNaN(value) || !refDate) continue

    // Upsert: one document per series key
    await Rate.findOneAndUpdate(
      { seriesKey: seriesDef.key },
      {
        seriesId:  item.id,
        seriesKey: seriesDef.key,
        value,
        refDate,
        synced_at: now
      },
      { upsert: true, new: true }
    )
    updated++
  }

  log?.info({ updated, total: ALL_SERIES.length }, 'Rates sync complete')
  return { updated, total: ALL_SERIES.length, synced_at: now.toISOString() }
}
