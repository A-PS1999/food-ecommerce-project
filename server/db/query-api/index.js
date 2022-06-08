const db = require('../db');
const userQueries = require('./users');
const productQueries = require('./products');

module.exports = {
    UserQ: userQueries(db),
    ProdQ: productQueries(db),
}