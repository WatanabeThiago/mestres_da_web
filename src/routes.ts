import { Router } from 'express'
import multer from 'multer'
const routes = Router()

import ShopController from './controllers/ShopController'
import ProductController from './controllers/ProductController'
import SessionController from  './controllers/SessionController'

import ensureAuthenticared from './middlewares/ensureAuthenticated'
import uploadConfig from './config/upload'

const upload = multer(uploadConfig)

routes.get('/shops', ShopController.list)
routes.delete('/shops', ensureAuthenticared, ShopController.delete)
routes.post('/shops', ShopController.create)
routes.put('/shops/:shop_id', ensureAuthenticared, ShopController.update)


routes.get('/shops/products', ensureAuthenticared, ProductController.listProductsShops) 
routes.get('/products/category',  ProductController.listCategory)

routes.post('/products', ensureAuthenticared, ProductController.create)
routes.put('/products/:product_id', ensureAuthenticared, ProductController.update)
routes.delete('/products/:product_id', ensureAuthenticared, ProductController.delete)

routes.patch('/photo', ensureAuthenticared, upload.single('photo'), ShopController.photo_upload)

routes.post('/login', SessionController.login)

export default routes;