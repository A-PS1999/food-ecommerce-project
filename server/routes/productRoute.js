const router = require('express').Router();

const { ProdQ, RevQ } = require('../db/query-api');

router.get('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    await ProdQ.getProduct(id)
        .then((product) => {
            return res.json({ product: product[0] })
        })
        .catch((error) => {
            console.log(error)
            res.status(400).send(`An error occured when fetching product ID ${id}`)
        })
})

router.get('/api/get-random-products/:num', async (req, res) => {
    const { num } = req.params;
    await ProdQ.getRandomProducts(num)
        .then((items) => {
            return res.json({ items })
        })
        .catch((error) => {
            console.log(error)
            res.status(400).send("An error occured when fetching the random products")
        })
})

router.get('/api/get-product-sample/:catId/:num', async (req, res) => {
    const { catId, num } = req.params;
    await ProdQ.getProductSample(num, catId)
        .then((items) => {
            return res.json({ items: items.rows })
        })
        .catch((error) => {
            console.log(error)
            res.status(400).send("An error occured when fetching the product sample")
        })
})

router.get('/api/get-product-reviews-sample/:productId/:num', async (req, res) => {
    const { productId, num } = req.params;
    await RevQ.getProductReviewSample(productId, num)
        .then((reviews) => {
            return res.json({ reviews: reviews.rows })
        })
        .catch((error) => {
            console.log(error);
            res.status(400).send(`An error occurred when fetching a sample of reviews for product ID ${productId}`)
        })
})

module.exports = router;