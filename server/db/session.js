const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });
const express_session = require('express-session');
const pgSession = require('connect-pg-simple')(express_session);

const theSecret = process.env.SESSION_SECRET;

const session = express_session({
    store: new pgSession({ tableName: 'sessions' }),
    secret: theSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
})

module.exports = session;