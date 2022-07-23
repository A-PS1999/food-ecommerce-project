const router = require('express').Router();

const { WishQ } = require('../db/query-api');

router.post('/api/user/:userId/add-to-wishlist', async (req, res) => {
    const { userId } = req.params;
    const { productId } = req.body;

    await WishQ.addToWishlist(userId, productId).then((response) => {
        return res.json({ response });
    })
    .catch((error) => {
        console.log(error);
        res.status(400).send(`An error occured while trying to add product ID ${productId} to user ${userId}`);
    })
})

router.get('/api/user/simple-wishlist/:userId/:limit', async (req, res) => {
    const { userId, limit } = req.params;
    await WishQ.getSimpleUserWishlist(userId, limit).then((wishlist) => {
        return res.json({ wishlist })
    })
    .catch((error) => {
        console.log(error);
        res.status(400).send(`An error occurred when fetching the wishlist for user ${userId}`);
    })
})

module.exports = router;