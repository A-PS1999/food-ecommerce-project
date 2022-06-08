const router = require('express').Router();
const checkLoggedIn = require('./middleware/checkLoggedIn');
const checkAdmin = require('./middleware/checkAdmin');

const { UserQ } = require('../db/query-api');
const { ProdQ } = require('../db/query-api');

router.get('/api/admin/users/:pageNum', checkLoggedIn, checkAdmin, async (req, res) => {
    const { pageNum } = req.params;
    const perPage = 15;
    const offset = ( pageNum - 1 ) * perPage;
    let paginationData = {};

    await UserQ.getUsers(perPage, offset)
        .then(([users, total]) => {
            paginationData.currentPage = Number(pageNum);
            paginationData.lastPage = Math.ceil(total[0].total / perPage);
            paginationData.totalItems = Number(total[0].total);
            res.json({ users, paginationData });
        })
        .catch((error) => {
            console.log(error);
            res.status(400).send("An error occurred when fetching users");
        })
})

router.get('/api/admin/user/:userId', checkLoggedIn, checkAdmin, (req, res) => {
    const { userId } = req.params;

    return UserQ.getUserAndAddresses(userId).then(userDetails => {
        return res.json({ userDetails: userDetails[0] });
    }
    ).catch((error) => {
        console.log(error);
        res.status(400).send("An error occurred while fetching the user's data")
    })
})

router.post('/api/admin/users/delete', checkLoggedIn, checkAdmin, async (req, res) => {
    const { toDelete } = req.body;
    try {
        await UserQ.deleteUser(toDelete);
        res.json({ message: `User ${toDelete} successfully deleted.` })
    } catch (error) {
        console.log(error);
        res.status(500).send(`${error}`)
    }
})

router.get('/api/admin/products/:pageNum', checkLoggedIn, checkAdmin, async (req, res) => {
    const { pageNum } = req.params;
    const perPage = 15;
    const offset = ( pageNum - 1 ) * perPage;
    let paginationData = {};

    await ProdQ.getAllProducts(perPage, offset)
        .then(([products, total]) => {
            paginationData.currentPage = Number(pageNum);
            paginationData.lastPage = Math.ceil(total[0].total / perPage);
            paginationData.totalItems = Number(total[0].total);
            res.json({ products, paginationData })
        })
        .catch((error) => {
            console.log(error);
            res.status(400).send("An error occurred when fetching products");
        })
})

module.exports = router;