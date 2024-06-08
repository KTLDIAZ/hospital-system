import { CookieOptions, Request, Response } from 'express'
import { AuthService } from '../infrastructure/auth-service.js'
export class AuthController {

  static async login(req: Request, res: Response) {
    const jwt = await AuthService.login(req.body.email, req.body.password)
    if (jwt == null)
      return res.status(400).json({  ok: false, data: null, message: 'Wrong Email or password' })

    const isProduction = process.env.NODE_ENV === 'production'
    const cookieOptions: CookieOptions = {
      httpOnly: true,
      maxAge: 1000 + 60 * 60 * 24 * 30,
      path: '/', 
      sameSite: isProduction ? 'strict' : 'lax', 
      secure: isProduction
    }

    res.cookie('token', jwt, cookieOptions)
    return res.status(200).json({ ok: true, data: null, message: null})
  }
}