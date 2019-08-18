const {Router} = require('express');
const SecureRouter = require('./secure');
const PublicRouter = require('./public');
const router = new Router();
router.use('/', PublicRouter);
// router.use('/secure', SecureRouter);
module.exports = router