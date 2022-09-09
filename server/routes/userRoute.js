const router = require('express').Router();
const checkLoggedIn = require('./middleware/checkLoggedIn');

const { WishQ, RevQ, AddrQ } = require('../db/query-api');

const defaultPerPage = 15;

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
    const offset = ( pageNum - 1 ) * defaultPerPage;
    let paginationData = {};

    await WishQ.getPaginatedWishlist(userId, defaultPerPage, offset)
        .then(([wishlist, total]) => {
            paginationData.currentPage = Number(pageNum);
            paginationData.lastPage = Math.ceil(total[0].total / defaultPerPage);
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

router.post('/api/user/:userId/reviews/delete', checkLoggedIn, async (req, res) => {
    const { toDelete } = req.body;

    await RevQ.deleteReview(toDelete)
        .then((_) => {
            return res.status(200).send("Review successfully deleted");
        })
        .catch((error) => {
            console.log(error);
            res.status(400).send(`An error occurred while trying to delete review ${toDelete}`);
        })
})

router.post('/api/user/:userId/reviews/:reviewId/update', checkLoggedIn, async (req, res) => {
    const { reviewId } = req.params;
    const { rating, body } = req.body;

    await RevQ.updateReview(reviewId, rating, body)
        .then((response) => {
            return res.json({ response });
        })
        .catch((error) => {
            console.log(error);
            res.status(400).send(`An error occurred while trying to update review ID ${reviewId}`);
        })
})

router.get('/api/user/:userId/reviews/:pageNum', checkLoggedIn, async (req, res) => {
    const { userId, pageNum } = req.params;
    const offset = ( pageNum - 1 ) * defaultPerPage;
    let paginationData = {};

    await RevQ.getPaginatedUserReviews(userId, defaultPerPage, offset)
        .then(([reviews, total]) => {
            paginationData.currentPage = Number(pageNum);
            paginationData.lastPage = Math.ceil(total.rows[0].total / defaultPerPage);
            paginationData.totalItems = Number(total.rows[0].total);
            res.json({ reviews, paginationData });
        })
        .catch((error) => {
            console.log(error);
            res.status(400).send(`An error occurred while fetching the reviews of user ${userId}`);
        })
})

router.post('/api/user/:userId/addresses/add', checkLoggedIn, async (req, res) => {
    const { userId } = req.params;
    const addressInfo = req.body;

    await AddrQ.addAddress(userId, addressInfo).then((_) => {
        return res.sendStatus(200);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(400);
    })
})

router.post('/api/user/:userId/addresses/:addressId/edit', checkLoggedIn, async (req, res) => {
    const { addressId } = req.params;
    const addressInfo = req.body;

    await AddrQ.updateAddress(addressId, addressInfo).then((_) => {
        return res.sendStatus(200);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(400);
    })
})

router.post('/api/user/:userId/addresses/delete', checkLoggedIn, async (req, res) => {
    const { toDelete } = req.body;

    await AddrQ.deleteAddress(toDelete)
        .then((_) => {
            return res.status(200).send("Address successfully deleted");
        })
        .catch((error) => {
            console.log(error);
            res.status(400).send(`An error occurred while trying to delete address ${toDelete}`);
        })
})

router.get('/api/user/:userId/addresses/:pageNum', checkLoggedIn, async (req, res) => {
    const { userId, pageNum } = req.params;
    const offset = ( pageNum - 1 ) * 6; // 6 as opposed to defaultPerPage, to display fewer per page
    let paginationData = {};

    await AddrQ.getPaginatedUserAddress(userId, 6, offset)
        .then(([addresses, total]) => {
            paginationData.currentPage = Number(pageNum);
            paginationData.lastPage = Math.ceil(total.rows[0].total / 6);
            paginationData.totalItems = Number(total.rows[0].total);
            res.json({ addresses, paginationData });
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(400);
        })
})

module.exports = router;