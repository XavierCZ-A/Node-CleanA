import { NextFunction, Request, Response } from 'express';
import { validateToken } from '../../config';
import { UserModel } from '../../data';
import { entity } from '../../domain';



export const validateJWT = async (req:Request, res:Response, next:NextFunction) => {

    const authorization = req.header('Authorization');
    if (!authorization) return res.status(401).send({ error: 'No token provided' });
    if (!authorization.startsWith('Bearer')) return res.status(401).send({ error: 'Invalid token' });

    const token = authorization.split(' ').at(1) || '';

    try {
        const payload = await validateToken<{ id: string}>(token);
        if (!payload) return res.status(401).send({ error: 'Invalid token' });

        const user = await UserModel.findById(payload.id);
        if (!user) return res.status(401).send({ error: 'Invalid token' });

        req.body.user = entity(user);

        next();
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ error: 'Internal server error' });
    }
   
}