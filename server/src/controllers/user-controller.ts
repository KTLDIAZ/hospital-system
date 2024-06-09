import { Request, Response } from 'express'
import { UserModel } from '../models/user-model.js';
import { AppUser } from '../models/interfaces/user.interface.js';
import mongoose from 'mongoose';

export class UserContoller {

  static async getById(req: Request, res: Response) {
    const userId = new mongoose.Types.ObjectId(req.params.id as string)
    const user = await UserModel.getById(userId);
    if(user == null)
      return res.status(404).json({ ok: false, data: null, message: 'User not found'})

    return res.status(200).json({ ok: true, data: user, message: null })
  }

  static async getByIdentityDocument(req: Request, res: Response) {
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

  static async createPatient(req: Request, res: Response) {
    const exist = await UserModel.getByIdentityDocument(req.body.identityDocument)

    if (exist != null)
      res.json({ ok: false, data: null, message: 'Patient already exist'})

    const patient: AppUser = {
      ...req.body
    }

    const response = await UserModel.createPatient(patient);
  
    return res.status(201).json({ ok: true, data: response, message: null })
  }

  static async createStaff(req: Request, res: Response) {
    const exist = await UserModel.getByIdentityDocument(req.body.identityDocument)

    if (exist != null)
      res.json({ ok: false, data: null, message: 'Staff already exist'})

    const staff: AppUser = {
      ...req.body
    }

    const response = await UserModel.createStaff(staff);
  
    return res.status(201).json({ ok: true, data: response, message: null })
  }

  static async createDoctor(req: Request, res: Response) {
    const exist = await UserModel.getByIdentityDocument(req.body.identityDocument)

    if (exist != null)
      res.json({ ok: false, data: null, message: 'Staff already exist'})

    const doctor: AppUser = {
      ...req.body
    }

    const response = await UserModel.createDoctor(doctor);
  
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