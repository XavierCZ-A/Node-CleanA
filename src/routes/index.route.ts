import { Router } from 'express';
import  authRoutes  from '../presentation/auth/auth.route';
import categoryRoutes from '../presentation/category/category.route';


const router = Router();

router.use('/api/auth', authRoutes)

router.use('/api/category', categoryRoutes)

export default router;