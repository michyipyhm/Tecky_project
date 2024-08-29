import express, { Request, Response } from "express";
import { pgClient } from "../main";
import { checkPassword, hashPassword } from "../utils/hash";

export const userRouter = express.Router();

userRouter.post("/login", async (req: Request, res: Response) => {//http://localhost:8080/login.html
  const data = req.body
  const username = data.username
  const password = data.password //from client input
  const result = ((await pgClient.query(`select * from member where username = '${username}';`)));
  const row = result.rows[0]
  const count = result.rowCount
  if (count == 0) {
    res.status(401).json({ message: "The username or password is incorrect." })
    return
  } else {
    const hashPassword = row.password //from database
    const passwordChecking = await checkPassword({ plainPassword: password, hashedPassword: hashPassword, })
    if (!passwordChecking) {
      res.status(401).json({ message: "The username or password is incorrect." });
      return
    }
  }
  req.session.userId = row.id
  res.json({ message: "Login successful.", nickanme: row.nickname, userId: req.session.userId })
  return;
})

userRouter.post("/register", async (req: Request, res: Response) => {//http://localhost:8080/register.html

  const data = req.body;
  const username = data.username;
  const password = data.password;
  const nickname = data.nickname;
  const gender = data.gender;
  const birthday = data.birthday;
  const phone = data.phone;
  const address = data.address;
  const email = data.email
  const sql_1 = `Select * from member where username = '${username}'`;
  const userResult = await pgClient.query(sql_1);
  const row = userResult.rows;
  const rowCount = userResult.rowCount;
  if (rowCount == null || rowCount > 0) {
    res.status(400).json({ message: "username exists in database" });
    return;
  }
  const sql = `INSERT INTO member (username, password, nickname, gender, birthday, phone, address, email) 
    VALUES ('${username}', '${await hashPassword(password)}', '${nickname}', '${gender}', '${birthday}', '${phone}', '${address}', '${email}')RETURNING id;`;

  const insertResult = await pgClient.query(sql);
  req.session.userId = insertResult.rows[0].id
  res.json({ message: "Register successful" });
});

userRouter.get("/userprofile", async (req: Request, res: Response) => {//http://localhost:8080/profile.html
  const userId = req.session.userId
  if (!userId) {
    res.status(401).json({ message: "Please login first." });
    return;
  }
  const sql_1 = `select id, username, nickname, gender, birthday, phone, address, email from member where id = $1`
  const userResult = await pgClient.query(sql_1, [userId])
  const userRows = userResult.rows

  res.json({ message: "userprofile", user: userRows[0] })
})

userRouter.post("/logout", async (req: Request, res: Response) => {
  if (req.session.userId) {
    req.session.destroy(() => {
      res.json({ message: "Logout successful." })
    })
  } else {
    res.json({ message: "Please login first." })
  }
})

