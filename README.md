# To-Do List API

> Project URL: [To-Do List API](https://roadmap.sh/projects/todo-list-api)

Questa API consente di gestire un'applicazione To-Do List, permettendo di:

- Creare un utente, effettuare il login con credenziali valide e generare un **token** per l'autenticazione.
- Creare, eliminare, leggere e aggiornare attività per un utente autenticato.

## Tecnologie Utilizzate

- **Autenticazione**: JSON Web Token (JWT)
- **Logging**: Morgan
- **Validazione Input**: Joi
- **Backend**: Node.js con Express.js
- **Database**: MongoDB
- **Linguaggio**: TypeScript (ES6)
- **Containerizzazione**: Docker

## Tabella dei Contenuti

- [Installazione](#installazione)
- [Utilizzo](#utilizzo)
- [Configurazione con Docker](#configurazione-con-docker)
- [API Endpoints](#api-endpoints)

## Installazione

Eseguire i seguenti comandi per clonare il repository e installare le dipendenze:

```bash
git clone https://github.com/Simone-Martino/ToDo.git
cd ToDo
npm install
```

## Utilizzo

### Configurazione

Usare il file `example.env` come riferimento per configurare le variabili d'ambiente in `.env`.

### Comandi di Avvio

Modalità sviluppo:

```bash
npm run dev
```

Avvio del server in produzione:

```bash
npm run build
npm start
```

## Configurazione con Docker

### Requisiti

- Docker installato sul sistema

### Build dell'Immagine

Eseguire il comando seguente per costruire l'immagine Docker:

```bash
docker build -t todo-api .
```

### Avvio del Container

```bash
docker run -d -p 3000:3000 --env-file .env --name todo-api todo-api
```

Il server sarà accessibile su `http://localhost:3000`.

### Stop e Rimozione del Container

```bash
docker stop todo-api
docker rm todo-api
```

## API Endpoints

### Task Management

- `POST /create` - Crea una nuova attività
- `PUT /edit` - Modifica un'attività esistente
- `GET /get` - Recupera una singola attività
- `GET /getAll` - Recupera tutte le attività dell'utente
- `DELETE /remove` - Elimina un'attività
- `DELETE /removeAll` - Elimina tutte le attività dell'utente

### User Management

- `POST /create` - Registra un nuovo utente
- `POST /login` - Effettua il login e restituisce un token JWT
- `PUT /edit` - Modifica i dati dell'utente
- `DELETE /delete` - Elimina l'utente
