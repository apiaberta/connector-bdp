import { Rate } from './db.js'
import { ECB_SERIES, LENDING_SERIES } from './series.js'

export async function bdpRoutes(app) {

  // GET /bdp/rates — ECB key interest rates + €STR
  app.get('/rates', {
    schema: {
      description: 'ECB key interest rates and Euro Short-Term Rate (€STR)',
      tags: ['Banco de Portugal']
    }
  }, async () => {
    const rates = await Rate.find({
      seriesKey: { $in: ECB_SERIES.map(s => s.key) }
    }).lean()

    const rateMap = {}
    for (const r of rates) rateMap[r.seriesKey] = r

    const data = ECB_SERIES.map(s => {
      const r = rateMap[s.key]
      return {
        key:       s.key,
        label:     s.label,
        label_pt:  s.label_pt,
        value:     r?.value ?? null,
        unit:      s.unit,
        ref_date:  r?.refDate ?? null,
        frequency: s.frequency,
        synced_at: r?.synced_at ?? null
      }
    })

    const mostRecent = rates.reduce((a, b) =>
      (a?.synced_at > b?.synced_at ? a : b), null
    )

    return {
      source:    'Banco de Portugal BPstat / European Central Bank',
      source_url: 'https://bpstat.bportugal.pt',
      count:     data.length,
      synced_at: mostRecent?.synced_at ?? null,
      data
    }
  })

  // GET /bdp/lending-rates — BdP lending and deposit rates in Portugal
  app.get('/lending-rates', {
    schema: {
      description: 'Bank lending and deposit rates in Portugal (housing loans, consumer credit, term deposits)',
      tags: ['Banco de Portugal']
    }
  }, async () => {
    const rates = await Rate.find({
      seriesKey: { $in: LENDING_SERIES.map(s => s.key) }
    }).lean()

    const rateMap = {}
    for (const r of rates) rateMap[r.seriesKey] = r

    const data = LENDING_SERIES.map(s => {
      const r = rateMap[s.key]
      return {
        key:       s.key,
        label:     s.label,
        label_pt:  s.label_pt,
        value:     r?.value ?? null,
        unit:      s.unit,
        ref_date:  r?.refDate ?? null,
        frequency: s.frequency,
        synced_at: r?.synced_at ?? null
      }
    })

    const mostRecent = rates.reduce((a, b) =>
      (a?.synced_at > b?.synced_at ? a : b), null
    )

    return {
      source:    'Banco de Portugal BPstat',
      source_url: 'https://bpstat.bportugal.pt',
      note:      'Monthly data. New operations only. Annualised agreed rate (AAR).',
      count:     data.length,
      synced_at: mostRecent?.synced_at ?? null,
      data
    }
  })
}
