# Employee Madness

<p align="center">
  <img alt="Employee Madness" src="https://github.com/florinbighiu/the-employee-madness/assets/120215264/f0ed46cf-0bb6-45fe-88ee-972a716914f5" width="1250" height="500" title="Employee Madness">
</p>

A full-stack employee and equipment management app. Browse the employee
roster, filter and sort it, create and edit records, flag employees as
**missing**, randomize their height, and keep an inventory of equipment.

## Tech stack

- **Client:** React 18 (Create React App), React Router, plain CSS
- **Server:** Node.js, Express, Mongoose
- **Database:** MongoDB (local or MongoDB Atlas)

## Project structure

```text
the-employee-madness/
├── client/   # React frontend
└── server/   # Express + MongoDB API
```

## Prerequisites

- **Node.js 20.10+** (the seed script uses JSON import attributes —
  `import ... with { type: "json" }` — which need a recent Node release)
- A MongoDB connection string (a free [MongoDB Atlas](https://www.mongodb.com/atlas)
  cluster works well)

## Getting started

### 1. Server

```bash
cd server
npm install
```

Create the environment file and add your MongoDB connection string:

```bash
cp .env.sample .env
```

Then edit `.env`:

```ini
# Local example:  mongodb://127.0.0.1:27017/employee-madness
# Atlas example:  mongodb+srv://<user>:<password>@<cluster>.mongodb.net/employee-madness
MONGO_URL=your-connection-string-here
PORT=8080
```

Seed the database with starter employees:

```bash
npm run populate
```

Start the API (with nodemon, restarts on file changes):

```bash
npm run dev
```

The API listens on `http://localhost:8080`.

> **Tip:** if `mongodb+srv://` fails with a DNS `querySrv ECONNREFUSED`
> error in your environment, use the non-SRV form of the connection
> string instead — `mongodb://host1,host2,host3/db?ssl=true&replicaSet=...&authSource=admin`.
> Atlas shows this under "Connect → Drivers → Node.js (older versions)".

### 2. Client

```bash
cd client
npm install
npm start
```

The frontend runs on `http://localhost:3000`.

#### Proxy

The client proxies API requests to the server via the `proxy` field in
`client/package.json` (default `http://localhost:8080`). If you change the
server's port, update that field to match.

## API reference

| Method   | Route                  | Description                          |
| -------- | ---------------------- | ------------------------------------ |
| `GET`    | `/api/employees`       | List all employees (newest first)    |
| `GET`    | `/api/employees/:id`   | Get a single employee                |
| `POST`   | `/api/employees`       | Create an employee                   |
| `PATCH`  | `/api/employees/:id`   | Update an employee                   |
| `DELETE` | `/api/employees/:id`   | Delete an employee                   |
| `GET`    | `/api/equipment`       | List all equipment                   |
| `POST`   | `/api/equipment`       | Create an equipment item             |
| `DELETE` | `/api/equipment/:id`   | Delete an equipment item             |
| `GET`    | `/employees/:search`   | Search employees by name (regex)     |

## Available scripts

**Server** (`/server`)

- `npm run dev` — start the API with nodemon
- `npm start` — start the API with node
- `npm run populate` — seed the database with sample employees
- `npm run format` — format with Prettier

**Client** (`/client`)

- `npm start` — start the dev server
- `npm run build` — production build
- `npm test` — run tests
- `npm run format` — format with Prettier
