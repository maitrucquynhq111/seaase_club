const {Router} = require('express');
const TeachersController = require('../../controllers/teachers.controller');
// import { checkValidationResult, createValidationFor } from '../../middleware/jobs.validator';
const router = new Router();

router.route('/create').post(
    // createValidationFor('create'),
    TeachersController.create
)
router.route('/list').get(
    TeachersController.getList
)
router.route('/list/all').get(
    TeachersController.getAll
)
module.exports = router
