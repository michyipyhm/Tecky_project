import express, { Request, Response, Router } from 'express';
import { pgClient } from '../main';

export const shoppingCartDeleteRoutes = express.Router()

shoppingCartDeleteRoutes.delete("/deleteShoppingCartItem", async (req, res) =>{
    const data = req.body
    const id = data.id
    console.log("You are delected product", data)
    try {
        await pgClient.query(`DELETE FROM shopping_cart WHERE product_id = '${id}';`)
    res.status(200).json({ message: 'Item deteted!' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Item detete failed');
    }
})