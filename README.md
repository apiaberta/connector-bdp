# API Aberta — Banco de Portugal Connector

Microservice for financial and economic data from Banco de Portugal.

## Features

- Exchange rates
- Interest rates
- Economic indicators
- Financial statistics

## Endpoints

- `GET /health` — Service health check
- `GET /meta` — Service metadata
- `GET /rates/exchange` — Exchange rates
- `GET /rates/interest` — Interest rates
- `GET /indicators` — Economic indicators

## Setup

```bash
npm install
cp .env.example .env
npm start
```

Listens on `127.0.0.1:3008` by default (`HOST` / `PORT`). Production and the gateway use the same port.

## Data Source

Banco de Portugal open data APIs

## License

MIT
