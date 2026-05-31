import { Router } from 'express'
import { createtransactions, gethistory } from '../controllers/transactioncontroller.js'
import { getdashboard } from '../controllers/transactioncontroller.js'
import { rolecheck } from '../middleware/rolecheck.js'
import { auth } from '../middleware/auth.js'

const router = Router()

router.post('/', auth, createtransactions)
router.get('/dashboard', auth, rolecheck('admin'), getdashboard)
router.get('/', auth, gethistory)

export default router