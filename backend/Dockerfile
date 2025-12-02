# --- Stage 1: Build del Frontend ---
FROM node:18-slim as frontend-build
# Impostiamo la directory di lavoro per il frontend
WORKDIR /app/frontend
# Copiamo i file di dipendenze del frontend
# Nota: il contesto è la root, quindi il path è 'backend/frontend/'
COPY backend/frontend/package*.json ./
# Installiamo le dipendenze del frontend
RUN npm install
# Copiamo tutto il codice sorgente del frontend
COPY backend/frontend/ .
# Eseguiamo la build (crea la cartella dist)
RUN npm run build
# --- Stage 2: Setup del Backend ---
FROM node:18-slim
# Impostiamo la directory di lavoro per il backend
WORKDIR /app/backend
# Copiamo i file di dipendenze del backend
COPY backend/package*.json ./
# Installiamo solo le dipendenze di produzione
RUN npm install --production
# Copiamo il codice sorgente del backend
COPY backend/src ./src
# Copiamo eventuali altri file necessari nella root del backend (es. config se fuori da src)
# COPY config ./config 
# Copiamo la build del frontend dallo stage precedente
# La struttura finale nel container sarà:
# /app/backend/src/server.js
# /app/frontend/dist
COPY --from=frontend-build /app/frontend/dist /app/frontend/dist
# Esponiamo la porta su cui gira il server
EXPOSE 3000
# Avviamo il server
CMD ["node", "src/server.js"]
