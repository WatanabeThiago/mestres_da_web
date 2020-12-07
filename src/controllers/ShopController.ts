import { Request, Response } from 'express'
import { getRepository, getConnection } from 'typeorm'

import Shop from '../database/entity/Shop'

class UserController {
    async list(req: Request, res: Response) {
        return res.json(await getRepository(Shop).find())
    }

    async create(req: Request, res: Response) {
        try {
            const ShopRepo = getRepository(Shop)

            const { shop_email } = req.body;

            console.log(req.body)

            const shopExists = await ShopRepo.findOne({ where: { shop_email } })

            if (shopExists) {
                throw new Error('Usuario já existe.')
            }

            const shop = ShopRepo.create({
                ...req.body
            })
            await ShopRepo.save(shop)

            return res.json(shop)
        }
        catch (err) {
            return res.status(400).json({ error: err.message })
        }
    }
    async delete(req: Request, res: Response) {
        try {
            const ShopRepo = getRepository(Shop)

            const shop_id = req.headers.authorization

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
        const shop_id = req.params

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