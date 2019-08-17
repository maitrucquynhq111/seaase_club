import {Router} from 'express';
import SecureRouter from './secure';
import PublicRouter from './public';
const router = new Router();
router.use('/', PublicRouter);
// router.use('/secure', SecureRouter);
export default router