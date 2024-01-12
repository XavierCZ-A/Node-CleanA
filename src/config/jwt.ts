import jwt from "jsonwebtoken";
import { envs } from "./envs";

interface Payload {
    id?: string;
    email?: string;
}

export const createAccessToken = (payload: Payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            envs.JWT_SEED,
            {
                expiresIn: "1d"
            },
            (error, token) => {
                if (error ) return reject(error);

                resolve(token);
            }
        );
    });
}