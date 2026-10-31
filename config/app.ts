const config = {
  appKey: process.env.APP_KEY,
  secret: process.env.APP_SECRET,
  environment: process.env.NODE_ENV ?? 'development',
  urls: {
    app: process.env.APP_URL ?? 'http://localhost:3333',
  },
}

export default config