const router = require('express').Router();
const authRoute = require('./authRoute');
const adminRoute = require('./adminRoute');
const userRoute = require('./userRoute');
const productRoute = require('./productRoute');
const categoryRoute = require('./categoryRoute');

router.use(authRoute);
router.use(adminRoute);
router.use(userRoute);
router.use(productRoute);
router.use(categoryRoute);

module.exports = router;