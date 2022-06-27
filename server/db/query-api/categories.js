const categoriesNoPagination = db => () => {
    return db("product_categories").select(['id', 'cat_name']);
}

const getCategories = db => (offset, perPage) => {
    const categories = db("product_categories")
        .select('pc.id', 'pc.cat_name', 'pc.parent_id', db.raw('ARRAY_AGG(ch.id) as children'))
        .from({ pc: 'product_categories' })
        .leftJoin({ ch: 'product_categories' }, 'ch.parent_id', '=', 'pc.id')
        .groupBy('pc.id')
        .limit(perPage)
        .offset(offset)
    const total = db("product_categories").select(db.raw("count(id) as total"))
    return Promise.all([categories, total])
}

const addCategory = db => async (data) => {
    if (data.category != "") {
        return db("product_categories").insert({
            cat_name: data.cat_name,
            parent_id: data.category
        })
    } else {
        return db("product_categories").insert({
            cat_name: data.cat_name
        })
    }
}

const deleteCategory = db => (id) => {
    return db("product_categories").where('id', id).del();
}

module.exports = db => ({
    categoriesNoPagination: categoriesNoPagination(db),
    getCategories: getCategories(db),
    addCategory: addCategory(db),
    deleteCategory: deleteCategory(db),
})