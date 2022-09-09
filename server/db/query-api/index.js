const db = require('../db');
const userQueries = require('./users');
const addressQueries = require('./addresses');
const productQueries = require('./products');
const categoryQueries = require('./categories');
const wishlistQueries = require('./wishlist');
const reviewQueries = require('./reviews');

module.exports = {
    UserQ: userQueries(db),
    AddrQ: addressQueries(db),
    ProdQ: productQueries(db),
    CatQ: categoryQueries(db),
    WishQ: wishlistQueries(db),
    RevQ: reviewQueries(db),
}