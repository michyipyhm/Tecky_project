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
        // 從 shopping_cart 中讀取屬於該 userId 的 product_id
        const shoppingCartResult = await pgClient.query('SELECT product_id FROM shopping_cart WHERE user_id = $1', [userId]);
        const productIds = shoppingCartResult.rows.map(row => row.product_id);

        // 根據 product_id 從 product 讀取 product_name 和 product_price
        const productNames = [];
        for (const productId of productIds) {
            const productResult = await pgClient.query('SELECT product_name, product_price FROM product WHERE id = $1', [productId]);
            if (productResult.rows.length > 0) {
                productNames.push(productResult.rows[0]);
            }
        }
        res.status(200).json(productNames);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching shopping cart');
    }
}
