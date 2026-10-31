import { defineConfig } from '@adonisjs/lucid'

const databaseConfig = defineConfig({
  connection: 'pg',
  connections: {
    pg: {
      client: 'pg',
      connection: {
        host: process.env.PG_HOST ?? 'localhost',
        port: Number(process.env.PG_PORT ?? '5432'),
        user: process.env.PG_USER ?? 'postgres',
        password: process.env.PG_PASSWORD ?? 'postgres',
        database: process.env.PG_DB_NAME ?? 'adonis_react_vite',
      },
      pool: {
        min: Number(process.env.PG_POOL_MIN ?? '0'),
        max: Number(process.env.PG_POOL_MAX ?? '10'),
      },
      debug: process.env.DB_DEBUG === 'true',
    },
  },
})

export default databaseConfig