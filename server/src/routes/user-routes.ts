import express  from 'express'
import { UserContoller } from '../controllers/user-controller.js'

const router = express.Router()

router.get('/', UserContoller.getAll)
router.get('/:id', UserContoller.getById)
router.post('/staff', UserContoller.createStaff)
router.post('/doctor', UserContoller.createDoctor)
router.post('/patient', UserContoller.createPatient)
router.patch('/type/:id', UserContoller.setType)

export default router