const router = require("express").Router();
const { convertPrice } = require('../serversideUtils/convertPrice');
const { prepCategoryChildrenArray } = require('../serversideUtils/prepCategoryChildrenArray');
const { CatQ, RevQ } = require('../db/query-api');
const { ProdQ } = require('../db/query-api');

router.get("/api/categories/get-full-tree", async (req, res) => {
    const foods = await CatQ.getCategoryTree(1);
    const drink = await CatQ.getCategoryTree(2);
    let categories = {};
    categories.foods = foods.rows[0].tree;
    categories.drink = drink.rows[0].tree;

    return res.json({ categories })
})

router.get('/api/categories/:catId/:pageNum/order=:sortSelected', async (req, res) => {
    const { catId, pageNum, sortSelected } = req.params;
    const offset = ( pageNum - 1 ) * 60;
    let paginationData = {};
    
    let [prodsByCat, children, total] = await ProdQ.getProductsByCategory(catId, 60, offset, sortSelected);

    for (let i=0; i < prodsByCat.length; i++) {
        prodsByCat[i].price = convertPrice(prodsByCat[i].price);

        let rating = await RevQ.getAverageProductReviewScore(prodsByCat[i].id);

        if (rating.length > 0) {
            prodsByCat[i].avg_rating = rating[0].avg_rating;
        } else {
            prodsByCat[i].avg_rating = 0.00;
        }
    }
    children = prepCategoryChildrenArray(children);

    try {
        paginationData.currentPage = Number(pageNum);
        paginationData.lastPage = Math.ceil(Number(total[0].total) / 60);
        paginationData.totalItems = Number(total[0].total);
        res.json({ categoryProds: prodsByCat, childCategories: children, paginationData });
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
})

module.exports = router;