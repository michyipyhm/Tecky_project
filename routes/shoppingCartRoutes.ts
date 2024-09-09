import express, { Request, Response, Router } from 'express';
import { pgClient } from '../main';

export const shoppingCartRouter = express.Router()

shoppingCartRouter.get("/shoppingcart", async (req, res) =>{
    const userId = req.session.userId;
    if (!userId) {
        res.status(401).json();
        return;
    }
    try {
        let queryResult = await pgClient.query(`select * from shopping_cart 
            join product on product.id = shopping_cart.product_id 
            join product_image on product_image.product_id = product.id 
            join origin on origin.id = product.origin_id 
            join format on format.id = product.format_id
            where member_id =${userId};`)
        let data = queryResult.rows
        // console.log(data)
        let totalPriceQueryResult = await pgClient.query(`select sum(product_price * quantity) as total from shopping_cart 
join product on product.id = shopping_cart.product_id   
where member_id =${userId}; `)
        let totalPrice = totalPriceQueryResult.rows[0];
        res.status(200).json({ data, totalPrice });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching shopping cart');
    }
})

shoppingCartRouter.post('/selectedQuantity', async (req, res) =>{
    try {
    let data = req.body
    let id = data.id
    let quantity = data.quantity
    console.log("Product", id , "'s quantity has been changed to", quantity)
    // 檢查stock
    const checkStockQuery = await pgClient.query(
        `SELECT product_quantity FROM product WHERE id = $1`,[id])
      const currentStock = checkStockQuery.rows[0].product_quantity
      if (currentStock < quantity) {
        return res.status(400).json({ message: `Available: ${currentStock}, Requested: ${quantity}` });
      }
        await pgClient.query(`UPDATE shopping_cart SET quantity = '${quantity}' WHERE product_id = '${id}';`)
        return res.status(200).json({ message: 'Quantity updated!' });
    } catch (err) {
      console.error(err);
      return res.status(500).send('Quantity failed');
    }
})