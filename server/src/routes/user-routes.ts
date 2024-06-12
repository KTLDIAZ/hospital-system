import express  from 'express'
import { UserContoller } from '../controllers/user-controller.js'
import { verifySession } from '../middlewares/verify-session.js'
import { isInRoleMiddleware } from '../middlewares/is-in-role-middleware.js'
import { ROLES } from '../common/constants/role.js'

const router = express.Router()

router.use(verifySession)

router.get('/', isInRoleMiddleware([ROLES.ADMIN, ROLES.DOCTOR]), UserContoller.getAll)
router.get('/:id', isInRoleMiddleware([ROLES.ADMIN, ROLES.DOCTOR, ROLES.RECPTIONIST]), UserContoller.getById)
router.get('/identity/:identity', isInRoleMiddleware([ROLES.ADMIN, ROLES.DOCTOR, ROLES.RECPTIONIST]), UserContoller.getByIdentityDocument)
router.post('/', UserContoller.create)
router.post('/:id/medical-history', UserContoller.createMedicalHistory)
router.patch('/type/:id', isInRoleMiddleware([ROLES.ADMIN]), UserContoller.setType)

export default router