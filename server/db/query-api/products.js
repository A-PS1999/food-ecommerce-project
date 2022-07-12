const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');

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

const deleteProduct = db => async (id) => {
    const imgToDelete = await db("product_images").select('image_name').where('id', id);
    cloudinary.uploader.destroy(imgToDelete[0].image_name, function (err, result) { 
        if (err) {
            console.log(err);
        }
        console.log(result)
     })
    return db('products').where('id', id).del();
}

const addProduct = db => async (formData, files) => {
    function createUploadStream(readStream) {
        return new Promise((resolve, reject) => {
            readStream.pipe(
                cloudinary.uploader.upload_stream({ folder: 'product-images' }, (err, result) => {
                    if (err) {
                        reject(err)
                    }
                    resolve({ url: result.secure_url, name: result.public_id })
                })
            )
        })
    }
    const new_product = await db("products").returning(['id']).insert({
        prod_name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        stock: Number(formData.stock),
        category_id: Number(formData.category)
    })
    const results = await Promise.all(files.map(async (file) => await createUploadStream(Readable.from(file.buffer))));
    if (results && results.length > 0) {
        for (let i = 0; i < results.length; i++) {
            await db('product_images').insert({ image_url: results[i].url, image_name: results[i].name, product_id: new_product[0].id })
        }
    }
}

const getProduct = db => async (productId) => {
    return db("products").select('products.*', 'product_images.image_url', 'product_categories.cat_name')
        .leftJoin("product_images", "products.id", "product_images.product_id")
        .leftJoin("product_categories", "products.category_id", "product_categories.id")
        .where("products.id", productId)
}

// NOTE: Below query can be very slow on large datasets, but for my purposes works fine.
const getRandomProducts = db => async (limit) => {
    return db("products").select('products.id', 'product_images.image_url')
        .leftJoin('product_images', function () {
            this
                .on('products.id', '=', 'product_images.product_id')
        })
        .orderByRaw('random()')
        .limit(limit)
}

// Similar to above but is far less random on small datasets due to clustering.
// Written entirely as raw query due to lack of Knex query builder support for TABLESAMPLE
const getProductSample = db => async (sampleSize, categoryId) => {
    return db.raw(
        `SELECT products.id, products.prod_name, product_images.image_url
         FROM products
         TABLESAMPLE SYSTEM_ROWS(${sampleSize})
         LEFT JOIN product_images ON products.id = product_images.product_id
         WHERE products.category_id = ${categoryId}
        `
    )
}

module.exports = db => ({
    getAllProducts: getAllProducts(db),
    deleteProduct: deleteProduct(db),
    addProduct: addProduct(db),
    getProduct: getProduct(db),
    getRandomProducts: getRandomProducts(db),
    getProductSample: getProductSample(db),
})