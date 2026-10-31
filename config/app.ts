import env from '@adonisjs/core/services/env'

const config = {
  app: env.get('APP_NAME', 'Adonis React Vite'),
  appKey: env.get('APP_KEY'),
  secret: env.get('APP_SECRET'),
  environment: env.get('NODE_ENV', 'development'),
  urls: {
    app: env.get('APP_URL', 'http://localhost:3333'),
  },
}

export default config