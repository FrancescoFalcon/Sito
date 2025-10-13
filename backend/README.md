# Lord of the Mysteries API

Express.js REST API che espone il lore della saga **Lord of the Mysteries**.

## Script npm

| Script | Descrizione |
| --- | --- |
| `npm run start` | Avvia il server Express in modalità produzione |
| `npm run dev` | Avvia il server con nodemon per hot-reload |
| `npm run seed` | Popola MongoDB con i dati di esempio |
| `npm run lint` | Esegue ESLint |
| `npm test` | Esegue i test unitari (Jest) |

## Endpoints

- `GET /api/health` – stato del servizio
- `GET /api/paths` – elenco dei percorsi Beyonder
- `GET /api/paths/:slug` – dettaglio del singolo percorso
- `GET /api/characters` – elenco personaggi principali (campo `category` valorizzato con "Tarot Club Members", "Villains", "Relevant Characters", "Gods" o "Outer Gods")
- `GET /api/characters/:slug` – dettaglio personaggio
- `GET /api/notes` – lista appunti investigativi
- `POST /api/notes` – crea un nuovo appunto (`{ titolo, contenuto, tags? }`)
- `POST /api/auth/register` – registra un nuovo utente (`{ username, password }`)
- `POST /api/auth/login` – effettua il login (`{ username, password }`)
- `GET /api/auth/me` – restituisce il profilo dell'utente autenticato (richiede header `Authorization: Bearer <token>`)
- `GET /api/community/threads` – lista discussioni della community (richiede autenticazione)
- `POST /api/community/threads` – crea una nuova discussione (`{ title, content, isSpoiler? }`, richiede autenticazione)
- `POST /api/community/threads/:slug/replies` – aggiunge una risposta a un thread (`{ content }`, richiede autenticazione)
- `PATCH /api/community/threads/:slug/react` – gestisce i like/dislike di un thread (`{ sentiment: "like" | "dislike" }`, richiede autenticazione)
- `PATCH /api/community/threads/:slug/replies/:replyId/react` – gestisce i like/dislike di una risposta (`{ sentiment: "like" | "dislike" }`, richiede autenticazione)

## Sicurezza di Base

- [Helmet](https://www.npmjs.com/package/helmet) per intestazioni HTTP sicure
- CORS configurato sul dominio del frontend

## Struttura Cartelle

```
src/
  app.js
  server.js
  config/
  controllers/
  data/
  models/
  routes/
  scripts/
  utils/
```

## Variabili d Ambiente

Copia `.env.example` in `.env` e personalizza:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/lotm
CLIENT_ORIGIN=http://localhost:5173
JWT_SECRET=super-secret-key
```
