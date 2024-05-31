import { Types } from 'mongoose';
import { Medicine } from '../schemas/medicine';
import { AppMedicine, Inventory, InventoryTransaction } from './interfaces/medicine,.interface'

export class MedicineModel {

  static async getById(id: Types.ObjectId) {
    const medicine = Medicine.findById(id)
    return medicine
  }

  static async getAll() {
    const medicines = await Medicine.find().select({ inventory: 0, transaction: 0 }).exec()
    return medicines
  }

  static async create(medicine: AppMedicine) {
    const newMedicine = await Medicine.create({
      ...medicine
    })

    return newMedicine
  }

  static async createInventories(id: Types.ObjectId, inventories: [Inventory]) {
    const medicine = await Medicine.findById(id)
    if (medicine == null) return false

    medicine.inventory.push(...inventories)

    for (const inventory of inventories) {
      medicine.inventory.push(inventory)
      medicine.quantity += inventory.quantity
    }

    await medicine.save()
    
    return medicine.inventory
  }

  static async createTransactions(id: Types.ObjectId, transactions: [InventoryTransaction]) {
    const medicine = await Medicine.findById(id)
    if (medicine == null) return false

    for (const transaction of transactions) {
      const inventory = medicine.inventory.find(x => transaction.inventoryId)
      if (inventory == null) continue

      if (inventory.quantity >= transaction.quantity) {
        inventory.quantity -= transaction.quantity
        medicine.transactions.push(transaction)
      }
    }

    await medicine.save()
    
    return medicine.inventory
  }

}