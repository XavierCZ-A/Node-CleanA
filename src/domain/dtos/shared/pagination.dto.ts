

export interface PaginationDto {
    page: number,
    limit: number,
}


export const paginationDto = (page:number = 1, limit:number = 10): [string?, PaginationDto?] => {
   
    if(isNaN(page) || isNaN(limit)) return ['Page and Limit must be a number']
    if (page < 1) return ['Page must be greater than 0'];
    if (limit < 1) return ['Limit must be greater than 0'];

    return [undefined, { page, limit }];
}   


