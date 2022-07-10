const router = require('express').Router();

const { ProdQ } = require('../db/query-api');

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

module.exports = router;