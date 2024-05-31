import { Request, Response } from 'express'
import { User } from '../schemas/user'

export class UserModel {

  async getById(req: Request, res: Response) {
    let user = await User.findById(req.query.userId)

    if(user == null)
      return res.json({ ok: false, data: null, message: "User not found"})

    return res.json({ ok: true, data: user, message: null })
  }

  async create(req: Request, res: Response) {
    let user = await User.find({  })

    if(user == null)
      return res.json({ ok: false, data: null, message: "User not found"})

    return res.json({ ok: true, data: user, message: null })
  }

}