import env from '@adonisjs/core/services/env'
import { defineConfig } from '@adonisjs/lucid'

const databaseConfig = defineConfig({
  default: 'pg',
  connections: {
    pg: {
      client: 'pg',
      connection: {
        host: env.get('PG_HOST', 'localhost'),
        port: Number(env.get('PG_PORT', '5432')),
        user: env.get('PG_USER', 'postgres'),
        password: env.get('PG_PASSWORD', 'postgres'),
        database: env.get('PG_DB_NAME', 'adonis_react_vite'),
      },
      pool: {
        min: Number(env.get('PG_POOL_MIN', '0')),
        max: Number(env.get('PG_POOL_MAX', '10')),
      },
      healthCheck: env.get('DB_HEALTH_CHECK', false) === true,
      debug: env.get('DB_DEBUG', false) === true,
    },
  },
})

export default databaseConfig