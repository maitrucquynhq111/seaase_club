const {Router} = require('express');
const SubjectRouter = require('./subject')
const UserRouter = require('./user')
const UserSubjectRouter = require('./userSubject')

const router = new Router();
router.use('/subjects', SubjectRouter);
router.use('/users', UserRouter);
router.use('/userSubjects', UserSubjectRouter);
module.exports = router