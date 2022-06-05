const router = require('express').Router();
const checkLoggedIn = require('./middleware/checkLoggedIn');

const { UserQ } = require('../db/query-api');

router.get('/api/admin/users/:pageNum', checkLoggedIn, async (req, res) => {
    const { pageNum } = req.params;
    const perPage = 15;
    const offset = ( pageNum - 1 ) * perPage;
    let paginationData = {};

    await UserQ.getUsers(perPage, offset)
        .then(([users, total]) => {
            paginationData.currentPage = pageNum;
            paginationData.lastPage = Math.ceil(total[0].total / perPage);
            paginationData.totalPages = Number(total[0].total);
            res.json({ users, paginationData });
        })
        .catch((error) => {
            console.log(error);
            res.status(400).send("An error occurred when fetching users");
        })
})

router.post('/api/admin/users/delete', checkLoggedIn, async (req, res) => {
    const { toDelete } = req.body;
    try {
        await UserQ.deleteUser(toDelete);
        res.json({ message: `User ${toDelete} successfully deleted.` })
    } catch (error) {
        console.log(error);
        res.status(500).send(`${error}`)
    }
})

module.exports = router;