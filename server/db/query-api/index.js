const db = require('../db');
const userQueries = require('./users');

module.exports = {
    UserQ: userQueries(db)
}