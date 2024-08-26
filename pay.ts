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
        cancel_url: 'http://localhost:8080/shoppingcart.html',
    });

    res.json({ id: session.id });
});

app.post('/webhook', async (req, res) => {
    const event = req.body;

    // 根據事件類型進行處理
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            // 處理付款成功後的邏輯，例如發送電子郵件或更新數據庫
            console.log(`Checkout session completed: ${session.id}`);
            break;
        // 其他事件類型的處理
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
        secret: "Keespage22133414",
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

app.post("/login", async (req: Request, res: Response) => {
    const data = req.body
    const username = data.username
    const password = data.password
    const result = ((await pgClient.query(`select * from users where username = '${username}' and password = '${password}';`)));
    const row = result.rows[0]
    const count = result.rowCount
    if (count == 0) {
        res.status(401).json({ message: "登入名稱或密碼錯誤" })
        return
    }
    req.session.userId = row.id
    // console.log(result)
    res.json({ message: "登入成功", nickanme: row.nickname, userId: req.session.userId })
})

app.post("/register", async (req: Request, res: Response) => {
    const data = req.body
    const username = data.username
    const password = data.password
    const birthday = data.birthday
    const nickname = data.nickname
    const phone = data.phone
    const sql_1 = `select * from users where username = '${username}'`
    const userResult = await pgClient.query(sql_1)
    const row = userResult.rows
    const rowCount = userResult.rowCount
    if (rowCount == null || rowCount > 0) {
        res.status(400).json({ message: "Username已存在" })
        return
    }
    const sql = `insert into users (username, password, birthday, nickname, phone)
    values ('${username}', '${password}', '${birthday}', '${nickname}', '${phone}') returning id ;`
    const insertResult = await pgClient.query(sql)
    req.session.userId = insertResult.rows[0].id

    res.json({ message: "註冊成功", userId: req.session.userId })
})

app.get("/userprofile", async (req: Request, res: Response) => {  
    const userId = req.session.userId
    const sql_1 = `select id, username, birthday, nickname, phone from users where id = $1`
    const userResult = await pgClient.query(sql_1, [userId])
    const userRows = userResult.rows
    const userCount = userResult.rowCount
    console.log(userId)
    res.json({ message: "userprofile", user: userRows[0] })
})

app.post("/logout", async (req: Request, res: Response) => {
    if (req.session.userId) {
        req.session.destroy(() => {
            res.json({ message: "登出成功" })
        })
    } else {
        res.json({ message: "未登入" })
    }
})

const port = 8080;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});



