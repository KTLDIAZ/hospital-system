import { Request, Response } from 'express' 
import { MedicineModel } from '../models/medicine-model.js'
import mongoose, { Types } from 'mongoose'
import { AppMedicine, Inventory, InventoryTransaction } from '../models/interfaces/medicine.interface.js'
import { UserModel } from '../models/user-model.js'
import { getPayload } from '../infrastructure/jwt.js'

export class MedicineController {

  static async getById(req: Request, res: Response) {
    const medicineId = new Types.ObjectId(req.params.id)

    const medicine = await MedicineModel.getById(medicineId)
    if (medicine == null)
      return res.status(404).json({ ok: false, data: null, message: 'The medicine was not found' })
    
    return res.status(200).json({ ok: true, data: medicine, message: null })
  }

  static async getAll(req: Request, res: Response) {
    const medicines = await MedicineModel.getAll()
    if (medicines.length === 0)
      return res.status(204).json({ ok: false, data: null, message: 'There isn\'t any medicine' })
    
    return res.status(200).json({ ok: true, data: medicines, message: null })
  }

  static async create(req: Request, res: Response) {
    const medicine: AppMedicine = {
      ...req.body,
      quantity: 0
    }

    const payload = await getPayload(req.cookies.token)

    if (payload === null)
      return res.json({ ok: false, data: null, message: 'Not found' })

    const creator = await UserModel.getById(new mongoose.Types.ObjectId(payload['userId'] as string));
    if (creator === null)
      return res.json({ ok: false, data: null, message: 'Not found' })

    medicine.audit = {
      createdBy: creator.fullName,
      creatorId: creator._id,
      createdAt: new Date()
    }
    const response =  await MedicineModel.create(medicine)

    return res.status(201).json({ ok: true, data: response, message: null})
  }

  static async createInventory(req: Request, res: Response) {
    const medicineId = new Types.ObjectId(req.params.id)

    const payload = await getPayload(req.cookies.token)
    if (payload === null)
      return res.json({ ok: false, data: null, message: 'Not found' })

    const creator = await UserModel.getById(new mongoose.Types.ObjectId(payload['userId'] as string));
    if (creator === null)
      return res.json({ ok: false, data: null, message: 'Not found' })

    req.body.audit = {
      createdBy: creator.fullName,
      creatorId: creator._id,
      createdAt: new Date()
    }

    const response =  await MedicineModel.createInventory(medicineId, req.body)
    if (!response)
      return res.status(204).json({ ok: false, data: null, message: 'There isn\'t any medicine' })

    return res.status(201).json({ ok: true, data: response, message: null}) 
  }
  
  static async createTransactions(req: Request, res: Response) {
    const medicineId = new Types.ObjectId(req.params.id)

    const inventories = req.body.inventories

    const response =  await MedicineModel.createTransactions(medicineId, inventories)
    if (!response)
      return res.status(204).json({ ok: false, data: null, message: 'There isn\'t any medicine' })

    return res.status(201).json({ ok: true, data: response, message: null}) 
  }
}