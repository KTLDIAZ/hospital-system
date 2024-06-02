import { NextFunction, Request, Response } from 'express'
import { jwtVerify } from 'jose'
import Enviroment from '../common/constants/enviroment.js'

export const verifySession = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token

  const notFoundResponse = res.status(404).json({ ok: false, data: null, mesasge: 'Not found' })
  if (!token) return notFoundResponse;

  try {
    await jwtVerify(token, new TextEncoder().encode(Enviroment.secret));
    return next();
  } catch (error) {
    return notFoundResponse;
  }
}  