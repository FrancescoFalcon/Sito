# Lord of the Mysteries Explorer

> **🚀 Live Demo:** [https://sito-l3xz.onrender.com](https://sito-l3xz.onrender.com)

Un'applicazione web interattiva dedicata all'universo di "Lord of the Mysteries". Il progetto permette di esplorare i percorsi (Pathways), i personaggi, le divinità e include una sezione community per discussioni tra utenti.

## 🚀 Funzionalità

- **Esplorazione Percorsi (Pathways):** Visualizzazione dettagliata delle sequenze, abilità e simbolismo.
- **Database Personaggi:** Schede dettagliate dei personaggi con filtri per categoria.
- **Community:** Sistema di thread e risposte per discutere del lore (richiede autenticazione).
- **Autenticazione:** Registrazione e Login utenti tramite JWT.
- **Design Responsivo:** Interfaccia moderna realizzata con Vue 3 e Bootstrap, tematizzata con Less.

## 🛠 Tech Stack

### Frontend
- **Framework:** Vue 3 (Composition API)
- **Build Tool:** Vite
- **Routing:** Vue Router
- **Styling:** Bootstrap 5, Less
- **HTTP Client:** Axios

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (con Mongoose ODM)
- **Autenticazione:** JSON Web Tokens (JWT) & Bcrypt
- **Sicurezza:** Helmet, CORS

### DevOps & Deployment
- **Container:** Docker (Multi-stage build)
- **Orchestration:** Docker Compose
- **Hosting:** Render

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
3.  Esegui il comando:
    ```bash
    docker-compose up --build
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

Crea un file `.env` nella cartella `backend/` con il seguente contenuto:

```dotenv
PORT=3000
# Usa la stringa di connessione locale o quella di Atlas
MONGODB_URI=mongodb://localhost:27017/lotm
# URL del frontend (per CORS)
CLIENT_ORIGIN=http://localhost:5173,http://localhost:3000
# Segreto per firmare i token JWT
JWT_SECRET=tua-chiave-segreta-super-sicura
# Imposta a 'production' per servire i file statici del frontend
NODE_ENV=development
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
