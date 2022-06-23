const router = require('express').Router();
const checkLoggedIn = require('./middleware/checkLoggedIn');
const checkAdmin = require('./middleware/checkAdmin');
const multer = require('multer');
const upload = multer();

const { UserQ, ProdQ, CatQ } = require('../db/query-api');

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

router.post('/api/admin/products/create', upload.any(), checkLoggedIn, checkAdmin, async (req, res) => {
    try {
        await ProdQ.addProduct(req.body, req.files);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.status(500).send(`${error}`)
    }
})

router.post('/api/admin/products/delete', checkLoggedIn, checkAdmin, async (req, res) => {
    const { toDelete } = req.body;
    try {
        await ProdQ.deleteProduct(toDelete);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.status(400).send(`Failed to delete: ${error}`);
    }
})

router.get('/api/admin/category-list', checkLoggedIn, checkAdmin, async (req, res) => {
    await CatQ.categoriesNoPagination()
        .then(cat_list => {
            return res.json({ cat_list })
        })
        .catch((error) => {
            console.log(error)
            res.status(400).send("Could not fetch categories")
        })
})

module.exports = router;