import { Router } from 'express';
import  authRoutes  from '../presentation/auth/auth.route';


export const indexRoutes = Router();

indexRoutes.use('/api/auth', authRoutes)


