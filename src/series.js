/**
 * Curated BdP BPstat series definitions
 * 
 * All series IDs verified against the BdP BPstat API on 2026-03-10.
 * Source: https://bpstat.bportugal.pt/api/series/
 */

// ECB key interest rates (daily frequency, domain 22)
export const ECB_SERIES = [
  {
    id: 12504589,
    key: 'ecb_mro',
    label: 'ECB Main Refinancing Operations (MRO)',
    label_pt: 'Taxa BCE - Operações principais de refinanciamento (MRO)',
    unit: '%',
    frequency: 'daily'
  },
  {
    id: 12504591,
    key: 'ecb_deposit',
    label: 'ECB Deposit Facility Rate',
    label_pt: 'Taxa BCE - Facilidade de depósito',
    unit: '%',
    frequency: 'daily'
  },
  {
    id: 12504590,
    key: 'ecb_marginal_lending',
    label: 'ECB Marginal Lending Facility Rate',
    label_pt: 'Taxa BCE - Facilidade de cedência marginal de liquidez',
    unit: '%',
    frequency: 'daily'
  },
  {
    id: 12559714,
    key: 'estr',
    label: 'Euro Short-Term Rate (€STR)',
    label_pt: 'Taxa de juro de curto prazo do euro (€STR)',
    unit: '%',
    frequency: 'daily'
  },
  {
    id: 12504601,
    key: 'tba',
    label: 'BdP Reference Rate (TBA, derived from Euribor)',
    label_pt: 'Taxa de juro de referência BdP (TBA, calculada a partir das Euribor)',
    unit: '%',
    frequency: 'daily'
  }
]

// BdP lending rates for Portugal (monthly frequency, domain 21)
export const LENDING_SERIES = [
  {
    id: 12533735,
    key: 'housing_loans',
    label: 'New housing loans — average rate (Portugal)',
    label_pt: 'Novos empréstimos à habitação — taxa média (Portugal)',
    unit: '%',
    frequency: 'monthly'
  },
  {
    id: 12533733,
    key: 'consumer_loans',
    label: 'New consumer credit — average rate (Portugal)',
    label_pt: 'Novo crédito ao consumo — taxa média (Portugal)',
    unit: '%',
    frequency: 'monthly'
  },
  {
    id: 12533736,
    key: 'all_loans',
    label: 'All new loans — average rate (Portugal)',
    label_pt: 'Todos os novos empréstimos — taxa média (Portugal)',
    unit: '%',
    frequency: 'monthly'
  },
  {
    id: 12533732,
    key: 'other_loans',
    label: 'Other new loans — average rate (Portugal)',
    label_pt: 'Outros novos empréstimos — taxa média (Portugal)',
    unit: '%',
    frequency: 'monthly'
  },
  {
    id: 12519805,
    key: 'term_deposits',
    label: 'New term deposits up to 1yr — average rate (Portugal)',
    label_pt: 'Novos depósitos a prazo até 1 ano — taxa média (Portugal)',
    unit: '%',
    frequency: 'monthly'
  }
]

export const ALL_SERIES = [...ECB_SERIES, ...LENDING_SERIES]
