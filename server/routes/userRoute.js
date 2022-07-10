const router = require('express').Router();

const { UserQ } = require('../db/query-api');

router.get('/api/user/simple-wishlist/:userId/:limit', async (req, res) => {
    const { userId, limit } = req.params;
    await UserQ.getSimpleUserWishlist(userId, limit).then((wishlist) => {
        return res.json({ wishlist })
    })
    .catch((error) => {
        console.log(error);
        res.status(400).send(`An error occurred when fetching the wishlist for user ${userId}`);
    })
})

module.exports = router;