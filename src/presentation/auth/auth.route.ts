import { Router } from "express";
import { loginUsers, registerUsers, verifyEmail } from "./auth.controller";



export const router = Router();


router.post('/login', loginUsers)

router.post('/register', registerUsers)

router.get('/verify-email/:token', verifyEmail)

export default router;