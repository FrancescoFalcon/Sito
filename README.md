# Lord of the Mysteries Explorer

> **🚀 Live Demo:** [https://sito-l3xz.onrender.com](https://sito-l3xz.onrender.com)

Un'applicazione web interattiva dedicata all'universo di "Lord of the Mysteries". Il progetto permette di esplorare i percorsi (Pathways), i personaggi, le divinità e include una sezione community per discussioni tra utenti.

## 🚀 Funzionalità

- **Esplorazione Percorsi (Pathways):** Visualizzazione dettagliata delle sequenze, abilità e simbolismo.
- **Database Personaggi:** Schede dettagliate dei personaggi con filtri per categoria.
- **Community:** Sistema di thread e risposte per discutere del lore (richiede autenticazione).
- **Autenticazione:** Registrazione e Login utenti tramite JWT.
- **Design Responsivo:** Interfaccia moderna realizzata con Vue 3 e Bootstrap, tematizzata con Less.

## 🛠 Tech Stack e Scelte Progettuali

### Frontend
- **Vue 3 (Composition API):** Scelto per la sua reattività performante e la modularità del codice. La Composition API permette una migliore organizzazione della logica rispetto alla Options API, facilitando la manutenzione di componenti complessi come le schede dei personaggi.
- **Vite:** Utilizzato come build tool per la sua velocità estrema e l'Hot Module Replacement (HMR) istantaneo, che migliora drasticamente l'esperienza di sviluppo rispetto a Webpack.
- **Bootstrap 5 & Less:** Bootstrap fornisce una griglia responsiva solida e componenti pronti all'uso, mentre Less permette una personalizzazione avanzata (variabili, mixin) per ottenere l'estetica "Dark Fantasy" specifica del progetto senza dover riscrivere tutto il CSS da zero.
- **Axios:** Client HTTP basato su promise, scelto per la sua semplicità nella gestione delle richieste API e degli interceptor per l'autenticazione JWT.

### Backend
- **Node.js & Express:** Un'architettura non bloccante e orientata agli eventi, ideale per gestire le richieste concorrenti di una Single Page Application. Express offre un framework minimalista ma robusto per strutturare le API RESTful in modo pulito.
- **MongoDB & Mongoose:** Database NoSQL scelto per la sua flessibilità nella gestione di dati non strutturati (come i dettagli complessi del lore) e per la sua natura JSON-like, che si mappa perfettamente sugli oggetti JavaScript del backend.
- **JWT (JSON Web Tokens) & Bcrypt:** L'autenticazione stateless tramite JWT garantisce scalabilità e sicurezza senza la necessità di gestire sessioni lato server. Bcrypt assicura che le password siano hashate in modo sicuro prima di essere salvate.
- **Helmet & CORS:** Middleware essenziali per la sicurezza, proteggono l'applicazione impostando header HTTP appropriati e gestendo le origini consentite.

### DevOps & Deployment
- **Docker:** Garantisce la coerenza tra l'ambiente di sviluppo e quello di produzione, eliminando i problemi di compatibilità ("funziona sulla mia macchina"). L'uso di multi-stage builds ottimizza le dimensioni dell'immagine finale.
- **Render:** Piattaforma scelta per la sua integrazione nativa con GitHub e il supporto diretto ai container Docker, semplificando il processo di CI/CD e deployment automatico.

## 📂 Struttura del Progetto

```
sito/
├── backend/                # Backend Express e root del build context
│   ├── src/                # Codice sorgente backend
│   │   ├── controllers/    # Logica di business
│   │   ├── models/         # Schemi Mongoose
│   │   ├── routes/         # Definizioni API
│   │   ├── data/           # Dati statici per il seeding
│   │   └── scripts/        # Script di utilità (es. seed.js)
│   ├── frontend/           # Codice sorgente Frontend Vue
│   │   ├── src/            # Componenti, Views, Stores
│   │   └── dist/           # Build di produzione del frontend
│   ├── Dockerfile          # Configurazione build Docker
│   └── package.json        # Dipendenze Backend
├── docker-compose.yml      # Orchestrazione locale con Docker
└── render.yaml             # Configurazione Infrastructure as Code per Render
```

## ⚙️ Prerequisiti

- **Node.js** (v18+)
- **MongoDB** (Locale o Atlas)
- **Docker Desktop** (Opzionale, per esecuzione containerizzata)

## 🚀 Installazione e Avvio

### Opzione A: Docker (Consigliata)

Il metodo più semplice per avviare l'intero stack (Backend + Frontend + Database).

1.  Assicurati di avere Docker avviato.
2.  Crea un file `.env` in `backend/` (vedi sezione Variabili d'Ambiente).
3.  Esegui il comando dalla root `sito/`:
    ```bash
    docker compose up --build
    ```
4.  L'applicazione sarà accessibile su `http://localhost:3000`.

### Opzione B: Sviluppo Manuale

Se vuoi sviluppare frontend e backend separatamente.

#### 1. Setup Backend

```bash
cd backend
npm install
```

Crea il file `.env` e popola il database:
```bash
npm run seed
```

Avvia il server:
```bash
npm run dev
```
Il backend girerà su `http://localhost:3000`.

#### 2. Setup Frontend

In un nuovo terminale:
```bash
cd backend/frontend
npm install
npm run dev
```
Il frontend girerà su `http://localhost:5173` (o altra porta indicata da Vite).

## 🔑 Variabili d'Ambiente

Crea un file `.env` nella cartella `backend/` con i valori base e scegli la stringa `MONGODB_URI` in base all'ambiente:

```dotenv
PORT=3000
MONGODB_URI=mongodb://localhost:27017/lotm
CLIENT_ORIGIN=http://localhost:5173,http://localhost:3000
JWT_SECRET=tua-chiave-segreta-super-sicura
NODE_ENV=development
```

Se avvii tutto tramite Docker (frontend servito dallo stesso container) imposta invece:

```dotenv
CLIENT_ORIGIN=http://localhost:3000,https://sito-l3xz.onrender.com
```

Se usi MongoDB Atlas sostituisci la riga `MONGODB_URI` con la stringa del tuo cluster assicurandoti di specificare il nome del database:

```dotenv
MONGODB_URI=mongodb+srv://<utente>:<password>@cluster0.wsoop9p.mongodb.net/lotm?retryWrites=true&w=majority&appName=Cluster0
```

## 💾 Seeding del Database

Per popolare il database con i dati iniziali (Percorsi, Personaggi, Thread di esempio):

```bash
cd backend
npm run seed
```
*Nota: Questo comando cancella i dati esistenti nelle collezioni interessate.*

## 🌍 Deployment su Render

Il progetto è configurato per il deployment automatico su Render tramite Docker.

1.  Collega il repository GitHub a Render.
2.  Render rileverà il file `render.yaml` o il `Dockerfile`.
3.  Imposta le variabili d'ambiente nella dashboard di Render:
    - `MONGODB_URI`: La tua stringa di connessione Atlas (es. `mongodb+srv://user:pass@cluster.mongodb.net/lotm?appName=Cluster0`). **Importante:** specifica il nome del database (es. `/lotm`).
    - `JWT_SECRET`: Una stringa casuale sicura.
    - `CLIENT_ORIGIN`: L'URL del tuo sito su Render (es. `https://tuo-sito.onrender.com`).
    - `NODE_ENV`: `production`.

## 📡 API Endpoints Principali

- `GET /api/paths` - Lista di tutti i percorsi.
- `GET /api/characters` - Lista dei personaggi.
- `GET /api/community/threads` - Lista delle discussioni.
- `POST /api/auth/login` - Login utente.
- `POST /api/auth/register` - Registrazione utente.
