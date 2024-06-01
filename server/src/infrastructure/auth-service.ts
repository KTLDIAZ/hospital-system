import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose';
import { jwtVerify } from 'jose';

import { UserModel } from '../models/user-model.js';
import { createToken } from './jwt.js';
import { PATIENT_TYPE, userTypes } from '../common/user-types.js';

export class AuthService {

  static async login(email: string, password: string) {
    const user = await UserModel.getByEmail(email)
    if (user == null) return null

    if (userTypes.includes(user.type) && user.type !== PATIENT_TYPE) return null

    const passwordMatch = await bcrypt.compare(password, user.password!)
    if(!passwordMatch) return null

    return createToken(user.id)
  }

  static async changePassword(userId: Types.ObjectId, oldPassword: string, newPassword: string) {
    return await UserModel.changePassword(userId, oldPassword, newPassword)
  }

  static async verifySession(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token

    const notFoundResponse = res.status(404).json({ ok: false, data: null, mesasge: 'Not found' })
    if (!token) return notFoundResponse;

    try {
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      return next();
    } catch (error) {
      return notFoundResponse;
    }
  }
}