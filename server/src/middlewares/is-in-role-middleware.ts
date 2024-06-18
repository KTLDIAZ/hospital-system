import { NextFunction, Request, Response } from 'express'
import JWTService from '../infrastructure/jwt-service.js';

export const isInRoleMiddleware = (roles: string[]) =>  {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!(await JWTService.isInRole(roles, req.cookies.token))) 
      return res.status(404).json({ ok: false, data: null, mesasge: 'Not found' })
    
    next()
  }
}