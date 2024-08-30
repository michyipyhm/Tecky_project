import { Request, Response } from 'express';
import { pgClient } from '../main';

export async function getShoppingCart(req: Request, res: Response) {
    //檢查session userId / 是否有login
    const userId = req.session.userId;
    if (!userId) {
        res.status(401).json({ message: "Please login first." });
        return;
    }
    try {

        // 根據 product_id 從 product 讀取 product_name 和 product_price
        let queryResult = await pgClient.query(`select * from shopping_cart join product  on product.id = shopping_cart.product_id where member_id =${userId};`)
        let data = queryResult.rows

        res.status(200).json({data});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching shopping cart');
    }
}
