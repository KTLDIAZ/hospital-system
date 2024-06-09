import { NextFunction, Request, Response } from 'express'
import { jwtVerify } from 'jose'
import Enviroment from '../common/constants/enviroment.js'

export const verifySession = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token
  
  if (!token) return res.status(404).json({ ok: false, data: null, mesasge: 'Not found' });

  try {
    const secret = new TextEncoder().encode(Enviroment.secret)
    await jwtVerify(token, secret);
    return next();
  } catch (error) {
    return res.status(404).json({ ok: false, data: null, mesasge: 'Not found' });
  }
}  