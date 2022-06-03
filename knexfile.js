const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env.development') });

const dbMode = 
   process.env.VITE_ENV === 'development' ? {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      user: process.env.VITE_DB_USER,
      password: process.env.VITE_DB_PASS,
      database: process.env.VITE_DB_NAME,
      charset: 'utf8'
    },
    migrations: {
      directory: './server/db/migrations',
      tableName: "knex_migrations"
    },
    seeds: {
      directory: './server/db/seeds'
    }
  } : {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: { require: true }
}

module.exports = dbMode;