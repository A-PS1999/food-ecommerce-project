const getAllProducts = db => async (perPage, offset) => {
    const products = db("products").select('products.*', 'product_images.image_url')
        .leftJoin('product_images', function() {
            this
                .on('products.id', '=', 'product_images.product_id')
        })
        .orderBy('id', 'asc')
        .limit(perPage)
        .offset(offset)
    const total = db("products").select(db.raw('count(id) as total'))
    return Promise.all([products, total]);
}

module.exports = db => ({
    getAllProducts: getAllProducts(db),
})