const router = require("express").Router();

const { CatQ } = require('../db/query-api');
const { ProdQ } = require('../db/query-api');

router.get("/api/categories/get-full-tree", async (req, res) => {
    const foods = await CatQ.getCategoryTree(1);
    const drink = await CatQ.getCategoryTree(2);
    let categories = {};
    categories.foods = foods.rows[0].tree;
    categories.drink = drink.rows[0].tree;

    return res.json({ categories })
})

router.get('/api/categories/:catId/:pageNum', async (req, res) => {
    const { catId, pageNum } = req.params;
    const offset = ( pageNum - 1 ) * 60;
    let paginationData = {};
    
    const [prodsByCat, total] = await ProdQ.getProductsByCategory(catId, 60, offset);

    try {
        paginationData.currentPage = Number(pageNum);
        paginationData.lastPage = Math.ceil(Number(total[0].total) / 60);
        paginationData.totalItems = Number(total[0].total);
        res.json({ categoryProds: prodsByCat, paginationData });
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
})

module.exports = router;