import express  from 'express'
import { AuthController } from '../controllers/auth-controller.js'
import { verifySession } from '../middlewares/verify-session.js'
import { isInRoleMiddleware } from '../middlewares/is-in-role-middleware.js'
import { ROLES } from '../common/constants/role.js'

const router = express.Router()
router.post('/login', AuthController.login)
router.get('/roles', verifySession, isInRoleMiddleware([ROLES.ADMIN]), AuthController.getRoles)
router.get('/user-types', verifySession, isInRoleMiddleware([ROLES.ADMIN]), AuthController.getUserTypes)

export default router