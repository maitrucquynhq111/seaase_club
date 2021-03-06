const {Router} = require('express');
const UsersController = require('../../controllers/users.controller');
// import { checkValidationResult, createValidationFor } from '../../middleware/jobs.validator';
const router = new Router();

router.route('/create').post(
    // createValidationFor('create'),
    UsersController.create
)

router.route('/list').get(
    UsersController.getList
)

router.route('/list/all').get(
    UsersController.getAll
)

router.route('/deleteMany')
.delete(
    UsersController.deleteMany
)

router.route('/:id')
.delete(
    UsersController.delete
)
.put(
    UsersController.update
)
module.exports = router
