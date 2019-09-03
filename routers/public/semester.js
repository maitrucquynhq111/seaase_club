const {Router} = require('express');
const SemestersController = require('../../controllers/semesters.controller');
// import { checkValidationResult, createValidationFor } from '../../middleware/jobs.validator';
const router = new Router();

router.route('/create').post(
    // createValidationFor('create'),
    SemestersController.create
)

router.route('/list').get(
    SemestersController.getList
)

router.route('/list/all').get(
    SemestersController.getAll
)

router.route('/deleteMany')
.delete(
    SemestersController.deleteMany
)

router.route('/:id')
.delete(
    SemestersController.delete
)
.put(
    SemestersController.update
)
module.exports = router
