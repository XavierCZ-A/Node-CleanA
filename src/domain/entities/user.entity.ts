import { errors } from "../errors/customs.errors";

export interface UserEntity {
    id: string,
    name: string,
    email: string,
    emailValidated: boolean,
    password: string,
    role: string,
}


export const entity = (object: { [key: string]: any; }) => {
    const { id, _id, name, email, emailValidated, password, role } = object;
    
    if (!_id && !id) {
        throw errors.badRequest('Missing id');
  }

  if (!name) throw errors.badRequest('Missing name');
  if (!email) throw errors.badRequest('Missing email');
  if (emailValidated === undefined) throw errors.badRequest('Missing emailValidated');
  if (!password) throw errors.badRequest('Missing password');
  if (!role) throw errors.badRequest('Missing role');
  
  const userEntity: UserEntity = { id: _id || id, name, email, emailValidated, password, role };
  
  return userEntity;
};

