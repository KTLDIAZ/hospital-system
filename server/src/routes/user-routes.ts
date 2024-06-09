import express  from 'express'
import { UserContoller } from '../controllers/user-controller.js'
import { verifySession } from '../middlewares/verify-session.js'
import { isInRole } from '../middlewares/is-in-role.js'
import { ROLES } from '../common/constants/role.js'

const router = express.Router()

router.use(verifySession)

router.get('/', isInRole([ROLES.ADMIN, ROLES.DOCTOR]), UserContoller.getAll)
router.get('/:id', isInRole([ROLES.ADMIN, ROLES.DOCTOR, ROLES.RECPTIONIST]), UserContoller.getById)
router.get('/identity/:identity', isInRole([ROLES.ADMIN, ROLES.DOCTOR, ROLES.RECPTIONIST]), UserContoller.getByIdentityDocument)
router.post('/staff', isInRole([ROLES.ADMIN]), UserContoller.createStaff)
router.post('/doctor', isInRole([ROLES.ADMIN]), UserContoller.createDoctor)
router.post('/patient', isInRole([ROLES.ADMIN, ROLES.RECPTIONIST, ROLES.DOCTOR]), UserContoller.createPatient)
router.patch('/type/:id', isInRole([ROLES.ADMIN]), UserContoller.setType)

export default router