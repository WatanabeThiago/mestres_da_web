import { Request, Response } from 'express'
import { getRepository, getConnection } from 'typeorm'
import { hash } from 'bcryptjs'
import multer from 'multer'
import uploadConfig from '../config/upload'

import Shop from '../database/entity/Shop'

const upload = multer(uploadConfig)
class UserController {

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