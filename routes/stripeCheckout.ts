import express, { query, Request, response, Response } from 'express';
import { pgClient } from '../main';
import Stripe from 'stripe';

export const stripeCheckout = express.Router()

const stripe = require('stripe')('sk_test_51PreUORwdDaooQDsamp23arHGzTPt6evgQoLolZw1DcnkEIyIZ86rptWHnack4RBbeMAzEj6vdViamrhUXI5nmO200vL2SOcjX');

stripeCheckout.post('/create-checkout-session', express.json({ type: 'application/json' }), async (req, res) => {
    let queryResult = await pgClient.query("SELECT * FROM order_details JOIN product on product.id = order_details.product_id WHERE orders_id =$1;", [req.body.orderId])
    let products = queryResult.rows
    try {
        const line_items = []
        for (let product of products) {
            line_items.push({
                price_data: {
                    currency: "hkd",
                    product_data: {
                        name: product.product_name
                    },
                    unit_amount: product.product_price * 100
                },
                quantity: product.quantity
            })
        }
        const session = await stripe.checkout.sessions.create({

            payment_method_types: ['card'],
            line_items: line_items,
            payment_intent_data: {
                metadata: {
                    order_id: req.body.orderId
                }
            },
            mode: 'payment',
            success_url: 'http://localhost:8080/order.html',
            cancel_url: 'http://localhost:8080/order.html',
        });
        res.json({ id: session.id });
        // res.redirect(303, session.url);
    } catch (e) {
        res.status(400).json({ msg: e })
    }
});

stripeCheckout.post('/webhook', express.json({ type: 'application/json' }), async (req, res) => {
    const event = req.body
    try {
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object
                const metadata = paymentIntent.metadata
                const orderId = metadata.order_id
                const srtipeId = paymentIntent.id
                const updateOrder = await pgClient.query(
                    `UPDATE orders 
                    SET state = 'Paid',
                    stripe_id = '${srtipeId}',
                    payment_type = 'Online' 
                    WHERE id = ${orderId};`)
                console.log (orderId)
                console.log (srtipeId)
                break;
            case 'payment_method.attached':
                const paymentMethod = event.data.object;
                break;
            default:
                console.log(`Unhandled event type ${event.type}`)
        }
        res.json({ received: true })
    } catch (e) {
        res.status(400).json({ msg: e })
    }
})