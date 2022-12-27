const router = require('express').Router();
const checkLoggedIn = require('./middleware/checkLoggedIn');
const checkAdmin = require('./middleware/checkAdmin');
const multer = require('multer');
const upload = multer();

const { UserQ, ProdQ, CatQ } = require('../db/query-api');
const { convertPrice } = require('../serversideUtils/convertPrice');
const { convertCatId } = require('../serversideUtils/convertCatId');

const defaultPerPage = 15;

router.get('/api/admin/users/:pageNum', checkLoggedIn, checkAdmin, async (req, res) => {
    const { pageNum } = req.params;
    const offset = ( pageNum - 1 ) * defaultPerPage;
    let paginationData = {};

    await UserQ.getUsers(defaultPerPage, offset)
        .then(([users, total]) => {
            paginationData.currentPage = Number(pageNum);
            paginationData.lastPage = Math.ceil(total[0].total / defaultPerPage);
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
    const offset = ( pageNum - 1 ) * defaultPerPage;
    let paginationData = {};

    await ProdQ.getAllProducts(defaultPerPage, offset)
        .then(([products, total]) => {
            products.forEach(product => {
                product.price = convertPrice(product.price);
                product.category_id = convertCatId(product.category_id);
            })
            paginationData.currentPage = Number(pageNum);
            paginationData.lastPage = Math.ceil(total[0].total / defaultPerPage);
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

router.get('/api/admin/categories/:pageNum', checkLoggedIn, checkAdmin, async (req, res) => {
    const { pageNum } = req.params;
    const offset = ( pageNum - 1 ) * defaultPerPage;
    let paginationData = {};

    await CatQ.getCategories(offset, defaultPerPage)
        .then(([categories, total]) => {
            for (let category of categories) {
                category.parent_id = convertCatId(category.parent_id);
            }
            paginationData.currentPage = Number(pageNum);
            paginationData.lastPage = Math.ceil(total[0].total / defaultPerPage);
            paginationData.totalItems = Number(total[0].total);
            res.json({ categories, paginationData })
        })
        .catch((error) => {
            console.log(error);
            res.status(400).send("An error occurred when fetching categories");
        })
})

router.post('/api/admin/categories/create', checkLoggedIn, checkAdmin, async (req, res) => {
    try {
        await CatQ.addCategory(req.body);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.status(500).send(`${error}`)
    }
})

router.post('/api/admin/categories/delete', checkLoggedIn, checkAdmin, async (req, res) => {
    const { toDelete } = req.body;
    try {
        await CatQ.deleteCategory(toDelete);
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