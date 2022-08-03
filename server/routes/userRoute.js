const router = require('express').Router();
const checkLoggedIn = require('./middleware/checkLoggedIn');

const { WishQ, RevQ } = require('../db/query-api');

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

router.get('/api/user/:userId/wishlist/:pageNum', checkLoggedIn, async (req, res) => {
    const { userId, pageNum } = req.params;
    const perPage = 15;
    const offset = ( pageNum - 1 ) * perPage;
    let paginationData = {};

    await WishQ.getPaginatedWishlist(userId, perPage, offset)
        .then(([wishlist, total]) => {
            paginationData.currentPage = Number(pageNum);
            paginationData.lastPage = Math.ceil(total[0].total / perPage);
            paginationData.totalItems = Number(total[0].total);
            res.json({ wishlist, paginationData })
        })
        .catch((error) => {
            console.log(error);
            res.status(400).send(`An error occured while fetching the wishlist for user ${userId}`);
        })
})

router.post('/api/user/:userId/wishlist/clear', checkLoggedIn, async (req, res) => {
    const { userId } = req.params;

    await WishQ.clearWishlist(userId)
        .then((_) => {
            return res.sendStatus(200);
        })
        .catch((error) => {
            console.log(error);
            res.status(400).send(`An error occured while deleting the wishlist of user ${userId}`);
        })
})

router.post('/api/user/:userId/wishlist/delete', checkLoggedIn, async (req, res) => {
    const { userId } = req.params;
    const { toDelete } = req.body;

    await WishQ.deleteFromWishlist(userId, toDelete)
        .then((_) => {
            return res.status(200).send("Item successfully deleted")
        })
        .catch((error) => {
            console.log(error);
            res.status(400).send(`An error occured while attempting to delete item ID ${toDelete} from the wishlist of user ${userId}`);
        })
})

router.post('/api/user/:userId/add-review/:productId', checkLoggedIn, async (req, res) => {
    const { userId, productId } = req.params;
    req.body.userId = userId;
    req.body.productId = productId;

    await RevQ.addNewReview(req.body).then((_) => {
        return res.status(200).send("Review successfully added");
    })
    .catch((error) => {
        console.log(error);
        res.status(400).send(`An error occurred when trying to add a review by user ${productId} for product ID ${productId}`);
    })
})

module.exports = router;