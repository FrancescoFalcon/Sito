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

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- MongoDB connection string (Atlas or local)

### Backend Setup

```powershell
cd backend
npm install
cp .env.example .env   # or New-Item -Path .env -Value "..."
npm run seed           # optional: populate MongoDB with sample lore
npm run dev            # start API with nodemon
```

### Frontend Setup

```powershell
cd frontend
npm install
npm run dev
```

Visit the SPA at `http://localhost:5173` (default Vite port) and ensure the backend is available at `http://localhost:3000`.

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
