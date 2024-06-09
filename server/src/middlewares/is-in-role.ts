import { NextFunction, Request, Response } from 'express'
import { jwtVerify } from 'jose';
import Enviroment from '../common/constants/enviroment.js'
import { UserModel } from '../models/user-model.js'
import { Types } from 'mongoose'

export const isInRole = (roles: string[]) =>  {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token

    if (!token) return res.status(404).json({ ok: false, data: null, mesasge: 'Not found' })
    
    const secret = new TextEncoder().encode(Enviroment.secret)

    const { payload } = await jwtVerify(token, secret)

    const userId = payload['userId'] as string
    
    const isInRole = await UserModel.IsInRole(new Types.ObjectId(userId), roles)
    if (!isInRole) return res.status(404).json({ ok: false, data: null, mesasge: 'Not found' })
    
    next()
  }
}