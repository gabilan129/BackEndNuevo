import { Router } from "express"
import { publicRoutes } from '../middlewares/auth.middleware.js'
import { 
    viewProductsController,
    viewRealTimeProductsController,
    viewProductsFromCartController
} from '../controllers/view.controller.js'

import{addProductToCartController} from '../controllers/cart.controller.js'

import { handlePolicies } from "../middlewares/auth.middleware.js"

const router = Router()

router.get('/', publicRoutes, handlePolicies(['USER', 'ADMIN', 'PREMIUM']), viewProductsController)
router.get('/realTimeProducts', handlePolicies(['USER', 'ADMIN', 'PREMIUM']), viewRealTimeProductsController)
router.get('/:cid', handlePolicies(['USER', 'ADMIN', 'PREMIUM']), viewProductsFromCartController)
router.get('/products', handlePolicies(['USER']), addProductToCartController)

export default router