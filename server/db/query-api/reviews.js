const addNewReview = db => async (reviewData) => {
    return db("reviews").insert({ 
        rating: reviewData.rating, 
        review_body: reviewData.review,
        product_id: reviewData.productId,
        user_id: reviewData.userId
    })
}

module.exports = db => ({
    addNewReview: addNewReview(db),
})