import { Router } from 'express'
const routes = Router()

import ShopController from './controllers/ShopController'
import ProductController from './controllers/ProductController'

routes.get('/shops', ShopController.list)
routes.delete('/shops', ShopController.delete)
routes.post('/shops', ShopController.create)
routes.put('/shops/:shop_id', ShopController.update)

routes.post('/products', ProductController.create)
routes.get('/products', ProductController.list)
routes.get('/products/:shop_id', ProductController.listProductsShops)
routes.put('/products/:product_id', ProductController.update)

export default routes;