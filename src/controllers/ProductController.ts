import { Request, Response } from 'express'
import { getRepository, getConnection } from 'typeorm'

import Product from '../database/entity/Product'


class UserController {
    async listProductsShops(req: Request, res: Response) {
        const shop_id = req.shop.shop_id
        return res.json(await getRepository(Product).find({ where: { shop_id } }))
    }

    async listCategory(req: Request, res: Response) {
        const product_category = req.query.product_category
        const shop_id = req.shop.shop_id

        const data = {
            product_category,
            shop_id
        }

        return res.json(await getRepository(Product).find({where: data}))
    }

    async create(req: Request, res: Response) {
        try {
            const ProductRepo = getRepository(Product)
            const shop_id = req.shop.shop_id

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
            const shop_id = req.shop.shop_id
    
            const product = await ProductRepo.findOne({ where: product_id })

            if (shop_id == product?.shop_id){
                console.log('IGUAL')
            }
            else {
                return res.sendStatus(401)
            }

            if (!product) 
                return res.sendStatus(404)

            await getConnection()
                .createQueryBuilder()
                .delete()
                .from(Product)
                .where(product_id)
                .execute()

            return res.send('Produto deletado com sucesso')
        }
        catch (err) {
            return res.status(400).json({ error: err.message })
        }
    }

    async update(req: Request, res: Response) {
        const ProductRepo = getRepository(Product)
        const shop_id = req.shop.shop_id
        const product_id = req.params;

        const product = await ProductRepo.findOne({ where: product_id })

        if (shop_id == product?.shop_id){
            console.log('IGUAL')
        }
        else {
            return res.sendStatus(401)
        }

        if (!product) {
            return res.sendStatus(404)
        }

        const product_data = { ...req.body }

        try {
            const product_update = await getRepository(Product).update(
                product_id,
                product_data
            )
            return res.status(200).json({
                message: "Update com sucesso",
                data: product_data

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