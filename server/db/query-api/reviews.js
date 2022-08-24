const addNewReview = db => async (reviewData) => {
    return db("reviews").insert({ 
        rating: reviewData.rating, 
        review_body: reviewData.review,
        product_id: reviewData.productId,
        user_id: reviewData.userId
    })
}

const deleteReview = db => async (id) => {
    return db("reviews").where('id', id).del();
}

const updateReview = db => async (id, rating, body) => {
    return db("reviews").where('id', id).update({ rating: rating, review_body: body });
}

const getPaginatedUserReviews = db => async (userId, perPage, offset) => {
    const reviews = db("reviews")
        .where('reviews.user_id', userId)
        .select('reviews.rating', 'reviews.review_body', 'products.id', 'products.prod_name', 'product_images.image_url')
        .leftJoin('products', 'reviews.product_id', 'products.id')
        .leftJoin('product_images', 'reviews.product_id', 'product_images.product_id')
        .limit(perPage)
        .offset(offset)
    const total = db.raw(`SELECT count(id) AS total FROM reviews WHERE reviews.user_id = ${userId}`); // This query seems to result in a syntax error
    return Promise.all([reviews, total]);                                                             // when not done with .raw()
}

const getProductReviewSample = db => async (productId, sampleSize) => {
    return db.raw(
        `SELECT reviews.*, users.name 
        FROM reviews
        TABLESAMPLE SYSTEM_ROWS(${sampleSize})
        LEFT JOIN users ON reviews.user_id = users.id
        WHERE reviews.product_id = ${productId}
        `
    )
}

const getPaginatedProductReviews = db => async (productId, perPage, offset) => {
    const reviews = db("reviews")
        .where('reviews.product_id', productId)
        .select('reviews.id', 'reviews.rating', 'reviews.updated_at', 'reviews.review_body', 'users.name')
        .leftJoin('users', 'reviews.user_id', 'users.id')
        .limit(perPage)
        .offset(offset);
    const total = db.raw(`SELECT count(id) AS total FROM reviews WHERE reviews.product_id = ${productId}`);
    return Promise.all([reviews, total]);
}

module.exports = db => ({
    addNewReview: addNewReview(db),
    deleteReview: deleteReview(db),
    updateReview: updateReview(db),
    getPaginatedUserReviews: getPaginatedUserReviews(db),
    getProductReviewSample: getProductReviewSample(db),
    getPaginatedProductReviews: getPaginatedProductReviews(db),
})