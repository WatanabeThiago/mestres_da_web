import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import path from 'path'
import fs from 'fs'

import Product from '../database/entity/Product'

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads')

class PhotoController {
    async photo_update(req: Request, res: Response) {
        const shop_id = req.shop.shop_id
        const product_id = req.params
        console.log(product_id)
        const photoFile = req.file.filename

        const ProductRepo = getRepository(Product)

        const product = await ProductRepo.findOne({ where: product_id })

        if (shop_id == product?.shop_id){
            console.log('IGUAL')
        }
        else {
            return res.sendStatus(401)
        }
        
        if (!product)
            return res.sendStatus(404)

        console.log(`product.product_photo: ${product.product_photo}`)

        if (product.product_photo) {
            const shopPhotoFilePath = path.join(uploadFolder, product.product_photo)
            console.log(`upload Folder: ${uploadFolder}`)
            console.log(`shopPhotoFilePath: ${shopPhotoFilePath}`)
            const shopPhotoExists = await fs.promises.stat(shopPhotoFilePath)

            if (shopPhotoExists && product.product_photo != 'blank.jpg') {
                console.log('existe')
                await fs.promises.unlink(shopPhotoFilePath)
            }
        }

        product.product_photo = photoFile;
        await ProductRepo.save(product)

        return res.json(product)

    }
}

export default new PhotoController()