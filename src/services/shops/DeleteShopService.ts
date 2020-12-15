import { Request, Response } from 'express'
import { getRepository, getConnection } from 'typeorm'
import path from 'path'
import Shop from '../../database/entity/Shop'
import fs from 'fs'
import uploadConfig from '../../config/upload'



export default class DeleteShopService {
    public async execute(shop_id: string): Promise<void> {
        const shopRepo = getRepository(Shop)

        const shop = await shopRepo.findOne(shop_id)

        if(!shop)
        {
            throw new Error("Product not found");
        }
        const shopImagePath = path.join(uploadConfig.directory, shop.photo)
        const shopImageExists = await fs.promises.stat(shopImagePath)

        if(shopImageExists && shop.photo != 'blank.jpg'){
            await fs.promises.unlink(shopImagePath)
        }

        shopRepo.delete(shop_id)
        
    }
}