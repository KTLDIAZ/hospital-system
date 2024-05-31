import mongoose from 'mongoose'
const { Schema } = mongoose

const transactionsSchema = new Schema({
  quantity: Number,
  transactionDate: Date,
  username: String
})

const inventorySchema = new Schema({
  quantity: Number,
  sku: String,
  expireAt: Date,
  createdBy: String, 
  transaction: [transactionsSchema]
})

const medicineSchema = new Schema({
  name: String,
  brand: String,
  content: String, 
  description: String,
  quantity: Number,
  inventory: [inventorySchema]
})

export const Medicine = mongoose.model('Medicine', medicineSchema)