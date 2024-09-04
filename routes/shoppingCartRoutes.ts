import express, { Request, Response, Router } from 'express';
import { pgClient } from '../main';

export const shoppingCartRouter = express.Router()

shoppingCartRouter.get("/shoppingcart", async (req, res) =>{
    const userId = req.session.userId;
    if (!userId) {
        res.status(401).json({ message: "Please login first." });
        return;
    }
    try {
        let queryResult = await pgClient.query(`select * from shopping_cart join product on product.id = shopping_cart.product_id where member_id =${userId};`)
        let data = queryResult.rows

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
    let data = req.body
    let id = data.id
    let quantity = data.quantity
    try {
        await pgClient.query(`UPDATE shopping_cart SET quantity = '${quantity}' WHERE id = '${id}';`)
    res.status(200).json({ message: 'Quantity updated!' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Quantity failed');
    }
})