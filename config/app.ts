const config = {
  appKey: process.env.APP_KEY,
  secret: process.env.APP_SECRET,
  orm: {
    default: 'pg',
    connections: {
      pg: {
        client: 'pg',
        connection: {
          host: process.env.PG_HOST,
          port: Number(process.env.PG_PORT),
          user: process.env.PG_USER,
          password: process.env.PG_PASSWORD,
          database: process.env.PG_DB_NAME,
        },
        pool: { min: 0, max: 10 },
        healthCheck: false,
        debug: false,
      },
    },
  },
  session: {
    driver: 'cookie',
    appName: 'adonis-react-vite',
    clearWithBrowser: true,
    age: '2 hours',
  },
};

export default config;
