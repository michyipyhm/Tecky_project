import express, { Request, Response, Router } from 'express';
import { pgClient } from '../main';
import Stripe from 'stripe';

const stripe = require('stripe')('sk_test_51PreUORwdDaooQDsamp23arHGzTPt6evgQoLolZw1DcnkEIyIZ86rptWHnack4RBbeMAzEj6vdViamrhUXI5nmO200vL2SOcjX');
export const orderRoutes = express.Router()
//顯示訂單
orderRoutes.get("/checkOrder", async (req, res) => {
    const userId = req.session.userId
    if (!userId) {
        res.status(401).json({ message: "Please login first." });
        return;
    }
    try {
        const orderResult = await pgClient.query(`select * from orders where member_id =${userId};`)
        const data = orderResult.rows
        res.status(200).json({ data })
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching order');
    }
})

//訂單明細
orderRoutes.get("/order", async (req, res) => {
    const userId = req.session.userId
    const orderNum = req.query.orderNum
    const currectUserIdResult = await pgClient.query(`select member_id from orders where id =${orderNum};`)
    const currectUserId = currectUserIdResult.rows[0]
    if (userId != currectUserId.member_id) {
        res.status(401).json({ message: "Fail to load order." });
        return;
    }
    const orderDetailsResult = await pgClient.query(`select * from order_details join product on product.id = order_details.product_id where orders_id =${orderNum};`)
    const orderStatusResult = await pgClient.query(`SELECT state FROM orders where id = ${orderNum}`)
    const orderStatus = orderStatusResult.rows[0]
    const data = orderDetailsResult.rows
    const totalPriceQResult = await pgClient.query(`select total from orders WHERE id =${orderNum};`)
    const totalPrice = totalPriceQResult.rows[0]
    res.status(200).json({ data, totalPrice, orderStatus })
})