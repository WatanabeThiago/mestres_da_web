
import { Request, Response } from 'express'
import { getRepository, getConnection } from 'typeorm'
import { hash } from 'bcryptjs'


import Shop from '../../database/entity/Shop'

interface IReq {
    shop_email: string;
    shop_password: string;
    shop_name: string;
}

class CreateShopService {
    public async execute({ shop_email, shop_password, shop_name }: IReq): Promise<Shop> {
        try {
            const ShopRepo = getRepository(Shop)

            const shopExists = await ShopRepo.findOne({ where: { shop_email } })

            if (shopExists) {
                throw new Error('Usuario já existe.')
            }

            const hashedPassword = await hash(shop_password, 8)

            const shop = ShopRepo.create({
                shop_email,
                shop_password: hashedPassword,
                shop_name
            })
            await ShopRepo.save(shop)

            delete shop.shop_password

            return shop
        }
        catch (err) {
            return err
        }
    }

}

export default CreateShopService;