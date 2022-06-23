const categoriesNoPagination = db => () => {
    return db("product_categories").select(['id', 'cat_name']);
}

module.exports = db => ({
    categoriesNoPagination: categoriesNoPagination(db),
})