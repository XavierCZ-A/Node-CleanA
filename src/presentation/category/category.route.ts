import { Router } from "express";
import { createCategory, getCategories} from "./category.controller";
import { validateJWT } from "../middlewares/auth.middleware";





export const router = Router();

router.get('/', getCategories)

router.post('/', validateJWT, createCategory)


export default router;