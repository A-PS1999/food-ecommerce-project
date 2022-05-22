const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const dbMode = 
   process.env.NODE_ENV === 'development' ? {
    client: "pg",
    connection: {
      host: '127.0.0.1',
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      charset: 'utf8'
    },
    migrations: {
      directory: './server/db/migrations',
      tableName: "knex_migrations"
    },
    seeds: {
      directory: './server/db/seeds'
    },
  } : {
    client: "pg",
    connection: process.env.DATABASE_URL,
    ssl: { require: true }
}

module.exports = dbMode;