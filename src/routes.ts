import { Router } from 'express'
import multer from 'multer'
const routes = Router()

import ShopController from './controllers/ShopController'
import ProductController from './controllers/ProductController'
import SessionController from  './controllers/SessionController'
import ShopPhotoController from './controllers/ShopPhotoController'
import ProductPhotoController from './controllers/ProductPhotoController'

import ensureAuthenticared from './middlewares/ensureAuthenticated'
import uploadConfig from './config/upload'

const upload = multer(uploadConfig)

routes.get('/shops', ShopController.list)
routes.delete('/shops', ensureAuthenticared, ShopController.delete)
routes.post('/shops', ShopController.create)
routes.put('/shops/', ensureAuthenticared, ShopController.update)


routes.get('/shops/products', ensureAuthenticared, ProductController.listProductsShops) 
routes.get('/products/category',  ProductController.listCategory)
routes.post('/products', ensureAuthenticared, ProductController.create)
routes.put('/products/:product_id', ensureAuthenticared, ProductController.update)
routes.delete('/products/:product_id', ensureAuthenticared, ProductController.delete)


routes.patch('/shops/photo', ensureAuthenticared, upload.single('photo'), ShopPhotoController.photo_update)
routes.patch('/products/photo/:product_id', ensureAuthenticared, upload.single('product_photo'), ProductPhotoController.photo_update)

routes.post('/login', SessionController.login)

export default routes;