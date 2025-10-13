# Lord of the Mysteries SPA

Frontend costruito con **Vue 3 + Vite** per esplorare percorsi e personaggi dell universo Lord of the Mysteries.

## Script npm

| Script | Descrizione |
| --- | --- |
| `npm run dev` | Avvia l environment di sviluppo Vite |
| `npm run build` | Compila la SPA per la produzione |
| `npm run preview` | Avvia un server locale per la build prod |
| `npm run lint` | Verifica lo stile del codice con ESLint |

## Struttura Principale

```
src/
  App.vue
  main.js
  assets/
    characters/
    illustrations/
  router/
  views/
  components/
  services/
  styles/
```

## Feature Chiave

- Routing dinamico con Vue Router
- Componenti riutilizzabili per carte, filtri e layout
- Fetch dei dati tramite Axios (`src/services/api.js`)
- Stile steampunk/vittoriano con Bootstrap 5 e LESS
- Form per salvare Appunti investigativi (integrazione CRUD con backend)

## Configurazione Proxy

Durante lo sviluppo l API Express è raggiunta tramite il proxy definito in `vite.config.js` (`/api -> http://localhost:3000`).
