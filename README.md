# adonis-react-vite

Fullstack starter: **AdonisJS 6 + Vite + React 19 + TypeScript + Tailwind CSS**.

Successor to the archived [adonis-mix-react](https://github.com/michaelmcshinsky/adonis-mix-react) (Adonis 5 preview + Laravel Mix), which accompanies the Medium article [Build a Fullstack App with Adonis and React](https://medium.com/swlh/build-a-fullstack-app-with-adonis-and-react-1cfc88a436c0). This repo is the modern equivalent: Adonis 6, Vite-native asset pipeline, React 19, and TypeScript throughout.

## Stack

| Layer | Choice |
| --- | --- |
| Backend | AdonisJS 6 (ESM, Lucid ORM, Vine validation) |
| Assets | `@adonisjs/vite` + Vite 6 + `@vitejs/plugin-react` |
| UI | React 19 + TypeScript |
| Styling | Tailwind CSS 3 (PostCSS) |
| Database | PostgreSQL (Lucid) |
| Tests | Vitest (unit) + Japa (functional) |

## Project layout

```
app/
  controllers/   # HTTP controllers (health, todos)
  models/        # Lucid models (Todo)
  providers/     # App service provider
  validators/    # Vine validation schemas
config/          # Adonis config (app, database, vite)
database/
  migrations/    # Schema migrations
  seeders/       # Demo seed data
resources/
  js/            # React app (Vite entry)
    components/  # React components
    lib/         # API client, utilities
  views/         # Edge template mounting the SPA
start/           # routes, kernel
tests/
  functional/    # Japa functional tests
types/           # TypeScript module augmentations
```

## Quick start

```bash
cp .env.example .env
npm run key:generate   # sets APP_KEY in .env
npm install
npm run migrate        # create the database tables
npm run seed           # optional demo todos
npm run dev
```

Server runs at http://localhost:3333 with HMR for both Adonis and the React app.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Adonis dev server with HMR |
| `npm run build` | Production build (server + Vite assets) |
| `npm start` | Run the production build |
| `npm test` | Vitest unit/structural tests |
| `npm run test:functional` | Japa functional tests (requires database) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run migrate` | Run database migrations |
| `npm run migrate:rollback` | Rollback last migration batch |
| `npm run seed` | Seed demo data |
| `npm run key:generate` | Generate APP_KEY |

## API

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/health` | Health check |
| GET | `/api/todos` | List todos |
| POST | `/api/todos` | Create todo (`{ title }`) |
| DELETE | `/api/todos/:id` | Delete todo |

POST validation rules (VineJS):
- `title`: required, trimmed string, 1-200 characters

## Why this exists

The original companion repo locked readers into EOL software (Adonis 5 preview RC, Laravel Mix, Tailwind postcss7-compat). This starter keeps the same fullstack-React-in-one-repo teaching shape while using currently supported, Vite-first tooling.

## License

MIT