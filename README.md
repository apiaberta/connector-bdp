# connector-bdp

Conector API Aberta para dados financeiros do **Banco de Portugal** (BPstat) e do **BCE**.

## Endpoints

| Método | Path | Descrição |
|--------|------|-----------|
| GET | `/health` | Health check |
| GET | `/meta` | Metadados e última actualização |
| GET | `/bdp/rates` | Taxas de juro BCE (MRO, depósito, cedência) + €STR |
| GET | `/bdp/lending-rates` | Taxas de crédito e depósitos em Portugal |

### Exemplos

```bash
# Taxas BCE
curl https://api.apiaberta.pt/v1/bdp/rates

# Crédito habitação, consumo, depósitos a prazo
curl https://api.apiaberta.pt/v1/bdp/lending-rates
```

## Fontes

- [BPstat — Banco de Portugal](https://bpstat.bportugal.pt)
- [ECB Data Portal](https://data.ecb.europa.eu)

## Actualização

Diária, via cron — sincroniza com a API BPstat às 06:00.

## Configuração

```bash
cp .env.example .env
# Editar PORT e MONGO_URI se necessário
npm install
npm run dev
```

## Stack

- Node.js 22+ / ES Modules
- Fastify 5
- MongoDB (Mongoose)
- node-cron
