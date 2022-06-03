const path = require('path');
const knex = require('./db');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env.development') });
const express_session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(express_session);

const theSecret = process.env.VITE_SESSION_SECRET;

const store = new KnexSessionStore({
    knex,
    tablename: 'sessions',
});

const session = express_session({
    store: store,
    secret: theSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
})

module.exports = session;