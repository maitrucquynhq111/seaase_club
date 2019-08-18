const {Router} = require('express');
const SubjectRouter = require('./subject')
const UserRouter = require('./user')

const router = new Router();
router.use('/subjects', SubjectRouter);
router.use('/users', UserRouter);
module.exports = router