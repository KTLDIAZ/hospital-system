import express  from 'express'
import { MedicineController } from '../controllers/medicine-controller.js'
import { verifySession } from '../middlewares/verify-session.js'
import { isInRole } from '../middlewares/is-in-role.js'
import { ROLES } from '../common/constants/role.js'

const router = express.Router()

router.use(verifySession)
router.use(isInRole([ROLES.ADMIN, ROLES.DOCTOR, ROLES.STAFF]))

router.get('/:id', MedicineController.getById)
router.get('/', MedicineController.getAll)
router.post('/', MedicineController.create)
router.post('/:id/inventory', MedicineController.createInventory)
router.post('/:id/transaction', MedicineController.createTransactions)

export default router