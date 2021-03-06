const db = require('../db');
const userQueries = require('./users');
const productQueries = require('./products');
const categoryQueries = require('./categories');
const wishlistQueries = require('./wishlist');

module.exports = {
    UserQ: userQueries(db),
    ProdQ: productQueries(db),
    CatQ: categoryQueries(db),
    WishQ: wishlistQueries(db),
}