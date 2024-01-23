import { Request, Response } from "express";
import { createCategoryDto, paginationDto } from "../../domain";
import { createCategorys, getAllCategories } from "../service/category.services";

export const getCategories = async (req: Request, res: Response) => {

    const {page = 1, limit = 5} = req.query;

    const [error, paginationDtos] = paginationDto(+page, +limit);

    if (error) return res.status(400).send({ error });

    const categories = await getAllCategories(paginationDtos!)
    res.json(categories)
}

export const createCategory = async (req: Request, res: Response) => {

    const [error, createCategory] = createCategoryDto(req.body);
    if (error) return res.status(400).send({ error });

    try {
        const category = await createCategorys(createCategory!, req.body.user);

        res.json(category);

    } catch (error) {

        res.status(500).json(error)
    }

}

