import { Router } from 'express'
import { getallproducts, getidproduct, createproduct, updateproduct, deleteproduct} from '../controllers/productcontroller.js'
import { auth } from '../middleware/auth.js'
import { rolecheck } from '../middleware/rolecheck.js'

const router = Router()

router.get('/', auth, getallproducts)
router.get('/:id',auth, getidproduct)
router.post('/', auth, rolecheck('admin'), createproduct)
router.put('/:id', auth, rolecheck('admin'), updateproduct)
router.delete('/:id', auth, rolecheck('admin'), deleteproduct)

export default router