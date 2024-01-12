export enum HttpStatus {
    BadRequest = 400,
    Ok = 200,
    NotFound = 404,
    InternalServer = 500
}
  
  export interface CustomError {
    statusCode: number;
    message: string;
}
  
export const errors = {
  badRequest: (message: string): CustomError => ({
    statusCode: HttpStatus.BadRequest,
    message: message || 'Bad Request',
  }),
  
  statusOk: (message: string): CustomError => ({
    statusCode: HttpStatus.Ok,
    message: message || 'OK',
  }),
  
  notFound: (message: string): CustomError => ({
    statusCode: HttpStatus.NotFound,
    message: message || 'Not Found',
  }),

  internalServer: (message: string): CustomError => ({
    statusCode: HttpStatus.InternalServer,
    message: message || 'Internal Server Error'
  })
};
  