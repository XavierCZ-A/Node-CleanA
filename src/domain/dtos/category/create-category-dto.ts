


export interface CreateCategoryDto {
    name: string,
    changeAvailable: boolean,

}


export const createCategoryDto = (object: { [key: string]: any }): [string?, CreateCategoryDto?] => {
    const { name, available = false } = object;
    let changeAvailable = available;

    if (!name) return ['Missing name'];
    if (typeof available !== 'boolean') {
        changeAvailable = (available === 'true')
    }


    const category: CreateCategoryDto = { name, changeAvailable }

    return [undefined, category];
}

