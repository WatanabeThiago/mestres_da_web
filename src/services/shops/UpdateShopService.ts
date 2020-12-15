import { Request, Response } from 'express'
import { getRepository, getConnection } from 'typeorm'

import Shop from '../../database/entity/Shop'

interface IReq {
    shop_id: string;
    shop_name: string;
    shop_password: string;
}

export default class UpdateShopService {
    public async execute({ shop_id, shop_name, shop_password }: IReq): Promise<Shop> {
        const ShopRepo = getRepository(Shop)

        const shop = await ShopRepo.findOne(shop_id)

        console.log(shop)

        if (!shop) {
            throw new Error('Shop nao encontrado.')
        }

        const updateShop = {
            ...shop,
            shop_id,
            shop_name,
            shop_password
        }

        await ShopRepo.save(updateShop)

        return updateShop
    }
}
