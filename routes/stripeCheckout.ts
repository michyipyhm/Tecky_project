import express, { Request, Response, Router } from 'express';
import { pgClient } from '../main';
import Stripe from 'stripe';

export const stripeCheckout = express.Router()

const stripe = require('stripe')('sk_test_51PreUORwdDaooQDsamp23arHGzTPt6evgQoLolZw1DcnkEIyIZ86rptWHnack4RBbeMAzEj6vdViamrhUXI5nmO200vL2SOcjX');

stripeCheckout.post('/stripeCheckOut', async (req, res) => {
    const orderId = req.body.id
    const orderDetailsResult = await pgClient.query(`select * from order_details join product on product.id = order_details.product_id where orders_id =${orderId};`)
    const data = orderDetailsResult.rows
    const totalPriceQResult = await pgClient.query(`select total from orders WHERE id =${orderId};`)
    const totalPrice = totalPriceQResult.rows[0]
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price_data: {
                currency: 'hkd',
                product_data: {
                    name: 'XXX',
                    quantity: 1
                },
                unit_amount: 9999,
            },
            quantity: req.body.quantity,
        }],
        mode: 'payment',
        success_url: 'http://localhost:8080/order.html',
        cancel_url: 'http://localhost:8080/order.html',
    });

    res.json({ id: session.id });
});