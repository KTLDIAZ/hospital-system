import { Request, Response } from 'express'
import { UserModel } from '../models/user-model.js';
import { AppUser } from '../models/interfaces/user.interface.js';
import mongoose from 'mongoose';
import { isInRole } from '../infrastructure/is-in-role.js';
import { ROLES } from '../common/constants/role.js';
import { PATIENT_TYPE } from '../common/constants/user-types.js';
import { getPayload } from '../infrastructure/jwt.js';
import { Role } from '../models/interfaces/role.interface.js';

export class UserContoller {

  static async getById(req: Request, res: Response) {
    const userId = new mongoose.Types.ObjectId(req.params.id as string)
    const user = await UserModel.getById(userId);
    if(user == null)
      return res.status(404).json({ ok: false, data: null, message: 'User not found'})

    return res.status(200).json({ ok: true, data: user, message: null })
  }

  static async getByIdentityDocument(req: Request, res: Response) {
    if (!req.params.identity)
      return res.status(404).json({ ok: false, data: null, message: 'User not found'})

    const user = await UserModel.getByIdentityDocument(req.params.identity);
    if(user == null)
      return res.status(404).json({ ok: false, data: null, message: 'User not found'})

    return res.status(200).json({ ok: true, data: user, message: null })
  }

  static async getAll(req: Request, res: Response) {
    const users = await UserModel.getAll()
    if (users.length === 0)
      return res.status(204).json({ ok: false, data: null, message: 'There isn\'t any user' })
    
    return res.status(200).json({ ok: true, data: users, message: null })
  }

  static async create(req: Request, res: Response) {
    const exist = await UserModel.getByIdentityDocument(req.body.identityDocument)

    if (exist != null)
      return res.json({ ok: false, data: null, message: `User with identity: ${req.body.identityDocument} already exist'}` })

    const payload = await getPayload(req.cookies.token)

    if (payload === null)
      return res.json({ ok: false, data: null, message: 'Not found' })

    const creator = await UserModel.getById(new mongoose.Types.ObjectId(payload['userId'] as string));

    const user: AppUser = {
      ...req.body,
      audit: {
        createdBy: creator!.fullName,
        creatorId: creator!._id,
        createdAt: new Date()
      },
      isDisabled: false
    }
      
    if (!(await isInRole([ROLES.ADMIN], req.cookies.token))) {
      user.roles = []
      user.type = PATIENT_TYPE
    } else {
      user.roles = user.roles.map(x => {
        const newRole: Role = {
          name: x.name,
          audit: {
            createdBy: creator!.fullName,
            creatorId: creator!._id,
            createdAt: new Date()
          }
        }

        return newRole
      })
    }

    const response = await UserModel.create(user);
  
    return res.status(201).json({ ok: true, data: response, message: null })
  }

  static async setType(req: Request, res: Response) {
    const userId = new mongoose.Types.ObjectId(req.params.id as string)

    const response = await UserModel.setType(req.body.type, userId)

    if (response == null) 
      return res.status(204).json({ ok: false, data: null, message: 'User not found' }) 

    return res.status(200).json({ ok: true, data: null, message: 'The type have been updated' })
  }

}