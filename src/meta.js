import { ALL_SERIES } from './series.js'

export async function metaRoutes(app) {
  app.get('/meta', {
    schema: {
      description: 'Service metadata for connector-bdp',
      tags: ['Meta']
    }
  }, async () => ({
    service:     'connector-bdp',
    description: 'Banco de Portugal financial rates (ECB key rates, lending rates, €STR)',
    version:     '1.0.0',
    source:      'BdP BPstat API (https://bpstat.bportugal.pt)',
    endpoints: [
      { path: '/v1/bdp/rates',         description: 'ECB key interest rates and €STR' },
      { path: '/v1/bdp/lending-rates', description: 'Bank lending and deposit rates in Portugal' },
      { path: '/v1/bdp/meta',          description: 'Service metadata and series catalogue' }
    ],
    series_catalogue: ALL_SERIES.map(s => ({
      id:        s.id,
      key:       s.key,
      label:     s.label,
      label_pt:  s.label_pt,
      unit:      s.unit,
      frequency: s.frequency
    }))
  }))
}
