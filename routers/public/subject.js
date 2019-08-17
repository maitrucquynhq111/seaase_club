import {Router} from 'express';
import SubjectsController from '../../controllers/subjects.controller';
// import { checkValidationResult, createValidationFor } from '../../middleware/jobs.validator';
const router = new Router();

router.route('/create').post(
    // createValidationFor('create'),
    SubjectsController.create
)
router.route('/list').get(
    SubjectsController.getList
)
export default router
