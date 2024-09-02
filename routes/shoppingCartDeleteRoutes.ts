import express, { Request, Response, Router } from 'express';
import { pgClient } from '../main';

export const shoppingCartDeleteRoutes = express.Router()

shoppingCartDeleteRoutes.delete("/deleteShoppingCartItem", async (req, res) =>{
    const data = req.body
    const id = data.id
    try {
        await pgClient.query(`DELETE FROM shopping_cart WHERE id = '${id}';`)
    res.status(200).json({ message: 'Item deteted!' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Item detete failed');
    }
})