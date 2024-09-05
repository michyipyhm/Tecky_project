import express, { Request, Response, Router } from 'express';
import { pgClient } from '../main';
import Stripe from 'stripe';

export const productRoutes = express.Router()

productRoutes.get("/product", async (req, res) => {
    const productId = req.query.product
    try {
        const productResult = await pgClient.query(`SELECT * FROM product WHERE id = '${productId}';`)
        const data = productResult.rows[0]
        res.status(200).json({ data })
    } catch (err) {
        res.status(500).send({ message: 'Faile' })
    }
})