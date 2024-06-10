import { CookieOptions, Request, Response } from 'express'
import { AuthService } from '../infrastructure/auth-service.js'
import { ROLES } from '../common/constants/role.js'
import { USER_TYPES } from '../common/constants/user-types.js'
export class AuthController {

  static async login(req: Request, res: Response) {
    const jwt = await AuthService.login(req.body.email, req.body.password)
    if (jwt == null)
      return res.status(400).json({  ok: false, data: null, message: 'Wrong Email or password' })

    const isProduction = process.env.NODE_ENV === 'production'
    const cookieOptions: CookieOptions = {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 2,
      path: '/', 
      sameSite: 'strict', 
      secure: isProduction
    }

    res.cookie('token', jwt, cookieOptions)
    return res.status(200).json({ ok: true, data: null, message: null})
  }

  static async getRoles(req: Request, res: Response) {
    return res.status(200).json({ ok: true, data: ROLES, message: null})
  }

  static async getUserTypes(req: Request, res: Response) {
    return res.status(200).json({ ok: true, data: USER_TYPES, message: null})
  }
}