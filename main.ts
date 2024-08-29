import express, { query, Request, response, Response } from 'express';
import expressSession from "express-session";
import { isLoggedIn } from './utils/guards'
import path from 'path';
import fs from "fs";
import jsonfile from "jsonfile";
import { Client } from "pg";
import dotenv from "dotenv";
import { checkPassword, hashPassword } from "./utils/hash";
import { userRouter } from "./routes/userRoutes";
<<<<<<< HEAD
import grant from "grant";
=======
import Stripe from 'stripe';
import { getShoppingCart } from './routes/shoppingCartRoutes';
>>>>>>> 6d15d76eae62eb1a9ad900672824fc6e782875db

const stripe = require('stripe')('sk_test_51PreUORwdDaooQDsamp23arHGzTPt6evgQoLolZw1DcnkEIyIZ86rptWHnack4RBbeMAzEj6vdViamrhUXI5nmO200vL2SOcjX');
const app = express();

dotenv.config();

export const pgClient = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: "localhost"
});

pgClient.connect();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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

// order結算
app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price_data: {
                currency: req.body.currency,
                product_data: {
                    name: 'AAA',
                },
                unit_amount: req.body.price,
            },
            quantity: 1,
        }],
        mode: 'payment',
        success_url: 'http://localhost:8080/index.html',
        cancel_url: 'http://localhost:8080/shoppingcart.html',
    });

    res.json({ id: session.id });
});


app.get('/main', async (req: Request, res: Response) => {
    try {
        const image_path_result = await pgClient.query(`select image_path from product_image`);
        console.log('result is!!!!!!!!', image_path_result);
        res.json(image_path_result.rows.map(row => row.image_path));
    } catch (error) {
        console.log('error is!!!!!!!!!', error);
        res.status(500).json({ message: "An error occurred while retrieving the images." });
    }
});

// app.get('/search', async (req: Request, res: Response) => {
//     try {

//     }

// });




app.use('/', userRouter)
<<<<<<< HEAD
=======
// app.use('/resources', isLoggedIn, appleRoutes) // protected resources
app.use('/api/shopping-cart', getShoppingCart);
>>>>>>> 6d15d76eae62eb1a9ad900672824fc6e782875db

app.use(express.static('public'))
app.use(isLoggedIn, express.static('private'))

app.use((req, res) => {
    res.redirect('404.html');
});

const port = 8080;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});