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
import Stripe from 'stripe';

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

// shoppingCart讀database 來顯示現在購物車
app.get('/api/shopping-cart', async (req, res) => {
    try {
        // 從 shopping_cart 中讀 product_id
        const shoppingCartResult = await pgClient.query('SELECT product_id FROM shopping_cart');
        const productIds = shoppingCartResult.rows.map(row => row.product_id);

        // follow product_id 從 product 讀 product_name / product_price
        const productNames = [];
        for (const productId of productIds) {
            const productResult = await pgClient.query('SELECT product_name, product_price FROM product WHERE id = $1', [productId]);
            if (productResult.rows.length > 0) {
                productNames.push(productResult.rows[0]);
            }
        }
        res.status(200).json(productNames);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching shopping cart');
    }
});

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


//get photo from databases
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




// In main.ts
app.use('/', userRouter)
// app.use('/resources', isLoggedIn, appleRoutes) // protected resources

app.use(express.static('public'))
app.use(isLoggedIn, express.static('private'))

app.use((req, res) => {
    res.redirect('404.html');
});

const port = 8080;



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});