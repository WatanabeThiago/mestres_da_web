import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import path from 'path'
import fs from 'fs'

import Shop from '../database/entity/Shop'

const uploadFolder = path.resolve(__dirname, '..', '..', 'images')

class PhotoController {
    async photo_update(req: Request, res: Response) {
        const shop_id = req.shop.shop_id
        const photoFile = req.file.filename

        const ShopRepo = getRepository(Shop)

        const shop = await ShopRepo.findOne(shop_id)

        if(!shop){
            throw new Error('Apenas usuarios autenticados podem mudar a foto')
        }
        console.log(`shop.photo: ${shop.photo}`)
        
        if(shop.photo) {
            const shopPhotoFilePath = path.join(uploadFolder, shop.photo)
            console.log(`upload Folder: ${uploadFolder}`)
            console.log(`shopPhotoFilePath: ${shopPhotoFilePath}`)
            const shopPhotoExists = await fs.promises.stat(shopPhotoFilePath)

            if(shopPhotoExists && shop.photo != 'blank.jpg') {  
                console.log('existe')
                await fs.promises.unlink(shopPhotoFilePath)
            }
        }

        shop.photo = photoFile;
        await ShopRepo.save(shop)

        return res.json(shop)

    }
}

export default new PhotoController()