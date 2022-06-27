const router = require('express').Router();
const authRoute = require('./authRoute');
const adminRoute = require('./adminRoute');

router.use(authRoute);
router.use(adminRoute);

module.exports = router;