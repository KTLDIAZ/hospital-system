import { Request, Response } from 'express'
import { UserModel } from '../models/user-model.js';
import { AppUser, MedicalHistory } from '../models/types/user.interface.js';
import mongoose, { Types } from 'mongoose';
import { ROLES } from '../common/constants/role.js';
import { PATIENT_TYPE } from '../common/constants/user-types.js';
import  JWTService from '../infrastructure/jwt-service.js';
import { Role } from '../models/types/role.interface.js';

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

    const claims = await JWTService.getClaims(req.cookies.token)

    if (claims === null)
      return res.json({ ok: false, data: null, message: 'Not found' })

    const creator = await UserModel.getById(claims.userId);

    const user: AppUser = {
      ...req.body,
      audit: {
        createdBy: creator!.fullName,
        creatorId: creator!._id,
        createdAt: new Date()
      },
      isDisabled: false
    }
      
    if (!(await JWTService.isInRole([ROLES.ADMIN], req.cookies.token))) {
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

  static async createMedicalHistory(req: Request, res: Response) {
    const userId = new mongoose.Types.ObjectId(req.params.id as string)
    
    const claims = await JWTService.getClaims(req.cookies.token)
    if (claims === null)
      return res.status(404).json({ ok: false, data: null, message: 'User not found' }) 

    const user = await UserModel.getById(claims.userId)
    if (user === null)
      return res.status(404).json({ ok: false, data: null, message: 'User not found' })

    const newMedicalHistory:MedicalHistory = {
      ...req.body,
      doctor: {
        doctorId: user._id,
        name: user.fullName,
        specialties: user.specialties
      }
    }

    const response = await UserModel.createMedicalHistory(newMedicalHistory, userId)

    if (response == null) 
      return res.status(404).json({ ok: false, data: null, message: 'User not found' }) 

    return res.status(200).json({ ok: true, data: null, message: 'The medical history has been created' })
  }


  static async updateUser(req: Request, res: Response) {
    const exist = await UserModel.getByIdentityDocument(req.body.identityDocument)

    if (exist != null && exist._id.toString() !== req.params.id)
      return res.json({ ok: false, data: null, message: `User with identity: ${req.body.identityDocument} already exist'}` })

    const claims = await JWTService.getClaims(req.cookies.token)

    if (claims === null)
      return res.json({ ok: false, data: null, message: 'Not found' })

    const modifier = await UserModel.getById(claims.userId);

    const user: AppUser = {
      ...req.body,
      audit: {
        updatedBy: modifier!.fullName,
        updaterId: modifier!._id,
        updatedAt: new Date()
      }
    }
      
    if (!(await JWTService.isInRole([ROLES.ADMIN], req.cookies.token))) {
      user.roles = []
      user.type = ''
    } else {
      user.roles = user.roles.map(x => {
        const newRole: Role = {
          name: x.name,
          audit: {
            createdBy: modifier!.fullName,
            creatorId: modifier!._id,
            createdAt: new Date()
          }
        }

        return newRole
      })
    }

    const response = await UserModel.updateUser(user, new Types.ObjectId(req.params.id));
  
    return res.status(201).json({ ok: true, data: response, message: null })
  }

  static async enable(req: Request, res: Response) {
    const claims = await JWTService.getClaims(req.cookies.token)
    if (claims === null) 
      return res.json({ ok: false, data: null, message: 'Not found' })

    const modifier = await UserModel.getById(claims.userId)
    if (modifier === null)
      return res.json({ ok: false, data: null, message: 'Not found' })

    await UserModel.enable(new Types.ObjectId(req.params.id), {
      updatedAt: new Date(),
      updatedBy: modifier.fullName,
      updaterId: modifier._id
    })
    
    return res.status(200).json({ ok: true, data: null, message: null })
  }

  static async disable(req: Request, res: Response) {
    const claims = await JWTService.getClaims(req.cookies.token)
    if (claims === null) 
      return res.json({ ok: false, data: null, message: 'Not found' })

    const modifier = await UserModel.getById(claims.userId)
    if (modifier === null)
      return res.json({ ok: false, data: null, message: 'Not found' })

    await UserModel.disable(new Types.ObjectId(req.params.id), {
      updatedAt: new Date(),
      updatedBy: modifier.fullName,
      updaterId: modifier._id
    })

    return res.status(200).json({ ok: true, data: null, message: null })
  }
}