const db = require('../db');
const userQueries = require('./users');
const productQueries = require('./products');
const categoryQueries = require('./categories');

module.exports = {
    UserQ: userQueries(db),
    ProdQ: productQueries(db),
    CatQ: categoryQueries(db),
}