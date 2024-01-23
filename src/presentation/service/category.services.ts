import { CategoryModel } from "../../data";
import { CreateCategoryDto, PaginationDto, UserEntity, errors } from "../../domain";

export const createCategorys = async (createCategoryDto: CreateCategoryDto, user: UserEntity) => {
    const categoryExist = await CategoryModel.findOne({ name: createCategoryDto.name })
    if (categoryExist) throw errors.badRequest("Category already exist");

    try {
        const category = new CategoryModel({ ...createCategoryDto, user: user.id })
        await category.save()

        return {
            category: category
        }
    } catch (error) {
        throw errors.internalServer(`${error}`)
    }
}

export const getAllCategories = async (paginationDtos: PaginationDto) => {

    const { page, limit } = paginationDtos;

    try {
        const categories = await CategoryModel.find()
            .skip((page - 1) * limit)
            .limit(limit)

        return {
            page,
            limit,
            categories: categories.map((category) => ({
                id: category.id,
                name: category.name,
                available: category.available,
            }))
        }
    } catch (error) {
        throw errors.internalServer('Internal Server Error')
    }
}