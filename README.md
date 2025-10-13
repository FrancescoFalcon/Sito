# Lord of the Mysteries (LOTM) Explorer

Single Page Application (SPA) that lets fans explore the intricate world of **Lord of the Mysteries** through a rich, data-driven experience. The project combines a Vue.js frontend, an Express.js backend, and MongoDB for persistence.

## Stack Overview

| Layer | Technology | Purpose |
| --- | --- | --- |
| Frontend | Vue 3 + Vite, Vue Router, Axios, Bootstrap, LESS | SPA, UI components, routing, data fetch |
| Backend | Node.js, Express.js, Mongoose | REST API, business logic |
| Database | MongoDB Atlas / local MongoDB | Stores Beyonder paths, characters, notes |

## Project Layout

```
.
├── backend       # Express REST API + MongoDB models
├── frontend      # Vue 3 SPA (Vite)
└── README.md     # This file
```


## Come avviare il sito (istruzioni per il professore)

1. **Prerequisiti**
	- Node.js installato
	- MongoDB attivo (locale o Atlas; Compass serve solo per vedere i dati, non è obbligatorio)

2. **Backend**
	- Vai in `sito/backend`
	- Esegui `npm install` (solo la prima volta)
		 - Imposta la variabile `MONGODB_URI` in `.env` con la stringa di connessione
			 - Esempio locale: `MONGODB_URI=mongodb://localhost:27017/lotm`
		 - Puoi copiare `.env.example` in `.env` e compilare i valori richiesti
	- Esegui `npm run dev` per avviare il server API

3. **Frontend**
	- Vai in `sito/frontend`
	- Esegui `npm install` (solo la prima volta)
	- Esegui `npm run dev` per avviare il sito (di solito su `localhost:5173`)

**Riassunto:**
- MongoDB deve essere attivo
- Backend deve essere avviato
- Frontend deve essere avviato
- Compass è solo per gestire i dati, non obbligatorio per il funzionamento del sito

Se vuoi vedere il sito in produzione, esegui `npm run build` in `frontend` e configura il backend per servire i file statici da `frontend/dist`.

## Features

- **Home**: Introductory hub that onboards newcomers with curated guides and quick links to every lore section.
- **Percorsi**: Filterable grid of 22 Beyonder paths, with detail pages showing sequence pyramids.
- **Personaggi**: Character dossiers grouped into Tarot Club Members, Villains, Relevant Characters, Gods, and Outer Gods with roles, aliases, and sequence insights.
- **Community**: Participate in discussion threads with replies and lightweight like/dislike reactions.

## Development Roadmap

- [x] Scaffold Vue SPA and Express API
- [ ] Implement authentication (future)
- [ ] Add caching for frequent lore requests
- [ ] Enhance accessibility audits and automated end-to-end tests

## License

Educational project scaffolding. Customize as needed for coursework or personal experiments.
