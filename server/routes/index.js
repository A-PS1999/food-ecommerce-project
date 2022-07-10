const router = require('express').Router();
const authRoute = require('./authRoute');
const adminRoute = require('./adminRoute');
const userRoute = require('./userRoute');
const miscRoute = require('./miscRoute');

router.use(authRoute);
router.use(adminRoute);
router.use(userRoute);
router.use(miscRoute);

module.exports = router;