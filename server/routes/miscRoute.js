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

module.exports = router;