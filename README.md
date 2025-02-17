# To-Do List API
**Project URL:** [To-Do List API](http://localhost:PORTSimone-Martino/ToDo)

Questa API consente di gestire un'applicazione To-Do List, con funzionalità per:

- Creare un utente, effettuare il login con credenziali valide e generare un token per l'autenticazione.
- Gestire le attività di un utente autenticato: creazione, lettura, aggiornamento ed eliminazione.

---

## Tecnologie Utilizzate

- **Autenticazione:** JSON Web Token (JWT)
- **Logging:** Morgan
- **Validazione Input:** Joi
- **Backend:** Node.js con Express.js
- **Database:** MongoDB
- **Linguaggio:** TypeScript (ES6)
- **Containerizzazione:** Docker

---

## Tabella dei Contenuti

- [Installazione🛠️](#installazione🛠️)
- [Utilizzo⚙️](#utilizzo⚙️)
  - [Configurazione🛠️](#configurazione🛠️)
  - [Comandi di Avvio▶️](#comandi-di-avvio▶️)
- [Configurazione con Docker 🐳](#configurazione-con-docker🐳)
  - [Requisiti📋](#requisiti📋)
  - [Build dell'Immagine🖼️](#build-dellimmagine🖼️)
  - [Avvio del Container🚀](#avvio-del-container🚀)
  - [Stop e Rimozione del Container🛑](#stop-e-rimozione-del-container🛑)
- [API Endpoints 🌐](#api-endpoints🌐)
  - [Task Management](#task-Management-🔒)
  - [User Management](#user-management)

---

## Installazione🛠️

Eseguire i seguenti comandi per clonare il repository e installare le dipendenze:

```bash
git clone http://localhost:PORTSimone-Martino/ToDo.git
cd ToDo
```

Installa le dependencies:

##### ⚠️ in caso di sviluppo rimuovere `--production`

Se usi **npm**:

```bash
npm install --production
```

Se usi **yarn**:

```bash
yarn install --production
```

## Utilizzo⚙️

### Configurazione🛠️

Usare il file `example.env` come riferimento per configurare le variabili d'ambiente in `.env`.

### Comandi di Avvio▶️

#### Modalità sviluppo:

1. Avvia la modalità watch per il compilatore Typescript

```bash
npx tsc -w --noEmit
```

```bash
npm run dev
```

#### Avvio del server in produzione:

```bash
npm run build
npm start
```

## Configurazione con Docker 🐳

### Requisiti📋

- Docker installato sul sistema

### Build dell'Immagine🖼️

Eseguire il comando seguente per costruire l'immagine Docker:

```bash
docker build -t todo-api .
```

### Avvio del Container🚀

```bash
docker run -d -p 3000:3000 --env-file .env --name todo-api todo-api
```

Il server sarà accessibile su `http://localhost:3000`.

### Stop e Rimozione del Container🛑

```bash
docker stop todo-api
docker rm todo-api
```

## API Endpoints🌐

**⚠️ Gli endpoint con 🔒 richiedono un token JWT generato durante il login.**

### Task Management 🔒

**❗gli endopoint di task Management iniziano tutti con api/task/**

- **`POST /create`** - Crea una nuova attività<br>
  **Body:**

  ```json
  {
    "title": "Fare la spesa",
    "description": "Comprare frutta e verdura",
    "dueDate": "2023-12-31"
  }
  ```

  **Comando curl:**

  ```bash
  curl -X POST http://localhost:PORT/api/task/create   -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
      -H "Content-Type: application/json"     -d '{
      "title": "Fare la spesa",
      "description": "Comprare frutta e verdura",
      "dueDate": "2023-12-31"
    }'
  ```

- **`PUT /edit`** - Modifica un'attività esistente<br>

  ```json
  {
    "title": "Fare la spesa aggiornato",
    "description": "Comprare frutta, verdura e carne",
    "dueDate": "2024-01-15"
  }
  ```

  **Comando curl:**

  ```bash
  curl -X PUT http://localhost:PORT/api/task/edit   -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
  -H "Content-Type: application/json"     -d '{
      "title": "Fare la spesa aggiornato",
      "description": "Comprare frutta, verdura e carne",
      "dueDate": "2024-01-15"
    }'
  ```

- **`GET /get/:id`** - Recupera una singola attività<br>
  **Response** :

  ```json
  {
    "id": "12345",
    "title": "Fare la spesa",
    "description": "Comprare frutta e verdura",
    "dueDate": "2023-12-31",
    "completed": false
  }
  ```

  **Comando curl:**

  ```bash
  curl -X GET http://localhost:PORT/api/task/get/12345   -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
  ```

- **`GET /getAll`** - Recupera tutte le attività dell'utente<br>
  **Response** :

  ```json
  [
    {
      "id": "12345",
      "title": "Fare la spesa",
      "description": "Comprare frutta e verdura",
      "dueDate": "2023-12-31",
      "completed": false
    },
    {
      "id": "67890",
      "title": "Studiare TypeScript",
      "description": "Completare il capitolo 5",
      "dueDate": "2024-01-10",
      "completed": true
    }
  ]
  ```

  **Comando curl:**

  ```bash
  curl -X GET http://localhost:PORT/api/task/getAll   -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
  ```

- **`DELETE /remove/:id`** - Elimina un'attività<br>
  **Response:**

  ```json
  {
    "message": "Attività eliminata con successo"
  }
  ```

  **Comando curl:**

  ```bash
  curl -X DELETE http://localhost:PORT/api/task/remove/12345  -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
   -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
  ```

- **`DELETE /removeAll`** - Elimina tutte le attività dell'utente<br>
  **Response:**

  ```json
  {
    "message": "Tutte le attività sono state eliminate"
  }
  ```

  **Comando curl:**

  ```bash
  curl -X DELETE http://localhost:PORT/api/task/removeAll  -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
   -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
  ```

### User Management

**❗gli endopoint di task Management iniziano tutti con api/user/**

- **`POST /create`** - Registra un nuovo utente<br>
  **Body:**

  ```json
  {
    "name": "john",
    "email": "john@example.com",
    "password": "password123",
    "username": "john_doe"
  }
  ```

  **Comando curl:**

  ```bash
  curl -X POST http://localhost:PORT/api/user/create     -H "Content-Type: application/json"     -d '{
      "name": "john",
      "email": "john@example.com",
      "password": "password123",
      "username": "john_doe"
    }'
  ```

- **`POST /login`** - Effettua il login e restituisce un token JWT<br>
  **Body:**

  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

  **Response:**

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

  **Comando curl:**

  ```bash
  curl -X POST http://localhost:PORT/api/user/login     -H "Content-Type: application/json"     -d '{
      "email": "john@example.com",
      "password": "password123"
    }'
  ```

- `PUT /edit` 🔒 - Modifica i dati dell'utente<br>
  **Body:**

  ```json
  {
    "username": "john_doe_updated",
    "email": "john_new@example.com"
  }
  ```

  **Comando curl:**

  ```bash
  curl -X PUT http://localhost:PORT/api/user/edit     -H "Authorization: Bearer <YOUR_JWT_TOKEN>"     -H "Content-Type: application/json"     -d '{
      "username": "john_doe_updated",
      "email": "john_new@example.com"
    }'
  ```

- `DELETE /delete` 🔒 - Elimina l'utente

  ```json
  {
    "message": "Utente eliminato con successo"
  }
  ```

  **Comando curl:**

  ```bash
  curl -X DELETE http://localhost:PORT/api/user/delete     -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
  ```

## Miglioramenti Futuri

- Aggiungere la possibilità di categorizzare le attività (es. lavoro, casa, hobby).

- Implementare un sistema di notifiche per le scadenze delle attività.

- Aggiungere la paginazione per l'endpoint /getAll.

- Implementare il recupero della password e la verifica dell'email.

- implementare l'aggiunta di altri utenti ad una task
