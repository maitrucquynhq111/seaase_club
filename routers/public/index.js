import {Router} from 'express';
import SubjectRouter from './subject'

const router = new Router();
router.use('/subjects', SubjectRouter);
export default router