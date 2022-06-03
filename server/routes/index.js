const router = require('express').Router();
const authRoute = require('./authRoute');

router.use(authRoute);

module.exports = router;