import { regularExps } from "../../../config";


export interface RegisterUserDto {
    name: string,
    email: string,
    password: string,
}

  
export const registerUserDto = ( object: { [key:string]:any } ): [string?, RegisterUserDto?] => {
    const { name, email, password } = object;
  
    if ( !name ) return ['Missing name'];
    if ( !email ) return ['Missing email'];
    if ( !regularExps.email.test( email ) ) return ['Email is not valid'];
    if ( !password ) return ['Missing password'];
    if ( password.length < 6 ) return ['Password too short'];
    
    const user:RegisterUserDto = {name, email, password}  

    return [undefined, user];
}

