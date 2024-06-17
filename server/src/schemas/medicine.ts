import { Schema, model } from 'mongoose'
import { Inventory, InventoryTransaction, AppMedicine } from '../models/types/medicine.interface.js'
import { auditSchema } from './audit.js';

const transactionsSchema = new Schema<InventoryTransaction>({
  quantity: { type: Number, required: true },
  audit: { type: auditSchema, required: true },
})

const inventorySchema = new Schema<Inventory>({
  quantity: { type: Number, required: true },
  sku: { type: String, required: true, uppercase: true },
  expireAt: { type: Date, required: true },
  audit: { type: auditSchema, required: true },
})

const medicineSchema = new Schema<AppMedicine>({
  name: { type: String, required: true, uppercase: true },
  brand: { type: String, required: true, uppercase: true },
  content: { type: String, required: true }, 
  description: { type: String, required: true },
  quantity: { type: Number, required: false, default: 0 },
  inventory: { type: [inventorySchema], default: [] },
  transactions: { type: [transactionsSchema], default: [] },
  audit: { type: auditSchema, required: true },
})

export const Medicine = model('Medicines', medicineSchema)