const router = require('express').Router();
const authRoute = require('./authRoute');
const adminRoute = require('./adminRoute');
const userRoute = require('./userRoute');
const productRoute = require('./productRoute');

router.use(authRoute);
router.use(adminRoute);
router.use(userRoute);
router.use(productRoute);

module.exports = router;