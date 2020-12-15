import { Router } from 'express'
import { getRepository} from 'typeorm'
import { Request, Response } from 'express'

import ensureAuthenticared from '../middlewares/ensureAuthenticated'


import Shop from '../database/entity/Shop'

import CreateShopService from '../services/shops/CreateShopService'
import DeleteShopService from '../services/shops/DeleteShopService'
import UpdateShopService from '../services/shops/UpdateShopService'

const shopRouter = Router()



shopRouter.get('/', async (req: Request, res: Response) => {
    return res.json(await getRepository(Shop).find())
})

shopRouter.post('/', async (req: Request, res: Response) => {
    const { shop_email, shop_name, shop_password} = req.body

    const createShop = new CreateShopService();

    const shop = await createShop.execute({
        shop_email,
        shop_name,
        shop_password
    })
    return res.json(shop)
})

shopRouter.delete('/', ensureAuthenticared,  async (req, res) => {
            const shop_id = req.shop.shop_id
            const deleteShop = new DeleteShopService();
            await deleteShop.execute(shop_id)
            return res.send('Usuario deletado com sucesso')
})
shopRouter.put('/', ensureAuthenticared, async(req, res) => {
    const { shop_name, shop_password} = req.body
    const shop_id = req.shop.shop_id
    const updateService = new UpdateShopService()
    await updateService.execute({shop_id, shop_name, shop_password})

    return res.json(updateService)
})


export default shopRouter;