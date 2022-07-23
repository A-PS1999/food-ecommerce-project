const addToWishlist = db => async (userId, productId) => {
    const alreadyInWishlist = await db.raw(`SELECT EXISTS(SELECT 1 FROM wishlist WHERE user_id = ${userId} AND product_id = ${productId})`);
    if (!alreadyInWishlist.rows[0].exists) {
        return db('wishlist').insert({ user_id: userId, product_id: productId });
    }
    if (alreadyInWishlist.rows[0].exists) {
        return "Already exists";
    }
}

const getSimpleUserWishlist = db => (userId, limit) => {
    const wishlistQuery =  db("wishlist").where('wishlist.user_id', userId).select('*')
        .leftJoin("products", "products.id", "wishlist.product_id")
        .leftJoin("product_images", "product_images.product_id", "products.id")
    if (limit != null) {
        return wishlistQuery.limit(limit);
    }
    return wishlistQuery;
}

module.exports = db => ({
    addToWishlist: addToWishlist(db),
    getSimpleUserWishlist: getSimpleUserWishlist(db),
})