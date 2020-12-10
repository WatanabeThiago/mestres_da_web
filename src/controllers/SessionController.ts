import { Request, Response } from 'express'
import { getRepository, getConnection } from 'typeorm'
import bcrypt from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import authConfig from '../config/auth'

import Shop from '../database/entity/Shop'

class SessionController {
    async login(req: Request, res: Response) {
        try {
            const ShopRepo = getRepository(Shop)
            const { shop_email, shop_password } = req.body;

            const shop = await ShopRepo.findOne({ where: { shop_email } })

            if (!shop)
                return res.status(404).json({ message: 'Usuario ou senha incorretos!' })

            const passwordMatch = await bcrypt.compare(shop_password, shop.shop_password)

            if(!passwordMatch)
                return res.status(404).json({ message: 'Usuario ou senha incorretos!' })

            delete shop.shop_password;

            const { secret, expiresIn} = authConfig.jwt

            const token = sign({  }, secret, {
                subject: shop.shop_id,
                expiresIn
            })

            return res.json({
                shop,
                token
            })
        }

        catch (err) {
            return res.status(400).json({ error: err.message })
        }
    }
}

export default new SessionController()