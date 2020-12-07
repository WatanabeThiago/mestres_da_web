import { Request, Response } from 'express'
import { getRepository, getConnection } from 'typeorm'

import Product from '../database/entity/Product'

class UserController {
    async listProductsShops(req: Request, res: Response){
        const shop_id = req.params
        return res.json(await getRepository(Product).find({where: {shop_id}}))
    }
    async list(req: Request, res: Response) {
        return res.json(await getRepository(Product).find())
    }

    async create(req: Request, res: Response) {
        try {
            const ProductRepo = getRepository(Product)

            const shop_id = req.headers.authorization

        
            const product = ProductRepo.create({
                ...req.body,
                shop_id
            })
            await ProductRepo.save(product)

            return res.json(product)
        }
        catch (err) {
            return res.status(400).json({ error: err.message })
        }
    }
    async delete(req: Request, res: Response) {
        try {
            const ProductRepo = getRepository(Product)

            const product_id = req.params

            const user_id = req.headers.authorization

            const productExists = await ProductRepo.findOne({ where: { product_id } })

            if (!productExists) {
                return res.sendStatus(404)
            }


            await getConnection()
                .createQueryBuilder()
                .delete()
                .from(Product)
                .where({ product_id })
                .execute()

            return res.send('Produto deletado com sucesso')
        }
        catch (err) {
            return res.status(400).json({ error: err.message })
        }
    }

    async update(req: Request, res: Response) {
        const shop_id = req.headers.authorization;
        const product_id = req.params;

        const shop = { ...req.body }

        

        try {
            const shop_update = await getRepository(Product).update(
                product_id,
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