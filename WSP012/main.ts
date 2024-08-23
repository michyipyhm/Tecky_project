import express, { query, Request, response, Response } from 'express';
import expressSession from "express-session";
import path from 'path';
import fs from "fs";
import jsonfile from "jsonfile";
import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
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

app.post("/login", async (req: Request, res: Response) => {
    const data = req.body
    const username = data.username
    const password = data.password
    const result = ((await pgClient.query(`select * from users where username = '${username}' and password = '${password}';`)));
    const row = result.rows[0]
    const count = result.rowCount
    if (count == 0) {
        res.status(401).json({message: "The username or password is incorrect."})
        return
    }
    req.session.userId = row.id
    res.json({message: "Login successful.", nickanme: row.nickname,  userId: req.session.userId})
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
        res.status(400).json({message: "Username already exists."})
        return
    }
    const sql = `insert into users (username, password, birthday, nickname, phone)
    values ('${username}', '${password}', '${birthday}', '${nickname}', '${phone}') returning id ;`
    const insertResult = await pgClient.query(sql)
    req.session.userId = insertResult.rows[0].id

    res.json({message: "Register successful.", userId: req.session.userId}) 
})

app.get("/userprofile", async (req: Request, res: Response) => {
    const userId = req.session.userId
    const sql_1 = `select id, username, birthday, nickname, phone from users where id = $1`
    const userResult = await pgClient.query(sql_1, [userId])
    const userRows = userResult.rows
    // const userCount = userResult.rowCount
    console.log(userId)
    res.json({message: "userprofile", user: userRows[0]})
})

app.post("/logout", async (req: Request, res: Response) => {
    if (req.session.userId) {
        req.session.destroy(() =>{
            res.json({message:"Logout successful."})
        })
    } else {
        res.json({message:"Please login first."})
    }
})

const port = 8080;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});