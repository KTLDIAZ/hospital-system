import { Request, Response } from 'express'
import { AuthService } from '../infrastructure/auth-service.js'
import { serialize } from 'cookie'
import { jwtVerify } from 'jose'

export class AuthController {

  static async login(req: Request, res: Response) {
    const jwt = await AuthService.login(req.body.email, req.body.password)
    if (jwt == null)
      return res.status(400).json({  ok: false, data: null, message: 'Wrong Email or password' })

    const serializedCookie = serialize('token', jwt, {
      httpOnly: true,
      maxAge: 1000 + 60 * 60 * 24 * 30,
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production'
    })

    res.setHeader('Set-Cookie', serializedCookie)
    return res.status(200).json({ ok: true, data: null, message: null})
  }
}