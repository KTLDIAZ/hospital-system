import { NextFunction, Request, Response } from 'express'
import { JWTPayload, jwtDecrypt } from 'jose';
import Enviroment from '../common/constants/enviroment.js'
import { base64url } from 'jose'
import { UserModel } from '../models/user-model.js'
import { Types } from 'mongoose'

export const isInRole = (roles: string[]) =>  {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token

    const notFoundResponse = res.status(404).json({ ok: false, data: null, mesasge: 'Not found' })
    if (!token) return notFoundResponse

    const secret = base64url.decode(Enviroment.secret)
    const { payload } = await  jwtDecrypt<JWTPayload>(token, secret)

    const userId = payload['userId'] as string
    
    const isInRole = await UserModel.IsInRole(new Types.ObjectId(userId), roles)
    if (!isInRole) return notFoundResponse
    
    next()
  }
}