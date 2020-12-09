import { Request, Response } from 'express'
import { getRepository, getConnection } from 'typeorm'
import { hash } from 'bcryptjs'
import multer from 'multer'
import uploadConfig from '../config/upload'

import Shop from '../database/entity/Shop'

const upload = multer(uploadConfig)
class UserController {
    async list(req: Request, res: Response) {
        return res.json(await getRepository(Shop).find())
    }

    async create(req: Request, res: Response) {
        try {
            const ShopRepo = getRepository(Shop)

            const { shop_email, shop_password, shop_name } = req.body;

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

            return res.json(shop)
        }
        catch (err) {
            return res.status(400).json({ error: err.message })
        }
    }
    async delete(req: Request, res: Response) {
        try {
            const ShopRepo = getRepository(Shop)

            const shop_id = req.shop.shop_id
            console.log(shop_id)

            const shopExists = await ShopRepo.findOne({ where: { shop_id } })
            if (!shopExists) {
                return res.sendStatus(404)
            }

            await getConnection()
                .createQueryBuilder()
                .delete()
                .from(Shop)
                .where({ shop_id })
                .execute()

            return res.send('Usuario deletado com sucesso')
        }
        catch (err) {
            return res.status(400).json({ error: err.message })
        }
    }

    async update(req: Request, res: Response) {
        const shop_id = req.shop.shop_id

        const shop = { ...req.body }

        try {
            const shop_update = await getRepository(Shop).update(
                shop_id,
                shop
            )
            return res.status(200).json({
                message: "Update com sucesso",
                data: shop_update,
            });
        }
        catch (error) {
            return res.status(400).json({
                message: 'Update falhou',
                info: error
            })
        }
    }

}

export default new UserController()