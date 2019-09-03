const {Router} = require('express');
const SubjectRouter = require('./subject')
const UserRouter = require('./user')
const UserSubjectRouter = require('./userSubject')
const SemesterRouter = require('./semester')
const TeacherRouter = require('./teachers')

const router = new Router();
router.use('/subjects', SubjectRouter);
router.use('/users', UserRouter);
router.use('/userSubjects', UserSubjectRouter);
router.use('/semesters', SemesterRouter);
router.use('/teachers', TeacherRouter)
module.exports = router