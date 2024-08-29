import express, { query, Request, response, Response } from 'express';
import expressSession from "express-session";
import path from 'path';
import fs from "fs";
import jsonfile from "jsonfile";
import { Client } from "pg";
import dotenv from "dotenv";
import { checkPassword, hashPassword } from "./utils/hash";
import { userRouter } from "./routes/userRoutes";
import grant from "grant";


dotenv.config();

export const pgClient = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: "localhost"
    // port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432
});

pgClient.connect();

const app = express();

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


app.get('/main', async (req: Request, res: Response) => {
    try {
        const result = await pgClient.query(`select image_path from product_image where product_id between 1 and 6`);
        console.log('result is!!!!!!!!', result);
        res.json(result.rows.map(row => row.image_path));
    } catch (error) {
        console.log('error is!!!!!!!!!', error);
        res.status(500).json({ message: "An error occurred while retrieving the images." });
    }
});

import { isLoggedIn } from './utils/guards'

app.use('/', userRouter)

app.use(express.static('public'))
app.use(isLoggedIn, express.static('private'))

app.use((req, res) => {
    res.redirect('404.html');
});

const port = 8080;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});