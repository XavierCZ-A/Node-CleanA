import { regularExps } from "../../config";



export interface LoginUserDto {
    email: string,
    password: string,
}


export const loginUserDto = (object: { [key: string]: any }): [string?, LoginUserDto?] => {
    const { email, password } = object;

    if (!email) return ['Missing email'];
    if (!regularExps.email.test(email)) return ['Email is not valid'];
    if (!password) return ['Missing password'];
    if (password.length < 6) return ['Password too short'];

    const user: LoginUserDto = { email, password }

    return [undefined, user];

}




