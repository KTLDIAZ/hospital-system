import express  from 'express'
import { UserContoller } from '../controllers/user-controller.js'
import { verifySession } from '../middlewares/verify-session.js'
import { isInRoleMiddleware } from '../middlewares/is-in-role-middleware.js'
import { ROLES } from '../common/constants/role.js'

const router = express.Router()

router.use(verifySession)
router.use(isInRoleMiddleware([ROLES.ADMIN, ROLES.DOCTOR, ROLES.RECPTIONIST, ROLES.STAFF]))

router.get('/', UserContoller.getAll)
router.get('/:id', UserContoller.getById)
router.get('/identity/:identity', UserContoller.getByIdentityDocument)
router.post('/', UserContoller.create)
router.post('/:id/medical-history', UserContoller.createMedicalHistory)
router.put('/:id', UserContoller.updateUser)
router.patch('/:id/disable', isInRoleMiddleware([ROLES.ADMIN]), UserContoller.disable)
router.patch('/:id/enable', isInRoleMiddleware([ROLES.ADMIN]), UserContoller.enable)

export default router