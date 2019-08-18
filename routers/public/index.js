const {Router} = require('express');
const SubjectRouter = require('./subject')

const router = new Router();
router.use('/subjects', SubjectRouter);
module.exports = router