import { Schema, model } from 'mongoose'
import { Inventory, InventoryTransaction, AppMedicine } from '../models/interfaces/medicine,.interface'
import { auditSchema } from './audit';

const transactionsSchema = new Schema<InventoryTransaction>({
  quantity: { type: Number, required: true },
  audit: { type: auditSchema, required: true },
})

const inventorySchema = new Schema<Inventory>({
  quantity: { type: Number, required: true },
  sku: { type: String, required: true },
  expireAt: { type: Date, required: true },
  audit: { type: auditSchema, required: true },
})

const medicineSchema = new Schema<AppMedicine>({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  content: { type: String, required: true }, 
  description: { type: String, required: true },
  quantity: { type: Number, required: false, default: 0 },
  inventory: { type: [inventorySchema], default: [] },
  transactions: { type: [transactionsSchema], default: [] },
})

export const Medicine = model('Medicine', medicineSchema)