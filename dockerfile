FROM node:22-alpine

# Imposta la working directory
WORKDIR /app

# Copia package.json e package-lock.json per installare le dipendenze prima del codice
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto dei file del progetto
COPY . .

# Compila TypeScript in JavaScript
RUN npm run build

# Espone la porta dell'applicazione
EXPOSE 3000

# Comando di avvio del server
CMD ["npm", "start"]
