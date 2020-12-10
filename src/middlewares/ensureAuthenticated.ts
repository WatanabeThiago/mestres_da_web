import { NextFunction } from "express";
import { Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import authConfig from '../config/auth'

interface TokenPayload {
    iat: number,
    exp: number,
    sub: string
}

export default function ensureAuthenticated(req: Request, res:Response, next: NextFunction): any{
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.send(401).json('Nao foi recebido o TOKEN JWT.')
    }

    const [, token] = authHeader.split(' ')

    try{
    const decoded = verify(token, authConfig.jwt.secret)

    const { sub } = decoded as TokenPayload;

    req.shop = {
        shop_id: sub
    }


    return next()
    } catch {
        throw new Error('Token invalido.')
    }

}