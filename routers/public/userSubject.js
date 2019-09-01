const {Router} = require('express');
const UserSubjectsController = require('../../controllers/userSubjects.controller');
// import { checkValidationResult, createValidationFor } from '../../middleware/jobs.validator';
const router = new Router();
router.route('/getBySubject/:id')
.get(
    UserSubjectsController.findBySubjectId
)
router.route('/getByUser/:id')
.get(
    UserSubjectsController.findByUserId
)
router.route('/:id')
.delete(
    UserSubjectsController.delete
)
module.exports = router
