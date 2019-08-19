const {Router} = require('express');
const SubjectsController = require('../../controllers/subjects.controller');
// import { checkValidationResult, createValidationFor } from '../../middleware/jobs.validator';
const router = new Router();

router.route('/create').post(
    // createValidationFor('create'),
    SubjectsController.create
)
router.route('/list').get(
    SubjectsController.getList
)
router.route('/:id')
.delete(
    SubjectsController.delete
)
.put(
    SubjectsController.update
)
module.exports = router
