import jwt from "jsonwebtoken";
import { envs } from ".";


export const validateToken = <T>(token: string): Promise<T | null> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, envs.JWT_SEED, (error, decoded) => {
            if (error) return reject(error);

            resolve(decoded as T);
        });
    });
}