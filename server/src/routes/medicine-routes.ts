import express  from 'express'
import { MedicineController } from '../controllers/medicine-controller'

const router = express.Router()

router.get('/:id', MedicineController.getById)
router.get('/', MedicineController.getAll)
router.post('/', MedicineController.create)
router.post('/:id/inventory', MedicineController.createInventory)
router.post('/:id/transaction', MedicineController.createTransactions)

export default router