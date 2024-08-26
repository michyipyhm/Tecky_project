import express, { query, Request, response, Response } from 'express';
import expressSession from "express-session";
// import path from 'path';
// import fs from "fs";
// import jsonfile from "jsonfile";
import { Client } from "pg";
import dotenv from "dotenv";
import Stripe from 'stripe';
const app = express();

dotenv.config();

const stripe = require('stripe')('sk_test_51PreUORwdDaooQDsamp23arHGzTPt6evgQoLolZw1DcnkEIyIZ86rptWHnack4RBbeMAzEj6vdViamrhUXI5nmO200vL2SOcjX');

app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price_data: {
                currency: req.body.currency,
                product_data: {
                    name: 'SuperMario',
                },
                unit_amount: req.body.price,
            },
            quantity: 1,
        }],
        mode: 'payment',
        success_url: 'http://localhost:8080/index.html',
        cancel_url: 'http://localhost:8080/shopping.html',
    });

    res.json({ id: session.id });
});

app.post('/webhook', async (req, res) => {
    const event = req.body;

    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            console.log(`Checkout session completed: ${session.id}`);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
});

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.static("private"));
app.use(
    expressSession({
        secret: "Tecky-C32-WSP012-Michael-Victor-Kees",
        resave: true,
        saveUninitialized: true,
    })
);
declare module "express-session" {
    interface SessionData {
        userId?: number;
    }
}

const pgClient = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: "localhost"
});
pgClient.connect();

const port = 8080;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});



