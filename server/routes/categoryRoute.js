const router = require("express").Router();

const { CatQ } = require('../db/query-api');

router.get("/api/categories/get-full-tree", async (req, res) => {
    const foods = await CatQ.getCategoryTree(1);
    const drink = await CatQ.getCategoryTree(2);
    let categories = {};
    categories.foods = foods.rows[0].tree;
    categories.drink = drink.rows[0].tree;

    return res.json({ categories })
})

module.exports = router;